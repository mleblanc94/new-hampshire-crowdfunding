import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/mutations';
import { GET_ALL_PROJECT_TYPES } from '../utils/queries';
import AuthService from '../utils/auth';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.svg';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    creator: '',
    fundingGoal: 0,
    projectType: '',
    imageName: 'default.png', // Default image name
  });

  const { loadingPT, errorPT, data } = useQuery(GET_ALL_PROJECT_TYPES);
  if (loadingPT) return <p>Loading...</p>;
  if (errorPT) return <p>Error: {errorPT.message}</p>; 

  const projectTypes = data ? data.getAllProjectTypes : [];
 console.log(projectTypes);

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const images = [
    { name: 'image1', src: image1 },
    { name: 'image2', src: image2 },
    { name: 'image3', src: image3 },
    { name: 'image4', src: image4 },
    { name: 'image5', src: image5 },
    { name: 'image6', src: image6 },
  ];

  const handleImageSelect = (imageName) => {
    setProjectData({ ...projectData, imageName });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createProject({
        variables: {
          input: {
            ...projectData,
            creator: AuthService.getProfile().data._id,
            fundingGoal: parseInt(projectData.fundingGoal, 10), // Convert to integer
          },
        },
      });

      // Handle the response, e.g., show a success message, redirect, etc.
      console.log('Project created:', data.createProject);

      // If you have a token from authentication, you can use it here
      const userToken = AuthService.loggedIn() ? AuthService.getToken() : null;

      // Use the token as needed, e.g., store it, redirect, etc.
      console.log('User Token:', userToken);

      //history.push('/');
      window.location.assign('/');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error creating project:', error.message);
    }
  };

  return (
    <div className="pa4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <article className="br2 ba dark-gray b--black-10 mv4 shadow-5">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={handleSubmit}>
            <fieldset id="createProject" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Create a Project</legend>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Select a Picture:</label>
                <div className="flex flex-wrap">
                {images.map((img) => (
        <div
          key={img.name}
          className={`pa2 ba ${projectData.imageName === img.name ? 'b--blue' : 'b--transparent'}`}
          onClick={() => handleImageSelect(img.name)}
          style={{ cursor: 'pointer' }}
        >
          <img src={img.src} alt={img.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </div>
      ))}
        </div>
      </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="title">
                  Title:
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="description">
                  Description:
                </label>
                <textarea
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="description"
                  name="description"
                  rows="5"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="projectType">
                  Project Type:
                </label>
                <select
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="projectType"
                  name="projectType"
                  onChange={handleInputChange}
                >
                  {projectTypes.map((projectType) => (
                    <option key={projectType._id} value={projectType._id}>
                      {projectType.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="fundingGoal">
                  fundingGoal:
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="number"
                  id="fundingGoal"
                  name="fundingGoal"
                  onChange={handleInputChange}
                />
              </div>
              <div className="tc">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Submit"
                />
              </div>
            </fieldset>
            {error && <p>Error: {error.message}</p>}
          </form>
        </main>
      </article>
    </div>
  );
};

export default CreateProject;





