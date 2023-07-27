import React, { useState } from 'react';
import styles from './reportForm.module.css';
import axios from 'axios'; // Import axios for API requests
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink, Font } from '@react-pdf/renderer';

const ReportForm = (props) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const logoImage = 'data:image/jpeg;base64,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'; // Replace with your logo base64 string

  const handleDelete = () => {
    const reportId = props.report_id;
    const token = localStorage.getItem('userLoggedInTokenKEY');

    axios.delete(`http://127.0.0.1:5000/patient/patient_report/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Report deleted successfully:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting report:', error);
        // Handle any error that may occur during the API request
      });
  };

  const handleDownload = () => {
    const reportId = props.report_id;
    const token = localStorage.getItem('userLoggedInTokenKEY');

    axios.get(`http://127.0.0.1:5000/patient/patient_report/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'json',
    })
      .then(response => {
        setReportData(response.data);
        setLoading(true);
      })
      .catch(error => {
        console.error('Error downloading report:', error);
        // Handle any error that may occur during the API request
      });
  };

  Font.register({ family: 'Helvetica-Bold', src: 'src\components\Helvetica-Bold-Font.ttf' });

  const pdfStyles = StyleSheet.create({
    page: {
      padding: 40,
    },
    reportTitle: {
      fontSize: 24,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    reportSubtitle: {
      fontSize: 18,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 6,
    },
    patientInfo: {
      fontSize: 14,
      marginBottom: 6,
    },
    sectionHeader: {
      fontSize: 16,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 5,
    },
    sectionContent: {
      marginBottom: 15,
    },logoContainer: {
      position: 'relative',
      top: 30, // Adjust the top position as needed
      left: 128, // Adjust the left position as needed
    },
    logo: {
      width: 40, // Adjust the width and height according to your logo size
      height: 30,
    },
    footer: {
      marginTop: 30,
      fontSize: 10,
      textAlign: 'center',
      color: 'gray',
    },
    // Additional style for the buttons container
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '20px 0',
    },
    // Style for each button
    button: {
      padding: '10px 20px',
      fontSize: 16,
      fontFamily: 'Helvetica-Bold',
      borderRadius: 5,
      cursor: 'pointer',
    },
    // Style for the "Download" button
    downloadButton: {
      backgroundColor: '#007BFF', // Set your desired color
      color: '#FFFFFF', // Set your desired color
    },
    // Style for the "View" button
    viewButton: {
      backgroundColor: '#FFFFFF', // Set your desired color
      color: '#007BFF', // Set your desired color
      border: '2px solid #007BFF', // Set your desired color
    },
  });

  return (
    <div className={styles.report_form}>
      <div className={styles.note_container}>
        <div className={styles.note}>
          <h1>Prediction Type: {props.PType}</h1>
          <p>Prediction (%): {props.Prediction}</p>
          <p>Pneumonia Status: {props.Pneumonia}</p>
          <p>Date: {props.Date}</p>
          <div className={styles.buttonContainer}>
            {/* "View" button */}
            <button className={styles.buttonStyle} onClick={handleDownload}>
              View Report
            </button>

            {/* "Download" button */}
            {reportData && (
              <PDFDownloadLink
                document={
                  <Document>
            <Page style={pdfStyles.page}>
              <View style={pdfStyles.logoContainer}>
                <Image src={logoImage} style={pdfStyles.logo} />
              </View>

              <Text style={pdfStyles.reportTitle}>Medical Report</Text>

              <Text style={pdfStyles.sectionHeader}>Patient Details</Text>
              <View style={pdfStyles.sectionContent}>
              <Text style={pdfStyles.patientInfo}>Patient Name: {reportData.patient_name}</Text>
              <Text style={pdfStyles.patientInfo}>Patient ID: {reportData.patient_id}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Email: {reportData.patient_email}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Age: {reportData.patient_age}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Sex: {reportData.patient_sex}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Contact: {reportData.patient_contact}</Text>
              </View>

              <Text style={pdfStyles.sectionHeader}>Prediction Details</Text>
              <View style={pdfStyles.sectionContent}>
                <Text>Prediction Type: {reportData.prediction_type}</Text>
                <Text>Prediction: {reportData.prediction}</Text>
                <Text>Has Pneumonia: {reportData.has_pneumonia ? 'Yes' : 'No'}</Text>
              </View>

              <Text style={pdfStyles.sectionHeader}>Recorder Details</Text>
              <View style={pdfStyles.sectionContent}>
                <Text>Recorder Name: {reportData.recorder_name}</Text>
              </View>

              <Text style={pdfStyles.sectionHeader}>Description</Text>
              <View style={pdfStyles.sectionContent}>
                <Text>{reportData.description}</Text>
              </View>

              <Text style={pdfStyles.footer}>Generated by Your Medical App</Text>
            </Page>
          </Document>
                }
                fileName="medical_report.pdf" // Set the desired file name for the downloaded PDF
              >
                {({ blob, url, loading, error }) => (
                  <button className={`${styles.buttonStyle} ${styles.secondaryBtn}`}>
                    Download Report
                  </button>
                )}
              </PDFDownloadLink>
            )}

            <button className={`${styles.buttonStyle} ${styles.secondaryBtn}`} onClick={handleDelete}>
              Delete Report
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      {loading && reportData && (
        <PDFViewer width="100%" height="600px">
          <Document>
              <Page style={pdfStyles.page}>
                <View style={pdfStyles.logoContainer}>
                  <Image src={logoImage} style={pdfStyles.logo} />
                </View>

                <Text style={pdfStyles.reportTitle}>Medical Report</Text>

              <Text style={pdfStyles.sectionHeader}>Patient Details</Text>
              <View style={pdfStyles.sectionContent}>
              <Text style={pdfStyles.patientInfo}>Patient Name: {reportData.patient_name}</Text>
              <Text style={pdfStyles.patientInfo}>Patient ID: {reportData.patient_id}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Email: {reportData.patient_email}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Age: {reportData.patient_age}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Sex: {reportData.patient_sex}</Text>
              <Text style={pdfStyles.patientInfo}>Patient Contact: {reportData.patient_contact}</Text>
              </View>

              <Text style={pdfStyles.sectionHeader}>Prediction Details</Text>
              <View style={pdfStyles.sectionContent}>
                <Text style={pdfStyles.patientInfo}>Prediction Type: {reportData.prediction_type}</Text>
                <Text style={pdfStyles.patientInfo}>Prediction: {reportData.prediction}</Text>
                <Text style={pdfStyles.patientInfo}>Has Pneumonia: {reportData.has_pneumonia ? 'Yes' : 'No'}</Text>
              </View>

              <Text style={pdfStyles.sectionHeader}>Recorder Details</Text>
              <View style={pdfStyles.sectionContent}>
                <Text style={pdfStyles.patientInfo}>Recorder Name: {reportData.recorder_name}</Text>
              </View>

              <Text style={pdfStyles.sectionHeader}>Description</Text>
              <View style={pdfStyles.sectionContent}>
                <Text style={pdfStyles.patientInfo}>{reportData.description}</Text>
              </View>

              <Text style={pdfStyles.footer}>Generated by Your Medical App</Text>
            </Page>
            </Document>
        </PDFViewer>
      )}
    </div>
  );
};

export default ReportForm;
