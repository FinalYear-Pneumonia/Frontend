import React from 'react';
import { useState, useEffect } from 'react'
// import axios from '../../api/axios';
import styles from './profile.module.css';
import P_logo from '../../Assets/profile.svg';
import axios from '../../api/axios';

const Profile = () => {
  const [image, setImage] = useState();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // Fetch user data from the backend API
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:5000/user/user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setFullname(response.data.fullname);
      setEmail(response.data.email);
      setContact(response.data.contact);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      setErrMsg('Failed to fetch user data.');
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make a PUT request to update the user profile
    const token = localStorage.getItem('token');
    axios.put('http://127.0.0.1:5000/user/user/', {
      fullname,
      email,
      contact,
    }, {
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

  function onUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    setImage(URL.createObjectURL(file));

    const formdata = new FormData();
    // console.log(image);
    formdata.append('file', file);
    axios.post('url', formdata,{
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }).then(res => console.log())
    .catch(err => console.log());
    //  console.log(e.target.files[0]);
  }


  return (
    <section className={styles.forg_pwd_section}>
      {errMsg && <p className={styles.errmsg} aria-live="assertive">{errMsg}</p>}
      <div className={styles.prof}>
      <h1>Profile</h1>
      </div>
      <form className={styles.forg_pwd_form} onSubmit={handleFormSubmit}>

        <div>
          <label htmlFor="profile">
            <img src={image || P_logo} className={styles.image} alt="avatar" />
          </label>

          <input className={styles.myProfile} accept='image/*' onChange={onUpload} type="file" id='profile' name='profile' />
        </div>

        <label className={styles.forg_pwd_label} htmlFor="fullname">Fullname</label>
        <input
          type="text"
          id="fullname"
          // name="fullname"
          // defaultValue={"Theophilus"}
          required
          autoComplete="off"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
        />

        <label className={styles.forg_pwd_label} htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          required
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className={styles.forg_pwd_label} htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          required
          autoComplete="off"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />

        <button type='submit' className={styles.forg_pwd_btn}>Update profile</button>
      </form>
      <p><br />
                <span className='line'>
                    <a href='/forgetpwd'>Reset Password?</a>
                </span><br /><br />

                <span className='line'>
                    <a href='/home'>Go Home</a>
                </span>
            </p>
    </section>
  )
}

export default Profile;