import React from 'react';
import axios from '../../api/axios';
import styles from '../Authorisation/styles.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FORGPWD_URL = 'http://127.0.0.1:5000/user/user/password_reset'; // Updated URL

const ForgetPwd = () => {
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;

        try {
            const response = await axios.post(FORGPWD_URL, { email });
            console.log(response.data);
            setErrMsg('Please check your email for the password reset link.'); // Updated error message
            localStorage.setItem('resetEmail', email);
            navigate('/verifycode')
        } catch (error) {
            console.error(error);
            setErrMsg('Email not found in the database.'); // Updated error message
        }
    };



    return (
        <section className={styles.forg_pwd_section}>
            {errMsg && <p className={styles.errmsg} aria-live="assertive">{errMsg}</p>}
            <h1>Reset Password</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleEmailSubmit}>
                <label className={styles.forg_pwd_label} htmlFor="email">Enter email address for password recovery. </label>
                <input
                    type="email"
                    id="email"
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button className={styles.forg_pwd_btn}>Submit</button>
            </form>
        </section>
    )
}

export default ForgetPwd;