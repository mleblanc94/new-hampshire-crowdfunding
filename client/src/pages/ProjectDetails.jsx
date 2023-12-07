import React from 'react';
import StripeCheckout from 'react-stripe-checkout'; // Import Stripe Checkout component
import 'tachyons';
import './Home.css'

const ProjectDetails = ({ project, addToFavorites, closeModal }) => {
  const handleToken = (token) => {
    // Handle Stripe token (make API call to process payment)
    console.log(token);
    // Add your Stripe payment processing logic here
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

        {/* Stripe Checkout Form */}
        <StripeCheckout
          stripeKey="YOUR_STRIPE_PUBLIC_KEY" // Replace with your Stripe public key
          token={handleToken}
          amount={1000} // Amount in cents (e.g., $10)
          name="Donate"
          description={`Donate for ${project.title}`}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;