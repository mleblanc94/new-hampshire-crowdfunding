import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/mutations';
import { GET_ALL_PROJECT_TYPES } from '../utils/queries';
import AuthService from '../utils/auth';
import 'tachyons';

import image1 from '../projImages/image1.jpg';
import image2 from '../projImages/image2.jpg';
import image3 from '../projImages/image3.svg';
import image4 from '../projImages/image4.png';
import image5 from '../projImages/image5.jpg';
import image6 from '../projImages/image6.jpg';

const IMAGES = [
  { name: 'image1', src: image1, alt: 'Project image 1' },
  { name: 'image2', src: image2, alt: 'Project image 2' },
  { name: 'image3', src: image3, alt: 'Project image 3' },
  { name: 'image4', src: image4, alt: 'Project image 4' },
  { name: 'image5', src: image5, alt: 'Project image 5' },
  { name: 'image6', src: image6, alt: 'Project image 6' },
];

const getImageSrc = (name) => (IMAGES.find((i) => i.name === name)?.src || IMAGES[0].src);
const formatMoney = (n) =>
  Number.isFinite(+n) ? (+n).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0';

const MIN_GOAL = 100; // tweak as you like

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    fundingGoal: '',
    projectType: '',
    imageName: 'image1',
  });
  const [uiError, setUiError] = useState('');

  const { loading: loadingPT, error: errorPT, data } = useQuery(GET_ALL_PROJECT_TYPES);
  const projectTypes = data?.getAllProjectTypes ?? [];

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

  const profile = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const creatorId = profile?.data?._id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // keep goal numeric-only (but allow empty)
    if (name === 'fundingGoal') {
      const clean = value.replace(/[^\d]/g, '').slice(0, 10); // prevent ridiculously long values
      setProjectData((s) => ({ ...s, [name]: clean }));
    } else {
      setProjectData((s) => ({ ...s, [name]: value }));
    }
  };

  const handleImageSelect = (imageName) => {
    setProjectData((s) => ({ ...s, imageName }));
  };

  const canSubmit = useMemo(() => {
    const goal = parseInt(projectData.fundingGoal, 10);
    return (
      projectData.title.trim().length >= 3 &&
      projectData.description.trim().length >= 10 &&
      !!projectData.projectType &&
      Number.isFinite(goal) &&
      goal >= MIN_GOAL
    );
  }, [projectData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiError('');

    if (!creatorId) {
      setUiError('Please log in to create a project.');
      return;
    }
    if (!canSubmit) {
      setUiError(`Please complete all fields (goal at least $${MIN_GOAL}).`);
      return;
    }

    try {
      const { data } = await createProject({
        variables: {
          input: {
            title: projectData.title.trim(),
            description: projectData.description.trim(),
            imageName: projectData.imageName,
            projectType: projectData.projectType,
            fundingGoal: parseInt(projectData.fundingGoal, 10),
            creator: creatorId,
          },
        },
      });

      // success -> route to profile
      console.log('Project created:', data.createProject);
      window.location.assign('/profile');
    } catch (err) {
      console.error('Error creating project:', err?.message || err);
      setUiError('Unable to create project. Please try again.');
    }
  };

  if (loadingPT) return <p className="tc pv5">Loading project types…</p>;
  if (errorPT) return <p className="tc pv5 dark-red">Error: {errorPT.message}</p>;

  const goalNumber = parseInt(projectData.fundingGoal || '0', 10) || 0;
  const previewDesc =
    projectData.description.length > 160
      ? projectData.description.slice(0, 157) + '…'
      : projectData.description;

  return (
    <main className="bg-near-white dark-gray">
      {/* Hero */}
      <section
        className="pv5 ph3 tc"
        style={{
          background: 'linear-gradient(180deg, rgba(11,30,58,.92), rgba(11,30,58,.85))',
          color: '#fff',
        }}
      >
        <div className="center" style={{ maxWidth: 960 }}>
          <h1 className="f2 fw7 ma0">Create a New Campaign</h1>
          <p className="mt2 mb0 lh-copy" style={{ color: 'rgba(255,255,255,.9)' }}>
            Tell your story, choose a cover image, and set a funding goal.
          </p>
        </div>
      </section>

      {/* Form + Preview */}
      <section className="ph3 pv4">
        <div className="center flex-ns justify-between" style={{ maxWidth: 1140 }}>
          {/* Form */}
          <article className="w-100 w-50-ns pa3">
            <div className="br3 ba b--black-10 bg-white shadow-5">
              <div className="pa4">
                {/* Error banner */}
                {uiError && (
                  <div className="bg-washed-red dark-red br2 pa3 mb3" role="alert" aria-live="assertive">
                    {uiError}
                  </div>
                )}
                {error && (
                  <div className="bg-washed-red dark-red br2 pa3 mb3" role="alert" aria-live="assertive">
                    {error.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <fieldset className="bn ph0 mh0">
                    {/* Image chooser */}
                    <div className="mb3">
                      <label className="db fw6 lh-copy f6 mb2">Select a Picture</label>
                      <div className="flex flex-wrap">
                        {IMAGES.map((img) => {
                          const selected = projectData.imageName === img.name;
                          return (
                            <button
                              key={img.name}
                              type="button"
                              aria-pressed={selected}
                              className={`br2 ba pointer mr2 mb2 bg-white ${
                                selected ? 'b--dark-blue' : 'b--black-10'
                              }`}
                              onClick={() => handleImageSelect(img.name)}
                              style={{ width: 110, height: 90, overflow: 'hidden' }}
                              title={img.alt}
                              disabled={loading}
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb3">
                      <label htmlFor="title" className="db fw6 lh-copy f6 mb1">
                        Title
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                        placeholder="e.g., Community Garden in Concord"
                        value={projectData.title}
                        onChange={handleInputChange}
                        disabled={loading}
                        required
                        maxLength={100}
                      />
                      <small className="mid-gray">Keep it concise (max 100 characters).</small>
                    </div>

                    {/* Description */}
                    <div className="mb3">
                      <label htmlFor="description" className="db fw6 lh-copy f6 mb1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                        rows={6}
                        placeholder="What are you building? Who benefits? How will funds be used?"
                        value={projectData.description}
                        onChange={handleInputChange}
                        disabled={loading}
                        required
                        maxLength={1200}
                      />
                      <small className="mid-gray">
                        {projectData.description.length}/1200 characters
                      </small>
                    </div>

                    {/* Type */}
                    <div className="mb3">
                      <label htmlFor="projectType" className="db fw6 lh-copy f6 mb1">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                        value={projectData.projectType}
                        onChange={handleInputChange}
                        disabled={loading}
                        required
                      >
                        <option value="" disabled>
                          Select a Project Type
                        </option>
                        {projectTypes.map((pt) => (
                          <option key={pt._id} value={pt._id}>
                            {pt.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Goal */}
                    <div className="mb3">
                      <label htmlFor="fundingGoal" className="db fw6 lh-copy f6 mb1">
                        Funding Goal (USD)
                      </label>
                      <input
                        id="fundingGoal"
                        name="fundingGoal"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                        placeholder="e.g., 5000"
                        value={projectData.fundingGoal}
                        onChange={handleInputChange}
                        disabled={loading}
                        required
                        aria-describedby="goal-help"
                      />
                      <small id="goal-help" className="mid-gray db mt1">
                        Minimum ${MIN_GOAL.toLocaleString()} — current: ${formatMoney(projectData.fundingGoal)}
                      </small>
                    </div>

                    {/* Submit */}
                    <div className="mt3">
                      <button
                        type="submit"
                        className={`b ph3 pv2 input-reset ba br2 pointer f6 dib ${
                          canSubmit && !loading
                            ? 'bg-dark-blue white b--dark-blue grow'
                            : 'bg-light-gray gray b--light-gray o-70'
                        }`}
                        disabled={!canSubmit || loading}
                      >
                        {loading ? 'Creating…' : 'Create Project'}
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </article>

          {/* Live Preview */}
          <article className="w-100 w-50-ns pa3">
            <div className="br3 ba b--black-10 bg-white shadow-5">
              <div className="pa3">
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#E5E7EB' }}>
                  <img
                    src={getImageSrc(projectData.imageName)}
                    alt="Selected preview"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="pa2">
                  <h3 className="f4 fw7 dark-blue mt3 mb2">
                    {projectData.title || 'Your project title'}
                  </h3>
                  <p className="mt0 mb3 gray lh-copy">
                    {previewDesc || 'Your description preview will appear here.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <strong>${formatMoney(projectData.fundingGoal || 0)}</strong>
                    <span className="gray">goal</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default CreateProject;