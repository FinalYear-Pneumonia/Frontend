import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ReportForm from './ReportForm';
import styles from './report.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Report = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [patientReports, setPatientReports] = useState([]);

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

  // Fetch patient reports from the backend API
  useEffect(() => {
    const id = localStorage.getItem('selectedPatientId');
    const token = localStorage.getItem('userLoggedInTokenKEY');
    // Fetch patients data from the backend API
    axios.get(`http://127.0.0.1:5000/patient/patient-reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Assuming the response data is an array of patient objects
        setPatientReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching patientReports:', error);
      });
  }, []);

  // Extract patient information from the first report (assuming patient info is the same for all reports)
  const patientInfo =
    patientReports.length > 0 ? patientReports[0] : { patient_name: '', patient_id: '', patient_age: '', patient_sex: '' };

  function pneumoniaStatus(Pneumonia) {
    if (Pneumonia === true) {
      return 'Positive';
    } else {
      return 'Negative';
    }
  }

  return (
    <main>
      <div>
        <Navbar />
      </div>
      <section className={styles.report_container}>
        <div className={styles.report_title}>
          <h1>{patientInfo.patient_name}</h1>
          <p>ID no. : {patientInfo.patient_id} &emsp; Age: {patientInfo.patient_age} &emsp; Sex: {patientInfo.patient_sex}</p>
        </div>
        <div>
          {patientReports.map((rep) => (
            <ReportForm
              key={rep.report_id}
              report_id={rep.report_id}
              PType={rep.prediction_type}
              Prediction={rep.prediction}
              Pneumonia={pneumoniaStatus(rep.has_pneumonia)}
              Date={rep.date_recorded}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Report;
