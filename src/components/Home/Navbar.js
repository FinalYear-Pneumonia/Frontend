import React from 'react'
import styles from './navbar.module.css';
import { useState } from "react";
import { faHouse, faAddressBook, faUser, faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import logo from "../../Assets/logo.svg";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    function goHome(){
        navigate("/home");
    }
    function logout(){
        localStorage.removeItem('userLoggedInTokenKEY');
        navigate("/authpage");
    }

    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [{
        text: "Home",
        icon: <FontAwesomeIcon icon={faHouse} />

    },
    {
        text: "Profile",
        icon: <FontAwesomeIcon icon={faUser} />

    },
    {
        text: "About Us",
        icon: <FontAwesomeIcon icon={faAddressBook} />

    },
    {
        text: "Logout",
        icon: <FontAwesomeIcon icon={faRightFromBracket} />

    },]

    return (
        <nav className={styles.container_fluid}>
            <div className={styles.nav_title}>
                <img src={logo} alt='logo'/>
                <p onClick={goHome}>PneumoDect</p>
            </div>
            <div className={styles.navbar_links_container}>
                <a href="/home"><FontAwesomeIcon icon={faHouse} />Home</a>
                <a href="/profile"><FontAwesomeIcon icon={faUser} />Profile</a>
                <a href="/about"><FontAwesomeIcon icon={faAddressBook} />About Us</a>
                <a href="/authpage" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} />Logout</a>
            </div>
            <div className={styles.navbar_menu_container}>
                <FontAwesomeIcon icon={faBars} onClick={() => setOpenMenu(true)} />
            </div>


            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>


        </nav>
    )
}

export default Navbar;