 import React, { useState } from 'react' 
 import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1';
const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {
      const [expenses,setExpenses] = useState([]);
      const [incomes, setIncomes] = useState([]);
      const [error, setError] = useState(null);

      //incomes

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
        getIncomes();
      }

      const getIncomes = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/get-income`);
          setIncomes(response.data);
          console.log(response.data);
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
        }
      }

      const deleteIncome = async (id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/delete-income/${id}`);
          console.log(response.data);
          alert('Income deleted successfully!');
          getIncomes(); // Refresh the income list after deletion
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
          alert(`Error: ${errorMessage}`);
        }
        getIncomes();
      }

      const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
          totalIncome = totalIncome + income.amount;
        });
        return totalIncome;
      }


     // expenses

      const addExpense = async (expense) => {
        try {
          const response = await axios.post(`${BASE_URL}/add-expense`, expense);
          console.log(response.data);
          alert('Expense added successfully!');
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
          alert(`Error: ${errorMessage}`);
        }
        getExpenses();
      }

      const getExpenses = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/get-expense`);
          setExpenses(response.data);
          console.log(response.data);
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
        }
      }
      
      const deleteExpense = async (id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
          console.log(response.data);
          alert('Expense deleted successfully!');
          getExpenses(); // Refresh the income list after deletion
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
          setError(errorMessage);
          alert(`Error: ${errorMessage}`);
        }
        getExpenses();
      }

      const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
          totalExpense = totalExpense + expense.amount;
        });
        return totalExpense;
      }

      const tranacctionHistory =() => {
        const history = [...incomes, ...expenses];
             history.sort((a,b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
             })
             return history.slice(0,3)
      }
    
   
      // Fetch incomes when the provider mounts
      return (
        <GlobalContext.Provider value={{
          addIncome,
          getIncomes,
          incomes,
          deleteIncome,
          totalIncome,
          addExpense,
          getExpenses,
          expenses,
          deleteExpense,
          totalExpense,
          tranacctionHistory,
          error,
          setError


        }}>
          {children}
        </GlobalContext.Provider>
      );
    }

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
}
    