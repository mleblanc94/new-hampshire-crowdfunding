import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails'; // Create this component separately
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_INTERESTED_USER } from '../utils/mutations';
import { GET_USER_NOT_CREATED } from '../utils/queries';
import AuthService from '../utils/auth';
import 'tachyons';
import './Home.css';
import image1 from '../projImages/image1.jpg';
import image2 from '../projImages/image2.jpg';
import image3 from '../projImages/image3.svg';
import image4 from '../projImages/image4.png';
import image5 from '../projImages/image5.jpg';
import image6 from '../projImages/image6.jpg';

const Home = () => {
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

  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const userId = AuthService.loggedIn() ? AuthService.getProfile().data._id : null;
  if(!userId) { // If user is not logged in, redirect to login page
    window.location.assign('/signin');
  }
  const { loading, error, data } = useQuery(GET_USER_NOT_CREATED, {
    variables: { userId },
  });

  const [addInterestedIn] = useMutation(ADD_INTERESTED_USER);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const projects = data.getNotcreatedProjects;

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const isProjectInterestedIn = (projectId, interestedInID) => {
    const userExists = interestedInID.some(user => user._id === userId);

    if (userExists) {
      return <label>Already Chosen Project</label>;
    }
    else {
      return (
        <button onClick={(e) => addInterested(projectId, e)}>
          Interested
        </button>
      );
    }
  };

  const addToFavorites = (project) => {
    setFavorites([...favorites, project]);
  };

  const addInterested = async (projectId, e) => {
    e.stopPropagation();

    try {
      const { data } = await addInterestedIn({
        variables: {
          projectId: projectId,
          userId: userId,
        },
      });

      // Handle the response if needed
      console.log('User added to interestedIn:', data.addTointerestedIn);
    } catch (error) {
      console.error('Error adding user to interestedIn:', error.message);
    }
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
              onClick={() => openProjectDetails(project)}
              style={{ cursor: 'pointer' }}
            >
              <main className="pa4 black-80">
                <h2 className="f4 fw6">{project.title}</h2>
                <img
                  src={getImageSrc(project.imageName)}
                  style={{ maxWidth: '250px', maxHeight: '250px' }}
                  alt={project.title}
                  className="w-100 pointer"
                  onClick={(e) => e.stopPropagation()}
                />
                <p>{project.description}</p>
                {/* Display funding information */}
                <div className="funding-info">
                  <p>Goal: ${project.fundingGoal}</p>
                  <p>Current Funding: ${project.currentFunding}</p>
                </div>
                <button onClick={() => addToFavorites(project)}>Donate</button>&nbsp;&nbsp;
                {isProjectInterestedIn(project._id, project.interestedIn)}
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