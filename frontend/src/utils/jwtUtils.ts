
import {jwtDecode} from 'jwt-decode';


export const decodeJwt = (token) => {
  try {
  
    if (!token) {
      throw new Error("Token is missing");
    }

    const decoded = jwtDecode(token); 
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error.message || error);
    return null;
  }
};
