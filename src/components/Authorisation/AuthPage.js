import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import styles from './AuthPage.module.css';
import pic81 from '../../Assets/pic81.svg';
import pic85 from '../../Assets/pic85.svg';

const AuthPage = () => {
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  function changeValid() {
    setValid(!valid);
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullname = form.fullname.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;

    try {
      const response = await axios.post('http://127.0.0.1:5000/user/signup', {
        fullname,
        email,
        contact,
        password,
        'confirm-password': confirmPassword,
      });
      // Handle successful signup response
      console.log(response.data); // Update or redirect as needed
      setSuccessMessage('Successfully Completed!'); // Set the success message
      setErrorMessage(''); // Clear any previous error message
      navigate('/authpage');
    } catch (error) {
      // Handle signup error
      console.log(error.response.data.message);
      setErrorMessage('Operation failed. Please try again.'); // Set the error message
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login', {
        email,
        password,
      });
      // Handle successful login response
      console.log(response.data); // Update or redirect as needed
      setSuccessMessage('Successfully Completed!'); // Set the success message
      setErrorMessage(''); // Clear any previous error message
      setToken(response.data.access_token);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      // Handle login error
      console.log(error.response.data.message);
      setErrorMessage('Operation failed. Please try again.'); // Set the error message
      setSuccessMessage(''); // Clear any previous success message
    
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);
  return (

    <div className={`${styles.container_auth} ${valid ? styles.sign_up_mode : ''}`}>
      {successMessage && <p className={styles.succmsg} aria-live="assertive">{successMessage}</p>}
      {errorMessage && <p className={styles.errmsg} aria-live="assertive">{errorMessage}</p>}
      <div class={styles.forms_container}>
        <div class={styles.signin_signup}>
          <form onSubmit={handleSignInSubmit} class={`${styles.form_auth} ${styles.sign_in_form}`}>
            <h2 class={styles.title_auth}>Sign in</h2>
            <div class={styles.input_field}>
              <i></i>
              <input type="text" placeholder="Email" name='email'/>
            </div>
            <div class={styles.input_field}>
              <i></i>
              <input type="password" placeholder="Password" name='password'/>
            </div>
            <input type="submit" value="Login" class={styles.btn_auth} />
            
          </form>
          <form onSubmit={handleSignUpSubmit} class={`${styles.form_auth} ${styles.sign_up_form}`}>
            <h2 class={styles.title_auth}>Sign up</h2>
            <div class={styles.input_field}>
              <i></i>
              <input type="text" placeholder="Fullname" name="fullname" />
            </div>
            <div class={styles.input_field}>
              <i></i>
              <input type="text" placeholder="Email" name='email'/></div>
            <div class={styles.input_field}>
              <i></i>
              <input type="password" placeholder="Password" name='password'/></div>
            <div class={styles.input_field}>
              <i></i>
              <input type="password" placeholder=" Confirm Password" name='confirm_password'/>
            </div>
            <div class={styles.input_field}>
              <i></i>
              <input type="text" placeholder="Contact" name="contact" />
            </div>
            <input type="submit" value="Sign up" class={styles.btn_auth} />
            
          </form>
        </div>
      </div>

      <div class={styles.panels_container}>
        <div class={`${styles.panel} ${styles.left_panel}`}>
          <div class={styles.content}>
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti quaerat reprehenderit illo facere nihil, dolorem, totam aliquid illum tempora, cum debitis qui autem assumenda omnis quidem. Quasi eos perferendis animi?</p>
            <button class={`${styles.btn_auth} ${styles.transparent}`} id="sign-up-btn" onClick={changeValid}>Sign up</button>
          </div>
          <img src={pic81}class={styles.image_auth} alt="" />
        </div>

        <div class={`${styles.panel} ${styles.right_panel}`}>
          <div class={styles.content}>
            <h3>One of us?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti quaerat reprehenderit illo facere nihil, dolorem, totam aliquid illum tempora, cum debitis qui autem assumenda omnis quidem. Quasi eos perferendis animi?</p>
            <button class={`${styles.btn_auth} ${styles.transparent}`} id="sign-in-btn" onClick={changeValid}>Sign in</button>
          </div>
          <img src={pic85} class={styles.image_auth} alt="" />
        </div>
      </div>
    </div>

  );
}

export default AuthPage;
