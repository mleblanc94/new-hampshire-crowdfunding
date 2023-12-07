import React from 'react';
import 'tachyons';

const projects = [
  { title: 'Project 1', description: 'Description of Project 1', image: 'project1.jpg' },
  { title: 'Project 2', description: 'Description of Project 2', image: 'project2.jpg' },
  { title: 'Project 3', description: 'Description of Project 3', image: 'project3.jpg' },
  { title: 'Project 4', description: 'Description of Project 4', image: 'project4.jpg' },
  { title: 'Project 5', description: 'Description of Project 5', image: 'project5.jpg' },
  { title: 'Project 6', description: 'Description of Project 6', image: 'project6.jpg' },
];

const Home = () => {
  return (
    <div className="pa4">
      <h1 className="tc">Active Projects</h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-between mw8">
          {projects.map((project, index) => (
            <article key={index} className="br2 ba dark-gray b--black-10 mv4 w-100 w-40-l shadow-5 ma2">
              <main className="pa4 black-80">
                <h2 className="f4 fw6">{project.title}</h2>
                <img src={project.image} alt={project.title} className="w-100" />
                <p>{project.description}</p>
              </main>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

