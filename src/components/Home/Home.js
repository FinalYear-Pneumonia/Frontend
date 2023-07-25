import React from 'react'
import styles from './home.module.css';
import Navbar from './Navbar';
import top from '../../Assets/myDoctor8.png';
import bottom from '../../Assets/myDoctor9.svg';

const Home = () => {
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
                            <img src={top} />
                        </div>
                    </a>
                    <a href='./individual'>
                    <div className={styles.bottom_btn}>
                        <h1>Get All Patient</h1>
                        <img src={bottom} />
                    </div>
                    </a>
                </div>
            </section>
        </main>
    )
}

export default Home;