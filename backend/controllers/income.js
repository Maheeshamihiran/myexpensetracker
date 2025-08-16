const Income = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
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

        const income = new Income({
            title,
            amount: numAmount,
            date,
            category,
            description
        });

        await income.save();
        res.status(201).json({ message: 'Income added successfully', income });

    } catch (error) {
        console.error('Error saving income:', error);
        return res.status(500).json({ error: 'Server error while processing the request.', details: error.message });
    }
}

exports.getIncome = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ error: 'Server error while fetching incomes.' });
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    console.log('Deleting income with ID:', id);
    
    try {
        if (!id) {
            return res.status(400).json({ error: 'Income ID is required.' });
        }
        
        const deletedIncome = await Income.findByIdAndDelete(id);
        
        if (!deletedIncome) {
            return res.status(404).json({ error: 'Income not found.' });
        }
        
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ error: 'Server error while deleting the income.', details: error.message });
    }
}