import styles from "./login.module.css";
import { FaTimes, FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { useContext, useState } from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { AppContext } from "../../Contextxts/AppContext";
//import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fitlife from "../../images/fitlife.svg";

export const Login = ({ hide, handleHide }) => {
  const [contentChange, setContentChange] = useState(false);
  const { handleLogin } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleClick = async () => {
    handleHide();
    console.log("loginphone",phone);
    handleLogin(phone,password);
  };
  const handleContentChange = () => {
    setContentChange(false);
  };

  // const handleLoginnew = async () => {
  //   fetch(`http://localhost:3000/users/${phone}`).then((data) => {
  //     // Check if user exists in the database
  //     if (!data) {
  //       console.log("cult");
  //       history.push(`/cult`);
  //     } else {
  //       // Redirect to user's personal page
  //       console.log("data", Array.isArray(data));
  //       history.push(`/cart`);
  //     }
  //   })
  //   .catch((error) => {
  //     //setError("Internal server error");
  //     console.error(error);
  //   });

  //   // const res = await fetch('http://localhost:3000/', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({ phone })
  //   // });
  //   // console.log(res);

  //   // if (res.status === 200) {
  //   //   history.push('/personal');
  //   // } else {
  //   //   history.push('/signup');
  //   // }
  // };
  const handleLoginnew = async () => {
  fetch(`http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/users/${phone}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response.json();
    })
    .then(async (data) => {
      // Check if user exists in the database
      if (!data || data.length === 0) {
        const empdata = await fetchEmployeeData();
        console.log("empdata", empdata);
        if (!empdata || empdata.length === 0){
         
          console.log("Not a registered user");
        }
        else {
          history.push(`/cart`);
        }
      } else {
        // Redirect to user's personal page
        console.log("data", data[0].membername);
        localStorage.setItem("name", data[0].membername);
        history.push({
          pathname: '/Member',
          state: { membername: data[0].membername}
        });      
        // history.push('/classbooking');  
      }
    })
    .catch((error) => {
      //setError("Internal server error");
      console.error(error);
    });
};



  

  const LoginDiv = styled.div`
    visibility: ${hide ? "hidden" : "visible"};
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;

    z-index: 2000;
    background-color: rgba(128, 128, 128, 0.555);
  `;

  return (
    <>
      <LoginDiv>
        <div className={styles["login"]}>
          <div className={styles["login__cross"]}>
            <button
              onClick={() => {
                handleContentChange();
                handleHide();
              }}
            >
              <FaTimes />
            </button>
          </div>
          <img
            src="https://static.cure.fit/assets/images/curefit_login_logo.svg"
            alt="logo"
          />
          <img
            src={fitlife}
            alt="name"
          />
          {(
            <>
              <input type="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className={styles["login__continueBtn"]} onClick={handleClick}>Continue</button>

              <button
                onClick={() => setContentChange(true)}
                className={styles["login__google"]}
              >
              </button>
            </>
          ) 
     }
        </div>
      </LoginDiv>
      <div style={{ height: "10px" }}></div>
    </>
  );
};
