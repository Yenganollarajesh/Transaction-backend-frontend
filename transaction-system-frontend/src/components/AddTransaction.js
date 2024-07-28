import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddTransaction.css'; // Import the CSS file

const AddTransaction = () => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/transactions', { type, amount, description });
        console.log("save button is clicked")
        console.log("Type: " +type, "amount: "+amount, "description: " +description)
        navigate('/');
    };

    const handleCancel = () => {
        console.log("Cancel button clicked")
        navigate('/');
    };
    const handelSelectOptions = (e) => {
        console.log("HandelSelectOptions: "+e.target.value)
        setType(e.target.value)
    }

    const handleAmount=(e)=>{
        console.log("handleAmount: "+e.target.value)
        setAmount(e.target.value)
    }
    const handleDescription=(e)=>{
        console.log("handleDescription: "+e.target.value)
        setDescription(e.target.value)
    }

    return (
        <div className="add-transaction-container">

            <div className="header">
                <h2 className="headerText">New Transaction</h2>
                <button className='cancelButton' onClick={handleCancel}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <label htmlFor="type">Transaction Type</label>
                    {/* <select id="type" value={type} onChange={(e) => setType(e.target.value)} required className='inputType'> */}
                    <select id="type" value={type} onChange={handelSelectOptions} required className='inputType'>
                        <option value="">Select Type</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>
                <div className='formGroup'>
                    <label htmlFor="amount">Amount</label>
                    {/* <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required/>    */}
                    <input id="amount" type="number" value={amount} onChange={handleAmount} required/> 
                </div>
                <div className='formGroup'>
                    <label htmlFor="description">Description</label>
                    {/* <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>  */}
                    <input id="description" type="text" value={description} onChange={handleDescription} required/>
                </div>
                <div className='buttonContainer'> 
                    <button type="submit">Save</button>
                    <button type="button" className='cancelButton' onClick={handleCancel}>X cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;

    