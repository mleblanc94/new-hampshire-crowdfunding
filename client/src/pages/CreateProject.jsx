import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {ADD_PROJECT} from '../utils/mutations';
import {Cloudinary} from "@cloudinary/url-gen";

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    imageUpload: null,
  });

  const [createProject, { loading, error }] = useMutation(ADD_PROJECT, {
    onCompleted: (data) => {
      console.log('Project created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating project:', error);
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handlePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    setProjectData({ ...projectData, imageUpload: selectedFile });
  };

  const handleSubmit = async (event) => {


    event.preventDefault();

    // Put cloudinary code here

    try {
      const { title, description, category, imageUpload } = projectData;
      await createProject({
        variables: {
          title,
          description,
          category,
          imageUpload,
        },
      });
    } catch (error) {
      console.error('Error:', error);
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
                <label className="db fw6 lh-copy f6" htmlFor="imageUpload">
                  Upload Picture:
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                />
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
                <label className="db fw6 lh-copy f6" htmlFor="category">
                  Category:
                </label>
                <select
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="category"
                  name="category"
                  onChange={handleInputChange}
                >
                  <option value="Technology">Technology</option>
                  <option value="Art">Art</option>
                  <option value="Health">Health</option>
                  <option value="Startup">Startup</option>
                  <option value="Social Causes">Social Causes</option>
                  <option value="Personal Projects">Personal Projects</option>
                  <option value="Risky Ventures">Risky Ventures</option>
                </select>
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





