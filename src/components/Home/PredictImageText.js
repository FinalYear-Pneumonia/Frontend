import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from './diagnose.module.css';
import Navbar from './Navbar';

const PredictImageText = () => {
  const errRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // State to hold the URL of the uploaded image
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  function upload(e) {
    setFileName(e.target.files[0].name);
    setImageFile(e.target.files[0]); // Update the imageFile state with the uploaded file
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Update the imageUrl state with the URL of the uploaded image
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const token = localStorage.getItem('userLoggedInTokenKEY');
    const id = localStorage.getItem('selectedPatientId');


    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('Symptoms', symptoms);

      const response = await axios.post(
        `http://127.0.0.1:5000/patient/predict-text-image/${id}`, // Replace 'id' with the actual patient ID
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add your JWT token if you require authentication for the API
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log(response.data)
      setIsLoading(false);
      setPredictionResult(response.data);
    } catch (error) {
      if (!error.response) {
        setError('No Server Response');
      } else if (error.response) {
        setError('Error');
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
      <p ref={errRef} className={error ? styles.errmsg : styles.offscreen} aria-live="assertive">
        {error}
      </p>
      <div className={styles.home_background}>
        <div className={styles.home_container}>
          <div>
            <div className={styles.big_title}></div>
            <form onSubmit={handleSubmit} className={styles.myForm}>
              <div className={styles.x_btn}>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={upload}
                  required
                  className="input_field"
                />
                <br />
                {/* Show the uploaded image */}
                {imageUrl && <img src={imageUrl} alt="Uploaded X-ray" className={styles.uploadedImage} />}
                <br />
              </div>
              <div>
                <textarea
                  type="text"
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={isLoading} className={styles.btn}>
                {isLoading ? 'Predicting...' : 'Predict Both Image&Text'}
              </button>
            </form>

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

export default PredictImageText;
