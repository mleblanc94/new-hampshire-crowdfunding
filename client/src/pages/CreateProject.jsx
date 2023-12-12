import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/mutations';
import { GET_ALL_PROJECT_TYPES } from '../utils/queries';
import AuthService from '../utils/auth';
//import { GET_ALL_PROJECT_TYPES } from '../path-to-your-graphql-query-file';


const CreateProject = () => {
  //const history = useHistory();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    creator: '',
    fundingGoal: 0,
    projectType: '',
    imageName: 'default.png', // Default image name
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);
  const { loadingPT, errorPT, data } = useQuery(GET_ALL_PROJECT_TYPES);
  console.log(data);
  // const projectTypes = data.getAllProjectTypes;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };
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

  const images = ['image1.jpg', 'image2.jpg', 'image3.svg', 'image4.png', 'image5.jpg', 'image6.jpg'];

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
                  {images.map((imgName) => (
                  <div
                    key={imgName}
                    className={`pa2 ba ${projectData.imageName === imgName ? 'b--blue' : 'b--transparent'}`}
                    onClick={() => handleImageSelect(imgName)}
                    style={{ cursor: 'pointer' }}
            >
              <img src={`./public/${imgName}`} alt={imgName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
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
                  <option value="656e86c228026e4c9938d983">Technology</option>
                  <option value="Art">Art</option>
                  <option value="Health">Health</option>
                  <option value="Startup">Startup</option>
                  <option value="Social Causes">Social Causes</option>
                  <option value="Personal Projects">Personal Projects</option>
                  <option value="Risky Ventures">Risky Ventures</option>
                </select>
                {/* <select
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
                </select> */}
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





