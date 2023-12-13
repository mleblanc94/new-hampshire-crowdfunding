import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CREATED, GET_USER_INTERESTED, GET_USER_DONATED } from '../utils/queries';
import jwt_decode from 'jwt-decode';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import  AuthService  from '../utils/auth';
import './Profile.css';
import image1 from '../projImages/image1.jpg';
import image2 from '../projImages/image2.jpg';
import image3 from '../projImages/image3.svg';
import image4 from '../projImages/image4.png';
import image5 from '../projImages/image5.jpg';
import image6 from '../projImages/image6.jpg';

const Profile = () => {

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
  

  const userId = AuthService.loggedIn() ? AuthService.getProfile().data._id : null;

  const [username, setUsername] = useState('');
  const [createdProjects, setCreatedProjects] = useState([]);
  const [interestProjects, setInterestProjects] = useState([]);
  const [donatedProjects, setDonatedProjects] = useState([]);

  const { loading: loadingCreated, data: data1 } = useQuery(GET_USER_CREATED, {
    variables: { userId },
  });

  const { loading: loadingInterested, data: data2 } = useQuery(GET_USER_INTERESTED, {
    variables: { userId },
  });

  const { loading: loadingDonated, data: data3 } = useQuery(GET_USER_DONATED, {
    variables: { userId },
  });

  useEffect(() => {
    if (data1 && data2 && data3) {
      const { getcreatedProjects } = data1;
      const { getinterestedIn } = data2;
      const { getbackedProjects } = data3;

      setCreatedProjects(getcreatedProjects);
      setInterestProjects(getinterestedIn);
      setDonatedProjects(getbackedProjects);
    }
  }, [data1, data2, data3]);

  // Check loading state of all queries
  const loading = loadingCreated || loadingInterested || loadingDonated;

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching user projects: {error.message}</p>;

  return (
    <div className="pa4">
    <header>
      <h1>Hi {username}!</h1>
      <p>These are the projects that you have created, have interest in, or have donated to:</p>
    </header>

    {/* Projects Created */}
    <section>
      <h2>Projects Created</h2>
      <div className="project-cards">
        {createdProjects.map((project, index) => (
          <div key={index} className="project-card shadow-5">
            <img src={getImageSrc(project.imageName)} alt={getImageSrc(project.imageName)} className='shadow-5' />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <b>Funding Goal:</b> {project.fundingGoal}
            </p>
            <p>
              <b>Current Funding:</b> {project.currentFunding}
            </p>
            {/* Add more details or buttons as needed */}
          </div>
        ))}
      </div>
    </section>

    {/* Projects Interested In */}
    <section>
      <h2>Projects Interested In</h2>
      <div className="project-list">
        {interestProjects.map((project, index) => (
          <div key={index} className="project-card shadow-5">
          <img src={`./${project.imageName}`} alt={project.imageName} className='shadow-5' />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Projects Donated To */}
    <section>
      <h2>Projects Donated To</h2>
      <div className="project-list">
        {backedProjects.map((project, index) => (
         <div key={index} className="project-card shadow-5">
         <img src={`./${project.imageName}`} alt={project.imageName} className='shadow-5' />
         <h3>{project.title}</h3>
         <p>{project.description}</p>
         </div>
       ))}
     </div>
    </section>
  </div>
  );
};

export default Profile;

