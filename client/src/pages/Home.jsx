import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails'; // Create this component separately
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@apollo/client';
import { GET_ALL_PROJECTS } from '../utils/queries';
import 'tachyons';
import './Home.css';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const { loading, error, data } = useQuery(GET_ALL_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const projects = data.getAllProjects;

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const addToFavorites = (project) => {
    setFavorites([...favorites, project]);
  };  

  // Stripe public key (replace with your actual Stripe public key)
  const stripePromise = loadStripe('your_stripe_public_key');

  return (
    <div className="pa4">
      <h1 className="tc">Active Projects</h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-between mw8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="br2 ba dark-gray b--black-10 mv4 w-100 w-40-l shadow-5 ma2"
              onClick={() => openProjectDetails(project)} // Open modal on click
              style={{ cursor: 'pointer' }} // Set cursor to pointer for indication
            >
              <main className="pa4 black-80">
                <h2 className="f4 fw6">{project.title}</h2>
                <img
                  src={project.imageName}
                  alt={project.title}
                  className="w-100 pointer"
                  onClick={(e) => e.stopPropagation()} // Prevent modal open on image click
                />
                <p>{project.description}</p>
                <button onClick={() => addToFavorites(project)}>Add to Favorites</button>
              </main>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Elements stripe={stripePromise}>
          {/* Wrap the ProjectDetails component with Elements provider */}
          <ProjectDetails
            project={selectedProject}
            addToFavorites={addToFavorites}
            closeModal={() => setSelectedProject(null)}
          />
        </Elements>
      )}
    </div>
  );
};

export default Home;
