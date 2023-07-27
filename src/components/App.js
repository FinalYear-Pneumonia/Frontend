import React from 'react';
import Register from './Authorisation/Register';
import AuthPage from './Authorisation/AuthPage';
// import AuthApp from './Authorisation/AuthApp';
import Login from './Authorisation/Login';
import NotFound from './Authorisation/NotFound';
import ForgetPwd from './Authorisation/ForgetPwd';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Home/LandingPage';
import Layout from './Layout';
import { isTokenValid } from './Authorisation/Authservice';
import HomeLayout from './HomeLayout';
import VerifyCode from './Authorisation/VerifyCode';
import ResetPwd from './Authorisation/ResetPwd';
import About from './Home/About';
import Profile from "./Home/Profile";
import ProfileLayout from './ProfileLayout';
import PatientForm from './Home/PatientForm';
import GetAllPatients from './Home/GetAllPatients';
import ViewReports from './Home/ViewReports';
import Report from './Home/Report';
import Diagnose from './Home/Diagnose';
import PredictImageText from './Home/PredictImageText';
import Home from './Home/Home';
import UpdatePwd from './Authorisation/UpdatePwd';
// import styles from './Authorisation/styles.module.css';


function App() {

  return (
    <main >
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="forget" element={<ForgetPwd />} />
          <Route path="verifycode" element={<VerifyCode />} />
          <Route path="resetpwd" element={<ResetPwd />} />
          <Route path="updatepwd" element={<UpdatePwd />} />
        </Route>

        <Route index element={<LandingPage />} />
        <Route path="authpage" element={<AuthPage />} />
        <Route path="home" element={<Home />} />
        <Route path="individual" element={<GetAllPatients />} />
        <Route path="about" element={<About />} />
        <Route path="report" element={<Report />} />
        <Route path="diagnose" element={<Diagnose />} />
        <Route path="predict" element={<PredictImageText />} />
        

        <Route path="/" element={<ProfileLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="patient" element={<PatientForm />} />
          <Route path="view" element={<ViewReports />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </main>
  );
}

export default App;