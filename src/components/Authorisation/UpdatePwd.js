import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from '../Authorisation/styles.module.css';
import { useNavigate } from 'react-router-dom';

const UpdatePwd = () => {
    const navigate = useNavigate();
    const [password, setPwd] = useState('');
    const [confirm_password, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    useEffect(() => {
        const token = localStorage.getItem('userLoggedInTokenKEY');
        if (!token) {
            navigate('/authpage');
        }
    }, [navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
        const token = localStorage.getItem('userLoggedInTokenKEY');

        if (password.length < 8) {
            setErrMsg('Password must be at least 8 characters long.');
            return;
        }
        if (password !== confirm_password) {
            setErrMsg('Passwords do not match.');
            return;
        }

        try {
            const email = localStorage.getItem('emailForPasswordUpdate');
            if (email) {
                const response = await axios.post(`http://127.0.0.1:5000/user/user/password_update/${email}`, {
                    password,
                    confirm_password,
                }, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  });

                console.log(response.data); // Assuming you want to log the response data
                window.alert('Password updated successfully!');
                navigate('/profile');
                localStorage.removeItem('emailForPasswordUpdate');
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
            <h1>Update Password</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <label className={styles.forg_pwd_label} htmlFor="password">New password.</label>
                <input
                    type="password"
                    id="password"
                    required
                    autoComplete="new-password" // Use "new-password" to avoid browser auto-fill
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                />

                <label className={styles.forg_pwd_label} htmlFor="confirm_password">Confirm password.</label>
                <input
                    type="password"
                    id="confirm_password"
                    required
                    autoComplete="new-password" // Use "new-password" to avoid browser auto-fill
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={confirm_password}
                />
                <button type="submit" className={styles.forg_pwd_btn}>Submit</button>
            </form>
        </section>
    );
};

export default UpdatePwd;
