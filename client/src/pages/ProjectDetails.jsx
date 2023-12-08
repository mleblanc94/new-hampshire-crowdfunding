import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Home.css';

const ProjectDetails = ({ project, addToFavorites, closeModal }) => {
  const [donationAmount, setDonationAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const handleDonationChange = (event) => {
    const amount = parseFloat(event.target.value);
    const roundedAmount = Math.round(amount); // Round to the nearest dollar
    setDonationAmount(isNaN(roundedAmount) ? 0 : roundedAmount); // Update the state with rounded amount
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error:', error);
    } else {
      // On successful token creation, handle the payment method or token on your backend
      // You'll need to send this 'paymentMethod.id' to your server for further processing
      console.log('PaymentMethod:', paymentMethod);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{project.title}</h2>
        <img src={project.image} alt={project.title} className="w-100" />
        <p>{project.description}</p>
        <p>Category: {project.category}</p>
        <button onClick={() => addToFavorites(project)}>Add to Favorites</button>

        {/* Custom Donation Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="donationAmount">Enter Donation Amount:</label>
          <div className="dollar-input">
            <span>$</span>
            <input
              type="number"
              id="donationAmount"
              name="donationAmount"
              value={donationAmount}
              onChange={handleDonationChange}
            />
          </div>
          {donationAmount > 0 && (
            <CardElement />
          )}
          {donationAmount > 0 && (
            <button type="submit">Donate</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;

