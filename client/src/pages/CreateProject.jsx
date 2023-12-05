// CreateProject.jsx
import React from 'react';

const CreateProject = () => {
  return (
    <div className="pa4">
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="createProject" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Create a Project</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="picture">Picture URL:</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text" id="picture" name="picture" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="title">Title:</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text" id="title" name="title" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="description">Description:</label>
                <textarea className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  id="description" name="description" rows="5"></textarea>
              </div>
            </fieldset>
            <div className="tc">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit" value="Submit" />
            </div>
          </form>
        </main>
      </article>
    </div>
  );
};

export default CreateProject;