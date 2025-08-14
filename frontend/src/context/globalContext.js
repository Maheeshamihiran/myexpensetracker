 import React, { useState } from 'react' 
 import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1';
const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {
      const [expenses] = useState([]);
      const [incomes] = useState([]);
      const [error, setError] = useState(null);


      const addIncome = async (income) => {
        try {
          const response = await axios.post(`${BASE_URL}/add-income`, income);
          console.log(response.data);
          alert('Income added successfully!');
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
          alert(`Error: ${errorMessage}`);
        }
      }

      return (
        <GlobalContext.Provider value={{
          addIncome,
          incomes,
          expenses,
          error
        }}>
          {children}
        </GlobalContext.Provider>
      );
    }

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
}
    