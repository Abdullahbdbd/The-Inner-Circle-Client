import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Upgrade = () => {
  const {user}=useAuth()
  

    return (
       <div className="max-w-5xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-8">Upgrade to Premium 🌟</h1>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-12">
        <table className="table w-full border">
          <thead>
            <tr className="bg-base-200 text-lg font-semibold">
              <th>Feature</th>
              <th>Free Plan</th>
              <th>Premium Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number of Lessons</td>
              <td>Up to 10</td>
              <td>Unlimited 🚀</td>
            </tr>
            <tr>
              <td>Premium Lesson Creation</td>
              <td>❌ Not allowed</td>
              <td>✅ Allowed</td>
            </tr>
            <tr>
              <td>Access to Premium Lessons</td>
              <td>🔒 Locked</td>
              <td>✅ Full access</td>
            </tr>
            <tr>
              <td>Ad-Free Experience</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Priority Listing</td>
              <td>❌</td>
              <td>✅ Featured</td>
            </tr>
            <tr>
              <td>Lifetime Access</td>
              <td>⏳ Limited</td>
              <td>♾️ Lifetime</td>
            </tr>
            <tr>
              <td>Support</td>
              <td>Email only</td>
              <td>24/7 Premium Support</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Checkout Button */}
      <Link to={`/payment/${user.email}`}
        
        className="btn btn-primary btn-lg px-10"
      >
        💳 Upgrade to Premium — ৳1500 (Lifetime)
      </Link>
    </div>
    );
};

export default Upgrade;