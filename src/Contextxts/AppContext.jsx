import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("name"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log("Appcontextprovider",token);
    if (token) {
      //getDataById(token);
      // console.log("setting true");
      setIsLoggedIn(true);
    }
  }, []);

  