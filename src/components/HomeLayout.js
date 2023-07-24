import React from 'react'
import { Outlet } from 'react-router-dom';
// import './Home/navbar.module.css';

const HomeLayout = () => {
    return (
        <main>
            <Outlet />
        </main>
    )
}

export default HomeLayout;