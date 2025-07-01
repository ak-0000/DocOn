import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL + "/api/user/get-profile", {
        headers: { token },

      });
      if (data.success) {
        setUserData(data.userData);
        console.log(userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL + "/api/doctor/list" );
      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    BACKEND_URL,
    setUserData,
    userData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
