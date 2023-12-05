// Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="pa4 flex flex-wrap justify-center">
      {/* Sample project cards */}
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-40-m w-30-l mw5 center shadow-5 ma2">
        <main className="pa4 black-80">
          <h2 className="f4 fw6">Project 1</h2>
          <img src="project1.jpg" alt="Project 1" className="w-100" />
          <p>Description of Project 1</p>
        </main>
      </article>

      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-40-m w-30-l mw5 center shadow-5 ma2">
        <main className="pa4 black-80">
          <h2 className="f4 fw6">Project 2</h2>
          <img src="project2.jpg" alt="Project 2" className="w-100" />
          <p>Description of Project 2</p>
        </main>
      </article>
    </div>
  );
};

export default Home;