import React, { useEffect } from 'react'; // Import useEffect from react
import styles from './home.module.css';
import Navbar from './Navbar';
import top from '../../Assets/myDoctor8.png';
import bottom from '../../Assets/myDoctor9.svg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const token = localStorage.getItem('userLoggedInTokenKEY');
        if (!token) {
            navigate('/authpage');
        }
    }, [navigate]); // Add navigate to the dependency array

    return (
        <main>
            <div>
                <Navbar />
            </div>
            <section className={styles.myhome_background}>
                <div className={styles.myhome_wrapper}>
                    <a href='./patient'>
                        <div className={styles.top_btn}>
                            <h1>Register Patient</h1>
                            <img src={top} alt="Top" />
                        </div>
                    </a>
                    <a href='./individual'>
                        <div className={styles.bottom_btn}>
                            <h1>Get All Patient</h1>
                            <img src={bottom} alt="Bottom" />
                        </div>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Home;
