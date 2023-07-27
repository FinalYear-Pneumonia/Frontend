import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';

const PatientSignUP_URL = 'http://127.0.0.1:5000/patient/signup';

const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1); // Generate age options from 1 to 100

const PatientForm = () => {
  const navigate = useNavigate();

  const [name, setPatient] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [patient_id, setPatientId] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  useEffect(() => {
    const id = localStorage.getItem('selectedPatientId');
    const token = localStorage.getItem('userLoggedInTokenKEY');
    if (!token ) {
      navigate('/authpage');
    }
    else if (!id) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const sex = form.sex.value;
    const patient_id = form.patient_id.value;
    const email = form.email.value;
    const contact = form.contact.value;

    // Check if the email is in the correct format using a regular expression
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrMsg('Please enter a valid email address.');
      return;
    }

    // Check if the contact number is at least 10 characters long
    if (contact.length < 10) {
      setErrMsg('Contact number must be at least 10 characters long.');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true when form is being submitted

      const token = localStorage.getItem('userLoggedInTokenKEY');
      if (token) {
        const response = await axios.post(
          PatientSignUP_URL,
          {
            name,
            patient_id,
            email,
            sex,
            age,
            contact,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        navigate('/individual');
        setErrMsg('Patient Signed UP successfully!');
      } else {
        setErrMsg('SignUP not working at the moment');
      }
    } catch (error) {
      if (!error.response) {
        setErrMsg('No Server Response');
      } else if (error.response) {
        setErrMsg('Error');
      }
    } finally {
      setIsLoading(false); // Set loading state back to false after form submission is complete
    }
  };

  return (
    <section className={styles.forg_pwd_section}>
      {errMsg && (
        <p className={styles.errmsg} aria-live="assertive">
          {errMsg}
        </p>
      )}
      <h1>Patient Form</h1>
      <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
        <label className={styles.forg_pwd_label} htmlFor="name">
          Patient Name.
        </label>
        <input
          type="text"
          id="name"
          required
          autoComplete="off"
          onChange={(e) => setPatient(e.target.value)}
          value={name}
        />

        <label className={styles.forg_pwd_label} htmlFor="patient_id">
          ID.
        </label>
        <input
          type="text"
          id="patient_id"
          required
          autoComplete="off"
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}
        />

        <label className={styles.forg_pwd_label} htmlFor="sex">
          Sex.
        </label>
        <select id="sex" required onChange={(e) => setSex(e.target.value)} value={sex}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className={styles.forg_pwd_label} htmlFor="age">
          Age.
        </label>
        <select id="age" required onChange={(e) => setAge(e.target.value)} value={age}>
          <option value="">Select</option>
          {ageOptions.map((ageOption) => (
            <option key={ageOption} value={ageOption}>
              {ageOption}
            </option>
          ))}
        </select>

        <label className={styles.forg_pwd_label} htmlFor="email">
          Email.
        </label>
        <input
          type="text"
          id="email"
          required
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className={styles.forg_pwd_label} htmlFor="contact">
          Contact.
        </label>
        <input
          type="text"
          id="contact"
          required
          autoComplete="off"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />

        <button className={styles.forg_pwd_btn} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default PatientForm;
