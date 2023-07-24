import React from 'react'
import axios from '../../api/axios';
import styles from './viewReports.module.css'
import { useState, useEffect } from 'react';



const ViewReports = () => {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [patient_id, setPatientId] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token');
      const id= localStorage.getItem('selectedPatientId');
      axios.get(`http://127.0.0.1:5000/patient/patient/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
        setPatientId(response.data.patient_id);
        setSex(response.data.sex);
        setContact(response.data.contact);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      setErrMsg('Failed to fetch user data.');
      });
    }, []);
     

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('selectedPatientId');
    axios.put(`http://127.0.0.1:5000/patient/patient/${id}`, {
      name, email, age, sex, patient_id, contact
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      // Handle the successful update (if needed)
      console.log('Profile updated successfully:', response.data);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      setErrMsg('Failed to update profile.');
    });
  };



  return (
    <section className={styles.forg_pwd_section}>
      {errMsg && <p className={styles.errmsg} aria-live="assertive">{errMsg}</p>}
      <h1>Patient Form</h1>
      <form className={styles.forg_pwd_form} onSubmit={handleFormSubmit}>
        <label className={styles.forg_pwd_label} htmlFor="name">Patient Name. </label>
        <input
          type="text"
          id="name"
          required
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label className={styles.forg_pwd_label} htmlFor="patient_id">ID. </label>
        <input
          type="text"
          id="patient_id"
          required
          autoComplete="off"
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}
        />

        <label className={styles.forg_pwd_label} htmlFor="sex">Sex. </label>
        <input
          type="text"
          id="sex"
          required
          autoComplete="off"
          onChange={(e) => setSex(e.target.value)}
          value={sex}
        />
        <label className={styles.forg_pwd_label} htmlFor="age">Age. </label>
        <input
          type="text"
          id="age"
          required
          autoComplete="off"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <label className={styles.forg_pwd_label} htmlFor="email">Email. </label>
        <input
          type="text"
          id="email"
          required
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className={styles.forg_pwd_label} htmlFor="contact">Contact. </label>
        <input
          type="text"
          id="contact"
          required
          autoComplete="off"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />
        <button type='submit' className={styles.forg_pwd_btn}>Update Patient</button>
      </form>
      <div>
        <a href='/report'>View Report</a>
      </div>
    </section>
  )
}

export default ViewReports;