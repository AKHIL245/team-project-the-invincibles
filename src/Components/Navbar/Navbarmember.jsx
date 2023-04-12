import styles from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import weightlift from "../../images/weightlift.svg";
import logo from "../../images/logo.svg";
import cultIcon from "../../images/gympeoples.svg";
import gympeoples from "../../images/gympeoples.svg";
import pastactivities from "../../images/pastactivities.svg";
import eatIcon from "../../images/eat-icon.svg";
import mindIcon from "../../images/mind-icon.svg";
import gympeople from "../../images/gympeople.svg";
import loghours from "../../images/loghours.svg";
import logout from "../../images/logout.svg";
import fitlife from "../../images/fitlife.svg";

import { Login } from "../Login/Login";
import { useContext, useState } from "react";
import { AppContext } from "../../Contextxts/AppContext";

export const Navbarmember = () => {
  const history = useHistory();
  const [hide, setHide] = useState(true);
  const { isLoggedIn, userData, handleLogout } = useContext(AppContext);
  const handleHide = () => {
    setHide(true);
  };
  const handleLogoutClick = () => {
    // Clear local storage and redirect to home page
    localStorage.clear();
    handleLogout(); // Perform any additional logout actions if needed
    history.push("/");
  };

  return (
    <>
      <header className={styles.nav_section}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <nav>
          <Link to="/classbooking">
            <img src={gympeoples} alt="" />
            Book Class
          </Link>
          <Link to="/ActivitiesPage">
            <img src={pastactivities} alt="" />
            Past Activities
          </Link>
          <Link to="/Member">
            <img src={gympeople} alt="" />
            Classes
          </Link>
          <Link to="/loghours">
            <img src={loghours} alt="" />
            Log Hours
          </Link>
          <button onClick={handleLogoutClick}>
            <img src={logout} height="30px" width="8px" alt="" />
            Logout
          </button>
        </nav>
      </header>
    </>
  );
};
