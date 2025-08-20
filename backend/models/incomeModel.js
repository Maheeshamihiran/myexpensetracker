const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
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
        default: 'income'
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})
module.exports = mongoose.model('Income', IncomeSchema);