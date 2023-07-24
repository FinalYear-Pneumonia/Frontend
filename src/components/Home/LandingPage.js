import React from 'react';
import { useState } from 'react';
import { faHouse, faAddressBook, faUser, faRightToBracket, faBars, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import Navbar from './Navbar';
// import Doctor from '../../Assets/doctor-image.png';
import Person from "../../Assets/person.png";
import styles from './landingPage.module.css';
import logo from "../../Assets/logo.svg";

const LandingPage = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
  
  {
      text: "About Us",
      icon: <FontAwesomeIcon icon={faAddressBook} />

  },
  {
      text: "Sign In",
      icon: <FontAwesomeIcon icon={faRightToBracket} />

  },
  {
    text: "Register",
    icon: <FontAwesomeIcon icon={faCheck} />

},
]


  return (
    <div className={styles.big_wrapper}>
      <div>

      <nav className={styles.container_fluid}>
            <div className={styles.nav_title}>
              <img src={logo} alt="logo"/>
                <p>PneumoDect</p>
            </div>
            <div className={styles.navbar_links_container}>
                
                {/* <a href="#"><FontAwesomeIcon icon={faAddressBook} />About Us</a> */}
                <a href="/authpage"><FontAwesomeIcon icon={faRightToBracket} />Sign In</a>
                <a href="/authpage"className={styles.btn}>Register</a>
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


      </div>

      <div className={styles.container_left}>

        <div className={styles.left}>
          <div className={styles.big_title}>
            <h1>Here to Help</h1>
            <h1>Care for you</h1>
          </div>
          <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          </p>
          <div>
            <a href='#' className={styles.btn}>Get started</a>
          </div>
        </div>
        <div className={styles.right}>
          <img src={Person} alt="Doctor" className={styles.doctor} />
        </div>

      </div>
    </div>
  )
}

export default LandingPage;