import React, { useState, useEffect } from 'react';
// import { getUserProjects } from '../api'; // Fetch method for user's projects, replace with actual API call

const Profile = () => {
  const [username, setUsername] = useState('');
  const [createdProjects, setCreatedProjects] = useState([]);
  const [interestProjects, setInterestProjects] = useState([]);
  const [donatedProjects, setDonatedProjects] = useState([]);

  useEffect(() => {
    // Simulating user data and fetching projects
    const userData = { username: 'User123' }; // Replace with actual user data from the database
    setUsername(userData.username);

    // Simulating fetching user's projects
    const fetchData = async () => {
      try {
        // Replace with actual API calls or database queries to fetch user's projects
        const userProjects = await getUserProjects();

        // Split the user's projects into respective categories
        const created = userProjects.filter(project => project.category === 'created');
        const interested = userProjects.filter(project => project.category === 'interested');
        const donated = userProjects.filter(project => project.category === 'donated');

        setCreatedProjects(created);
        setInterestProjects(interested);
        setDonatedProjects(donated);
      } catch (error) {
        // Handle error
        console.error('Error fetching user projects:', error);
      }
    };

    fetchData();
  }, []);

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
