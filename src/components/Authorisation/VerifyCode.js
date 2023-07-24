import React from 'react'
import axios from '../../api/axios';
import styles from '../Authorisation/styles.module.css'
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const RESEND_CONFIRMATION_URL = 'http://127.0.0.1:5000/user/resend-confirmation-number-for-password';

const VerifyCode = () => {

    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    const handleResend = async (e) => {
        try{

        const email = localStorage.getItem('resetEmail'); // Retrieve the email from localStorage
      if (email) {
        const response = await axios.post(
                RESEND_CONFIRMATION_URL,
                {email});
            console.log(response.data); // Assuming you want to log the response data
            navigate('/verifycode')
            // Handle success
            setErrMsg('Token sent successfully');
            localStorage.removeItem('resetEmail')
        }  else {
            setErrMsg('Something went wrong! Please try again!');
          }
          
        }catch (error) {
            console.error(error);
            if (!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response) {
                setErrMsg('Error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const code = form.code.value;

        localStorage.setItem('resetCode', code);
        navigate('/resetpwd')
    };

    return (
        <section className={styles.forg_pwd_section}>
            {errMsg && <p className={styles.errmsg} aria-live="assertive">{errMsg}</p>}
            <h1>Verify Code</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <label className={styles.forg_pwd_label} htmlFor="username">Enter the 6 digits code sent to your Email. </label>
                <input
                    type="text"
                    id="code"
                    autoComplete="off"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    required
                />
                <button className={styles.forg_pwd_btn}>Submit</button>
            </form>

            <p>
                Did not recieve code?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#" onClick={handleResend}>Resend code</a>
                </span>
            </p>
        </section>
  )
}

export default VerifyCode