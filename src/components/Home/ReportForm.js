import React from 'react'
import styles from './reportForm.module.css';

const ReportForm = (props) => {
    return (
        <div>
            <div className={styles.note}>
                <h1>Prediction Type: {props.PType}</h1>
                <p>Prediction (%): {props.Prediction}</p>
                <p>Pneumonia Status: {props.Pneumonia}</p>
                <p>Date: {props.Date}</p>
            </div>
        </div>
    )
}

export default ReportForm;