import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Authorisation/styles.module.css';
import Navbar from './Home/Navbar';

const ProfileLayout = () => {
    return (
        <main>
            <div><Navbar /></div>
            <div className={styles.AuthApp}>
                <Outlet />
            </div>
        </main>
    )
}

export default ProfileLayout;