import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h1 className='text-red-500'>Payment Cancelled</h1>
            <Link to='/upgrade' className='btn btn-primary'>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;