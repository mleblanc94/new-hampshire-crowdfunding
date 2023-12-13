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
      <div>
        <h1>Welcome to New Hampshire Crowd Funding!</h1>
        <p>
          Embark on a journey where ideas come to life and dreams find their wings.
          At New Hampshire Crowd Funding, we believe in the power of community, passion, and the extraordinary impact that can be made when people come together.
        </p>
        <p>
          Our platform is more than just a crowdfunding space; its a vibrant ecosystem where creators, backers, and visionaries unite to shape the future. Whether
          you are an innovator with a groundbreaking project, a supporter seeking the next big thing, or a dreamer looking to be part of something extraordinary
          you have found your home.
        </p>
        <p>
          oin us in the art of turning dreams into reality, where every project has a story, and every backer is a crucial part of that narrative.
          From cutting-edge tech to artistic masterpieces, social causes to entrepreneurial ventures - the possibilities are endless.
        </p>
        <p>
         Here, we celebrate the power of collaboration, the spirit of creativity, and the profound impact that small contributions can make. 
         Together, let us build, support, and inspire. Welcome to the community where dreams are fueled, ideas are nurtured, and the extraordinary becomes the norm.
          <br />
          Are you ready to bring your vision to life or be part of something incredible? Dive in and explore the world of limitless possibilities. 
          <br /><br />
          Welcome to New Hampshire Crowd Funding - Where Dreams Take Flight!
        </p>
      </div>
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
                  src={`./${project.imageName}`}
                  style={{ maxWidth: '250px', maxHeight: '250px' }}
                  alt={project.title}
                  className="w-100 pointer"
                  onClick={(e) => e.stopPropagation()} // Prevent modal open on image click
                />
                <p>{project.description}</p>
                <button onClick={() => addToFavorites(project)}>Donate</button>
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