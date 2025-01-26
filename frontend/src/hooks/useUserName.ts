import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Import the jwt-decode library

const useUserName = () => {
  const [userName, setUserName] = useState(null); // State to hold the user's name

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        // Decode the JWT to extract the user data
        const decoded = jwtDecode(token);
        console.log(decoded,"part of jwt")
        
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  return userName;
};

export default useUserName;
