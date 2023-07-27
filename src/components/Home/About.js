import React from 'react'
import Navbar from './Navbar';
import styles from "./about.module.css";
import doctors from "../../Assets/doctors.jpg";
// import { myTry } from './Home';

const About = () => {
    return (
        <div className={styles.big_wrapper}>
            <div>
                <Navbar />
            </div>

            <div className={styles.home_background}>
                <div className={styles.home_container}>

                    <div className={styles.left}>
                        <div className={styles.big_title}>
                            <h1>About us</h1>
                            {/* <button onClick={myTry}>yes</button> */}
                        </div>
                        <p className={styles.text}>
                        Diagnosing pneumonia using AI is our main priority.
                        Welcome to MediAId, where innovation drives care.
                        Expert team, pioneering precise assessments since 2023.
                        Empowering healthcare in resource-constraint areas.
                        Join us in revolutionizing global health with AI.
                        Together, let's make a difference that matters.
                        </p>
                    </div>
                    <div className={styles.right}>
                        <img src={doctors} alt="Doctor" className={styles.doctor} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About;