import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails'; // Create this component separately
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../utils/queries';
import 'tachyons';
import './Home.css'

const Home = () => {
//   const { loading, data } = useQuery(QUERY_PROJECTS);
//   const projects = data?.projects || [];
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const addToFavorites = (project) => {
    setFavorites([...favorites, project]);
  };

const projects = [
    { title: 'Project 1', description: 'Description of Project 1', image: 'project1.jpg' },
    { title: 'Project 2', description: 'Description of Project 2', image: 'project2.jpg' },
    { title: 'Project 3', description: 'Description of Project 3', image: 'project3.jpg' },
    { title: 'Project 4', description: 'Description of Project 4', image: 'project4.jpg' },
    { title: 'Project 5', description: 'Description of Project 5', image: 'project5.jpg' },
    { title: 'Project 6', description: 'Description of Project 6', image: 'project6.jpg' },
  ];

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
                  src={project.image}
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
        <ProjectDetails
          project={selectedProject}
          addToFavorites={addToFavorites}
          closeModal={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Home;