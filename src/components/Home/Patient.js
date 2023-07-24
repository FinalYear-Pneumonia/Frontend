import React from 'react';
import axios from 'axios';
import styles from './patient.module.css';

const Patient = (props) => {
  const handleDiagnoseClick = () => {
    // Store the ID in localStorage when clicking the "Diagnose" button
    localStorage.setItem('selectedPatientId', props.id);
  };

  const handleViewClick = () => {
    // Store the ID in localStorage when clicking the "View" button
    localStorage.setItem('selectedPatientId', props.id);
  };

  const handleDeleteClick = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this patient?');
    if (!shouldDelete) {
      // User clicked Cancel, do nothing
      return;
    }

    try {
      // Send the DELETE request to the Flask API endpoint to delete the patient
      const response = await axios.delete(`http://127.0.0.1:5000/patient/patient/${props.id}`);
      console.log('Patient deleted:', response.data);
      // After successful deletion, refresh the page to reflect the updated patient list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting patient:', error.response.data);
    }
  };

  return (
    <div>
      <table className={styles.note}>
        <tbody>
          <tr>
            <td colSpan="3">
              <h1>{props.patient}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <button className={styles.btn1} onClick={handleDiagnoseClick}>
                <a href='/diagnose'>Diagnose</a>
              </button>
            </td>
            <td>
              <button className={styles.btn2} onClick={handleViewClick}>
                <a href='/view'>View</a>
              </button>
            </td>
            <td>
              <button className={styles.btn3} onClick={handleDeleteClick}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
