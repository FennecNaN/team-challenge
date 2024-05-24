const mongoose = require('mongoose');

const db = 'practice-mongodb';
const url = 'mongodb://127.0.0.1:27017/';

const dbConnection = async () => {
    await mongoose.connect(url + db)
    console.log('MongoDB connected');
};

module.exports = { dbConnection };
