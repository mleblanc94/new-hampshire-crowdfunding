import React, { useState } from 'react';

const CreateProject = () => {
  const [picture, setPicture] = useState(null);

  const handlePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    setPicture(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, including the picture file (stored in 'picture' state)
    // For example, you can upload the image using FormData or perform further actions.
    console.log('Picture:', picture);
    // Add your logic to handle form submission and image upload
  };

  return (
    <div className="pa4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <article className="br2 ba dark-gray b--black-10 mv4 shadow-5">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={handleSubmit}>
            <fieldset id="createProject" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Create a Project</legend>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="imageUpload">Upload Picture:</label>
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
                <label className="db fw6 lh-copy f6" htmlFor="title">Title:</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="title"
                  name="title"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="description">Description:</label>
                <textarea
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="description"
                  name="description"
                  rows="5"
                ></textarea>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="category">Category:</label>
                <select
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="category"
                  name="category"
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
          </form>
        </main>
      </article>
    </div>
  );
};

export default CreateProject;



