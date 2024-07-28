import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionsList from './components/TransactionsList';
import AddTransaction from './components/AddTransaction';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<TransactionsList />} />
                    <Route path="/add" element={<AddTransaction />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
