const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    amount: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        default: 'expense'
    },
    date: {
        type: String,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500
    }
}, {timestamps: true})
module.exports = mongoose.model('Expense', ExpenseSchema);