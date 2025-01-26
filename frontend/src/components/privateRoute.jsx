import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Routes({ element }) {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return localStorage.getItem("authToken") ? true : false;
  };



  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('it is false');
      navigate('/login');
    }
  }, [navigate]); 

  return isAuthenticated() ? element : null; 
}
