import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CREATED, GET_USER_INTERESTED, GET_USER_DONATED } from '../utils/queries';
import jwt_decode from 'jwt-decode';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import  AuthService  from '../utils/auth';

const Profile = () => {

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
        {createdProjects.length > 0 ? (
          <ul>
            {createdProjects.map((project, index) => (
              <li key={index}>{project.title}
              <br></br>
              {project.description}
              <br></br>
              <b>Funding Goal :</b>{project.fundingGoal}
              <br></br>
              <b>Current Funding :</b> {project.currentFunding}
              </li>
            ))}
          </ul>
        ) : (
          <p>N/A</p>
        )}
      </section>

      {/* Projects Interested In */}
      <section>
        <h2>Projects Interested In</h2>
        {interestProjects.length > 0 ? (
          <ul>
            {interestProjects.map((project, index) => (
              <li key={index}>{project.title}</li>
            ))}
          </ul>
        ) : (
          <p>N/A</p>
        )}
      </section>

      {/* Projects Donated To */}
      <section>
        <h2>Projects Donated To</h2>
        {donatedProjects.length > 0 ? (
          <ul>
            {donatedProjects.map((project, index) => (
              <li key={index}>{project.title}</li>
            ))}
          </ul>
        ) : (
          <p>N/A</p>
        )}
      </section>
    </div>
  );
};

export default Profile;

