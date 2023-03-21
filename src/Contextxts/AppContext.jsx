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
  const handleLogin = async (phone,password) => {
    //const { phone } = phone;

      const response = await fetch(`http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/users/${phone}?password=${password}`);
      if (!response.ok) {
        alert("Looks like you don't have an account! Please contact FrontDesk.");
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        // console.log("data",data);
        const responseemp = await fetch(`http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/employee/${phone}?password=${password}`);
      if (!responseemp.ok) {
        alert("Looks like you don't have an account! Please contact FrontDesk.");
      }


      const dataemp = await responseemp.json();
      if (!dataemp || dataemp.length === 0) {
        console.log("data",dataemp);
      }
      else {
        // Redirect to user's personal page
        console.log("appcontextempdata", dataemp);
        if (dataemp[0].employeename) {
          localStorage.setItem("name", dataemp[0].employeename);
          setToken(localStorage.getItem("name"));
          history.push('/Employee');
        }
      }
      
     }
      else {
        // Redirect to user's personal page
        console.log("appcontextuserdata", data);
        const validUntil = new Date(data[0].validuntill);
  const currentDate = new Date();

  if (currentDate <= validUntil) {
    localStorage.setItem("name", data[0].membername);
    setToken(localStorage.getItem("name"));
    history.push("/Member");
  } else {
    alert("Your membership period is done! Please contact front desk.");
  }
      }
    //const data = await response.json();
    //console.log(data);
      //localStorage.setItem("name", data[0].membername);
    // console.log(data._id ? "yes" : "no");

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
