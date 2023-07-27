import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import styles from './diagnose.module.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';



const Diagnose = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const errRef = useRef();

  const [symptoms, setSymptoms] = useState('');
  const [fileName, setFileName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to hold the uploaded image file
  const [imageUrl, setImageUrl] = useState(null); // State to hold the URL of the uploaded image
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null); // State to hold the image prediction result

  useEffect(() => {
    const id = localStorage.getItem('selectedPatientId');
    const token = localStorage.getItem('userLoggedInTokenKEY');
    if (!token ) {
      navigate('/authpage');
    }
    else if (!id) {
      navigate('/home');
    }
  }, [navigate]); // Add navigate to the dependency array

  function upload(e) {
    setFileName(e.target.files[0].name);
    setImageFile(e.target.files[0]); // Update the imageFile state with the uploaded file
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Update the imageUrl state with the URL of the uploaded image
  }

  async function sendUpload() {
    setIsLoading(true); // Set loading state to true before making the API call

    const formdata = new FormData();
    formdata.append('image', imageFile); // Use the imageFile state for the formdata
    const token = localStorage.getItem('userLoggedInTokenKEY');
    const id = localStorage.getItem('selectedPatientId');

    try {
      const response = await axios.post(`http://127.0.0.1:5000/patient/predict-image/${id}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      // Assuming the response data is an object with prediction and has_pneumonia properties
      setPredictionResult(response.data);
      setIsLoading(false); // Set loading state to false after the API call is complete
    } catch (error) {
      if (!error.response) {
        setErrMsg('No Server Response');
      } else if (error.response) {
        setErrMsg('Error');
      }
      setIsLoading(false); // Set loading state to false in case of an error
      errRef.current.focus();
    }
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true before making the API call

    const token = localStorage.getItem('userLoggedInTokenKEY');
    const id = localStorage.getItem('selectedPatientId');

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/patient/predict-text/${id}`, // Replace '123' with the actual patient ID
        { symptoms: symptoms }, // Pass the symptoms value from the state
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPredictionResult(response.data); // Assuming the response data is an object with prediction and has_pneumonia properties
      setIsLoading(false); // Set loading state to false after the API call is complete
    } catch (error) {
      if (!error.response) {
        setErrMsg('No Server Response');
      } else if (error.response) {
        setErrMsg('Error');
      }
      setIsLoading(false); // Set loading state to false in case of an error
    }
  };

  function pneumoniaStatus(Pneumonia) {
    if (Pneumonia === true) {
      return 'Positive';
    } else {
      return 'Negative';
    }
  }

  return (
    <main className={styles.big_wrapper}>
      <div className={styles.home_nav}>
        <Navbar />
      </div>
      <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">
        {errMsg}
      </p>
      <div className={styles.home_background}>
        <div className={styles.home_container}>
          <div>
            <div className={styles.big_title}>
              <h1>Please follow the</h1>
              <h1>instructions:</h1>
            </div>
            <div className={styles.x_btn}>
              <input onChange={upload} type="file" accept="image/*" id="upload" name="upload" className="input_field" />
              <br />
              {/* Show the uploaded image */}
              {imageUrl && <img src={imageUrl} alt="Uploaded X-ray" className={styles.uploadedImage} />}
              <br />
              <div className={styles.both}>
                <button className={styles.btn} onClick={sendUpload}>
                  {isLoading ? 'Loading...' : 'Diagnose with Image only'}
                </button>
              </div>
            </div>
            <section>
              <div>
                <form className={styles.myForm}>
                  <textarea
                    name="symptoms"
                    placeholder="Type-in your symptoms..."
                    rows="4"
                    value={symptoms}
                    required
                    onChange={(e) => {
                      setSymptoms(e.target.value);
                    }}
                  />
                  <div>
                    <button onClick={handleSubmit} className={styles.btn}>
                      {isLoading ? 'Loading...' : 'Diagnose with Text only'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
            
            {/* Display the prediction result */}
            <div className={styles.pred_result}>
              {predictionResult && (
                <div className={styles.predictionResult}>
                  <h2>Prediction Result:</h2>
                  <p>Patient Name: {predictionResult.patient_name}</p>
                <p>Prediction Type: {predictionResult.prediction_type}</p>
                <p>Prediction: {predictionResult.prediction}%</p>
                <p>Pneumonia Status: {pneumoniaStatus(predictionResult.has_pneumonia)}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </main>
  );
};

export default Diagnose;
