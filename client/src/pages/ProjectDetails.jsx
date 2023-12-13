import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { UPDATE_FUNDING } from '../utils/mutations'; // Import your mutation
import './Home.css';

const ProjectDetails = ({ project, addToFavorites, closeModal }) => {
  const [donationAmount, setDonationAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  // Define your GraphQL mutation for updating funding
  const [updateFunding] = useMutation(UPDATE_FUNDING);

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
      // Call the mutation to update the funding in the database
      updateFunding({ variables: { projectId: project.id, amount: donationAmount } })
        .then(response => {
          console.log('Funding updated:', response);
          // You may want to do something after updating the funding, like closing the modal or showing a success message
          closeModal();
        })
        .catch(err => console.error('Error updating funding:', err));

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

