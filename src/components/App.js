import React from 'react';
import Register from './Authorisation/Register';
import AuthPage from './Authorisation/AuthPage';
// import AuthApp from './Authorisation/AuthApp';
import Login from './Authorisation/Login';
import NotFound from './Authorisation/NotFound';
import ForgetPwd from './Authorisation/ForgetPwd';
import { Routes, Route } from 'react-router-dom';
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
import Home from './Home/Home';
// import styles from './Authorisation/styles.module.css';


function App() {

  return (
    <main >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path='/' element = {<LandingPage/>} />
          <Route path="forgetpwd" element={<ForgetPwd />} />
          <Route path="/verifycode" exact element={<VerifyCode />} />
          <Route path="/resetpwd" exact element={<ResetPwd />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patient" element={<PatientForm />} />
          <Route path="/view" element={<ViewReports />} />
          <Route path="*" element={<NotFound />} />
        </Route>


        {/* <Route path="/profile" element={<ProfileLayout />}>

        </Route> */}

        <Route path="/home" element={<Home />} />
        <Route path="/individual" exact element={<GetAllPatients />} />
        <Route path="/report" exact element={<Report />} />
        <Route path="/authpage" exact element={<AuthPage />} />
        <Route path="/diagnose" exact element={<Diagnose />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/about" element={<About />} />


        {/* <Route path="/home" element={<HomeLayout />}>
          <Route path="/home" element={<LandingPage />} />
          <Route path="landing" element={<Home />} />
        </Route > */}
      </Routes>
    </main>
  );
}

export default App;