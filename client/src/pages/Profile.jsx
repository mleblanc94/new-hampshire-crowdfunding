import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CREATED } from '../utils/queries';
import { GET_USER_INTERESTED } from '../utils/queries';
import { GET_USER_DONATED } from '../utils/queries';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [createdProjects, setCreatedProjects] = useState([]);
  const [interestProjects, setInterestProjects] = useState([]);
  const [donatedProjects, setDonatedProjects] = useState([]);

  const { loading, error, data1 } = useQuery(GET_USER_CREATED);
  const { data2 } = useQuery(GET_USER_INTERESTED);
  const { data3 } = useQuery(GET_USER_DONATED);

  useEffect(() => {
    if (data1, data2, data3) {
      // Extract projects from the GraphQL response and update state
      const { userCreated } = data1;
      const { userInterested } = data2;
      const { userDonated } = data3;

      const created = userCreated;
      const interested = userInterested;
      const donated = userDonated;

      setCreatedProjects(created);
      setInterestProjects(interested);
      setDonatedProjects(donated);
    }
  }, [data1, data2, data3]);

  useEffect(() => {
    if (!data) {
      // Simulating user data (replace with actual user data from the GraphQL response)
      const userData = { username: 'User123' };
      setUsername(userData.username);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user projects: {error.message}</p>;

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
              <li key={index}>{project.title}</li>
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

