const { addExpense, getExpense, updateExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, updateIncome, deleteIncome } = require('../controllers/income');

const router = require('express').Router();


router.post('/add-income',addIncome) 
       .get('/get-income', getIncome)
       .put('/update-income/:id', updateIncome)
       .delete('/delete-income/:id', deleteIncome)
       .post('/add-expense',addExpense)
       .get('/get-expense', getExpense)
       .put('/update-expense/:id', updateExpense)
       .delete('/delete-expense/:id', deleteExpense)

module.exports = router; 