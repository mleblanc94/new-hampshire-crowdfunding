import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails';
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
    return imageMap[imageName] || imageMap['default.png'];
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const profile = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const userId = profile?.data?._id;

  const { loading, error, data } = useQuery(GET_USER_NOT_CREATED, {
    variables: { userId },
    skip: !userId, // ✅ SKIP query if userId is not available
  });

  const [addInterestedIn] = useMutation(ADD_INTERESTED_USER);

  if (!userId) {
    return (
      <div className="tc pa4">
        <h2>You must be logged in to view projects.</h2>
        <button onClick={() => window.location.assign('/signin')}>Go to Login</button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;

  const projects = data?.getNotcreatedProjects || [];

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const isProjectInterestedIn = (projectId, interestedInID) => {
    const userExists = interestedInID.some(user => user._id === userId);
    if (userExists) {
      return <label>Already Chosen Project</label>;
    } else {
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
          projectId,
          userId,
        },
      });
      console.log('User added to interestedIn:', data.addTointerestedIn);
    } catch (error) {
      console.error('Error adding user to interestedIn:', error.message);
    }
  };

  const stripePromise = loadStripe('your_stripe_public_key');

  return (
    <div className="pa4">
      <div>
        <h1>Welcome to New Hampshire Crowd Funding!</h1>
        <p>Embark on a journey where ideas come to life and dreams find their wings...</p>
        {/* Keep your intro paragraphs here */}
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