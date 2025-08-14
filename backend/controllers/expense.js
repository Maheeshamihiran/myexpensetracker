const Expense = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
    console.log(req.body);

    const { title, amount, date, category, description } = req.body;

    try {
        if (!title || !amount || !category) {
            return res.status(400).json({ message: 'Title, amount, and category are required.' });
        }
        
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number.' });
        }

        const expense = new Expense({
            title,
            amount: numAmount,
            date,
            category,
            description
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });

    } catch (error) {
        console.error('Error saving expense:', error);
        return res.status(500).json({ error: 'Server error while processing the request.', details: error.message });
    }
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching expenses.' });
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting the expense' });
    }
}