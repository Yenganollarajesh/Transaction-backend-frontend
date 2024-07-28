const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// SQLite database setup
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Transaction model
const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    runningBalance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

// Sync database
sequelize.sync();

// CRUD operations
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/transactions', async (req, res) => {
    const { type, amount, description } = req.body;

    try {
        // Convert amount to a float
        const parsedAmount = parseFloat(amount);

        // Fetch the most recent transaction
        const lastTransaction = await Transaction.findOne({
            order: [['id', 'DESC']]
        });

        // Calculate the new running balance
        const previousBalance = lastTransaction ? lastTransaction.runningBalance : 0;
        const runningBalance = type === 'Credit'
            ? previousBalance + parsedAmount
            : previousBalance - parsedAmount;

        // Create the new transaction record
        const newTransaction = await Transaction.create({
            type,
            amount: parsedAmount,
            description,
            runningBalance
        });

        res.json(newTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
