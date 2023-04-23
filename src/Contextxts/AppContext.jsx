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

  const getDataById = async (id) => {
    const res = await fetch(
      `https://secure-plateau-49386.herokuapp.com/users/me/${id}`
    );
    // console.log(res);
    const user = await res.json();
    // console.log(user);
    setUserData(user);
  };
  //Login Handler
  // const handleLogin = async (googleUser) => {
  //   const { tokenId } = googleUser;

  //   const res = await fetch(
  //     "https://secure-plateau-49386.herokuapp.com/users/api/v2/auth/google",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         token: tokenId,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await res.json();
  //   // console.log(data._id);
  //   localStorage.setItem("userid", data._id);
  //   // console.log(data._id ? "yes" : "no");
  //   if (data._id) {
  //     localStorage.setItem("userid", data._id);
  //     setToken(localStorage.getItem("name"));
  //   }

  //   setUserData(data);
  //   setIsLoggedIn(true);
  // };
  const handleLogin = async (phone) => {
    //const { phone } = phone;

      const response = await fetch(`http://localhost:3000/users/${phone}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        // console.log("data",data);
      } else {
        // Redirect to user's personal page
        console.log("appcontextuserdata", data);
      }
    //const data = await response.json();
    console.log(data);
      localStorage.setItem("name", data[0].membername);
    // console.log(data._id ? "yes" : "no");
    if (data[0].membername) {
      localStorage.setItem("name", data[0].membername);
      setToken(localStorage.getItem("name"));
    }

    setUserData(data);
    setIsLoggedIn(true);
  };
  // Logout Handler

  const handleLogout = () => {
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserData({});
  };
  // History hook
  const history = useHistory();
  return (
    <AppContext.Provider
      value={{ history, isLoggedIn, userData, handleLogin, handleLogout }}
    >
      {children}
    </AppContext.Provider>
  );
};
