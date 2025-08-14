const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {
            ssl: true,
            tlsAllowInvalidCertificates: true,
            tlsAllowInvalidHostnames: true
        });
        console.log('Database Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
};

module.exports = { db };