import React from 'react'
import Navbar from './Navbar';
import styles from "./about.module.css";
import doctors from "../../Assets/doctors.jpg";
// import { myTry } from './Home';

const About = () => {
    return (
        <div className={styles.big_wrapper}>
            <div className={styles.home_nav}>
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
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