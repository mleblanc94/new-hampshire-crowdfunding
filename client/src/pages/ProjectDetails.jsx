import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { UPDATE_FUNDING } from '../utils/mutations'; // Import your mutation
import './Home.css';
import image1 from '../projImages/image1.jpg';
import image2 from '../projImages/image2.jpg';
import image3 from '../projImages/image3.svg';
import image4 from '../projImages/image4.png';
import image5 from '../projImages/image5.jpg';
import image6 from '../projImages/image6.jpg';

const ProjectDetails = ({ project, addToFavorites, closeModal }) => {
  const getImageSrc = (imageName) => {
    const imageMap = {
      'image1': image1,
      'image2': image2,
      'image3': image3,
      'image4': image4,
      'image5': image5,
      'image6': image6,
    };
    return imageMap[imageName] || imageMap['default.png']; // Fallback to a default image if not found
  };

  const [donationAmount, setDonationAmount] = useState(0);

  // Define your GraphQL mutation for updating funding
  const [updateFunding] = useMutation(UPDATE_FUNDING);

  const handleDonationChange = (event) => {
    const amount = parseFloat(event.target.value);
    const roundedAmount = Math.round(amount); // Round to the nearest dollar
    setDonationAmount(isNaN(roundedAmount) ? 0 : roundedAmount); // Update the state with rounded amount
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = AuthService.getProfile().data._id; // Retrieve user ID from AuthService
    console.log(userId)

    // Call the mutation to update the funding in the database
    // and potentially add the user as a backer
    updateFunding({ variables: { 
      projectId: project._id,
      amount: donationAmount, 
      userId // Include this if your mutation supports adding a backer
    }})
    .then(response => {
      console.log('Funding updated:', response);
      closeModal(); // Close modal or show a success message
    })
    .catch(err => console.error('Error updating funding:', err));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{project.title}</h2>
        <img src={getImageSrc(project.imageName)} alt={project.title} className="w-50" />
        <p>{project.description}</p>
        <p>Category: {project.projectType}</p>

        {/* Mock Credit Card Form for Visual Display */}
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
          <div className="mock-credit-card-input">
            <input type="text" placeholder="Card Number" disabled />
            <input type="text" placeholder="MM/YY" disabled />
            <input type="text" placeholder="CVC" disabled />
          </div>
          {donationAmount > 0 && (
            <button type="submit">Donate</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;



