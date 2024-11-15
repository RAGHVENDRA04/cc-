import React, { useEffect, useState } from 'react';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const response = await fetch(url);
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });
            const result = await response.json();
            handleSuccess(result?.message);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const response = await fetch(url, {
                method: 'DELETE'
            });
            const result = await response.json();
            handleSuccess(result?.message);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    return (
        <div>
            <div className='user-section'>
                <h1>Welcome User</h1>
            </div>
            <ExpenseDetails
                incomeAmt={incomeAmt}
                expenseAmt={expenseAmt}
            />

            <ExpenseForm
                addTransaction={addTransaction} />

            <ExpenseTable
                expenses={expenses}
                deleteExpens={deleteExpens}
            />
            <ToastContainer />
        </div>
    )
}

export default Home;
