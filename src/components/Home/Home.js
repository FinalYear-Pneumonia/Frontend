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
                    <div className={styles.top_btn}>
                        <h1><a href='./patient'>Register Patient</a></h1>
                        <img src={top} />
                    </div>
                    <div className={styles.bottom_btn}>
                        <h1><a href='./individual'>Get All Patient</a></h1>
                        <img src={bottom} />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;