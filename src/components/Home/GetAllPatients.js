import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Patient from './Patient';
import styles from './getAllPatients.module.css';

const GetAllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients data from the backend API
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:5000/patient/patients', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        // Assuming the response data is an array of patient objects
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <main>
      <div>
        <Navbar />
      </div>
      <section className={styles.patient_container}>
        <div>
          {patients.map((patient) => (
            <Patient
              key={patient.id} // Assuming each patient object has a unique id property
              id={patient.id}
              patient={patient.name} // Assuming each patient object has a name property
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default GetAllPatients;
