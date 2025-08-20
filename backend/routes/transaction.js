const { addExpense, getExpense, updateExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, updateIncome, deleteIncome } = require('../controllers/income');
const {signup,login}=require('../controllers/auth')
const auth = require('../middleware/auth');

const router = require('express').Router();


router.post('/signup',signup)
       .post('/login',login)
       .post('/add-income', auth, addIncome) 
       .get('/get-income', auth, getIncome)
       .put('/update-income/:id', auth, updateIncome)
       .delete('/delete-income/:id', auth, deleteIncome)
       .post('/add-expense', auth, addExpense)
       .get('/get-expense', auth, getExpense)
       .put('/update-expense/:id', auth, updateExpense)
       .delete('/delete-expense/:id', auth, deleteExpense)

module.exports = router; 