import React from 'react';
import axios from '../../api/axios';
import styles from '../Authorisation/styles.module.css'
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const FORGPWD_URL = 'http://127.0.0.1:5000/user/user/password_reset/';

const ResetPwd = () => {
    

    const navigate = useNavigate();
    const [password, setPwd] = useState('');
    const [confirm_password, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value

        try {
            const code = localStorage.getItem('resetCode');
            if (code) {
                const response = await axios.post(`http://127.0.0.1:5000/user/user/password_reset/${code}`, // Replace 'some_token_here' with the actual token
                { password,
                confirm_password });
                
            console.log(response.data); // Assuming you want to log the response data
            localStorage.removeItem('resetCode')
            navigate('/login')
            // Handle success
            } else {
                setErrMsg('Something went wrong! Please try again!');
              }            
        } catch (error) {
            console.error(error);
            if (!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response) {
                setErrMsg('Error');
            }
          
        }
    };


    return (
        <section className={styles.forg_pwd_section}>
            {errMsg && <p className={styles.errmsg} aria-live="assertive">{errMsg}</p>}
            <h1>Reset Password</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <label className={styles.forg_pwd_label} htmlFor="password">New password. </label>
                <input
                    type="password"
                    id="password"
                    required
                    // autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                />

                <label className={styles.forg_pwd_label} htmlFor="confirm_password">Confirm password. </label>
                <input
                    type="password"
                    id="confirm_password"
                    required
                    // autoComplete="off"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={confirm_password}
                />
                <button className={styles.forg_pwd_btn}>Submit</button>
            </form>
        </section>
    );
}

export default ResetPwd;