import styles from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";
import employee from "../../images/employee.svg";
import addclass from "../../images/addclass.svg";
import loghours from "../../images/loghours.svg";
import mindIcon from "../../images/mind-icon.svg";
import checkin from "../../images/checkin.svg";
import checkout from "../../images/checkout.svg";
import member from "../../images/member.svg";
import Analytics from "../../images/analytics.svg";
import logout from "../../images/logout.svg";
import { Login } from "../Login/Login";
import { useContext, useState } from "react";
import { AppContext } from "../../Contextxts/AppContext";

export const Navbaremployee = () => {
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
          <Link to="/Employee">
            <img src={member} alt="" />
            Enroll Member
          </Link>
          <Link to="/CheckIn">
            <img src={checkin} alt="" />
            CheckIn
          </Link>
          <Link to="/CheckOut">
            <img src={checkout} alt="" />
            CheckOut
          </Link>
          <Link to="/AddEmployeePage">
            <img src={employee} alt="" />
            Add Employee
          </Link>
          <Link to="/AddClasses">
            <img src={addclass} alt="" />
            Add Class
          </Link>
          <Link to="/Analytics">
            <img src={Analytics} alt="" />
            Analytics
          </Link>
          <button onClick={handleLogoutClick}>
            <img src={logout} alt="" height="30px" width="8px"/>
            Logout
          </button>
        </nav>
      </header>
    </>
  );
};
