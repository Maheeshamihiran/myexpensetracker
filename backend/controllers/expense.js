const Expense = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
    console.log(req.body);

    const { title, amount, date, category, description } = req.body;
    const userId = req.user?.id;

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
            description,
            user: userId
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });

    } catch (error) {
        console.error('Error saving expense:', error);
        return res.status(500).json({ error: 'Server error while processing the request.', details: error.message });
    }
}

exports.getExpense = async (req, res) => {
    const userId = req.user?.id;
    
    try {
        const expenses = await Expense.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching expenses.' });
    }
}

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, category, description } = req.body;
    const userId = req.user?.id;
    
    try {
        if (!id) {
            return res.status(400).json({ error: 'Expense ID is required.' });
        }
        
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, user: userId },
            { title, amount, date, category, description },
            { new: true }
        );
        
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found or unauthorized.' });
        }
        
        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Server error while updating the expense.', details: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    
    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, user: userId });
        
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found or unauthorized.' });
        }
        
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting the expense' });
    }
}