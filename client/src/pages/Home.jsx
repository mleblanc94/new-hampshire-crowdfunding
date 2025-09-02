import React, { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GET_USER_NOT_CREATED } from '../utils/queries';
import { ADD_INTERESTED_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import ProjectDetails from './ProjectDetails';
import 'tachyons';

import image1 from '../projImages/image1.jpg';
import image2 from '../projImages/image2.jpg';
import image3 from '../projImages/image3.svg';
import image4 from '../projImages/image4.png';
import image5 from '../projImages/image5.jpg';
import image6 from '../projImages/image6.jpg';

const IMAGE_MAP = {
  image1, image2, image3, image4, image5, image6
};

const getImageSrc = (imageName) => IMAGE_MAP[imageName] || image1;

const ProgressBar = ({ current = 0, goal = 1 }) => {
  const pct = Math.max(0, Math.min(100, Math.round((current / Math.max(goal, 1)) * 100)));
  return (
    <div className="w-100 br-pill bg-light-gray" style={{ height: 10 }}>
      <div
        className="br-pill"
        style={{
          height: 10,
          width: `${pct}%`,
          background: 'linear-gradient(90deg,#C28F2C,#EAB308)',
          transition: 'width .5s ease'
        }}
        aria-label={`Raised ${pct}% of goal`}
      />
    </div>
  );
};

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Auth guard (redirect in effect to avoid side effects in render)
  const profile = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const userId = profile?.data?._id;

  useEffect(() => {
    if (!userId) {
      window.location.assign('/signin');
    }
  }, [userId]);

  // avoid rendering the page while we redirect
  if (!userId) return null;

  const { loading, error, data, refetch } = useQuery(GET_USER_NOT_CREATED, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });

  const [addInterestedIn, { loading: addingInterest }] = useMutation(ADD_INTERESTED_USER, {
    onCompleted: () => refetch(),
    onError: () => {}, // handled inline
  });

  const projects = useMemo(
    () => data?.getNotcreatedProjects ?? [],
    [data]
  );

  const openProjectDetails = (project) => setSelectedProject(project);

  const isInterested = (interestedInArr = []) =>
    interestedInArr.some((u) => u?._id === userId);

  const handleAddInterested = async (projectId, e) => {
    e.stopPropagation();
    try {
      await addInterestedIn({ variables: { projectId, userId } });
    } catch (err) {
      console.error('Error adding user to interestedIn:', err?.message || err);
      // You can surface a toast/snackbar here if desired
    }
  };

  const addToFavorites = (project) => setFavorites((prev) => [...prev, project]);

  // Stripe
  const stripePromise = useMemo(() => {
    const key = import.meta?.env?.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_12345';
    return loadStripe(key);
  }, []);

  return (
    <main className="bg-near-white dark-gray">
      {/* Hero */}
      <section
        className="pv5 ph3 tc"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,30,58,.92), rgba(11,30,58,.85))',
          color: '#fff'
        }}
      >
        <div className="center" style={{ maxWidth: 1140 }}>
          <h1 className="f2 fw7 ma0">New Hampshire Crowdfunding</h1>
          <p className="mt3 mb0 lh-copy measure center" style={{ color: 'rgba(255,255,255,.9)' }}>
            Back community projects across the Granite State. Discover local initiatives and help them reach their goals.
          </p>
          <div className="mt3">
            <a href="/create" className="link dib br2 ph3 pv2 white bg-dark-green grow">
              Start a Campaign
            </a>
            <a href="#active-projects" className="link dib br2 ph3 pv2 ml2 dark-blue bg-white ba b--white-30 grow">
              Explore Projects
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section id="active-projects" className="pa4">
        <div className="center" style={{ maxWidth: 1140 }}>
          <header className="mb3">
            <h2 className="f3 fw7 dark-blue ma0 tc">Active Projects</h2>
          </header>

          {/* Loading / Error / Empty */}
          {loading && <p className="tc gray">Loading projects…</p>}
          {error && (
            <p className="tc dark-red">
              Couldn’t load projects. Please refresh.
            </p>
          )}
          {!loading && !error && projects.length === 0 && (
            <div className="tc gray">
              <p className="mb3">No active projects right now.</p>
              <a href="/create" className="link dib br2 ph3 pv2 white bg-dark-blue grow">
                Be the first to start one
              </a>
            </div>
          )}

          {/* Grid */}
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => {
              const interested = isInterested(project?.interestedIn);
              const current = Number(project?.currentFunding || 0);
              const goal = Number(project?.fundingGoal || 1);

              return (
                <article
                  key={project._id}
                  className="w-100 w-50-m w-33-l pa2"
                >
                  <div
                    className="br3 ba b--black-10 bg-white shadow-5 h-100 flex flex-column"
                    role="button"
                    onClick={() => openProjectDetails(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* image */}
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#E5E7EB' }}>
                      <img
                        src={getImageSrc(project.imageName)}
                        alt={project.title}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* body */}
                    <div className="pa3 flex-auto">
                      <h3 className="f4 fw7 dark-blue mt0 mb2">
                        {project.title}
                      </h3>
                      <p className="mt0 mb3 gray lh-copy">
                        {project.description?.length > 140
                          ? project.description.slice(0, 137) + '…'
                          : project.description}
                      </p>

                      <div className="mb2">
                        <ProgressBar current={current} goal={goal} />
                      </div>
                      <div className="flex items-center justify-between mb3">
                        <strong>${current.toLocaleString()}</strong>
                        <span className="gray">of ${goal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* actions */}
                    <div className="pa3 pt0">
                      <div className="flex">
                        <button
                          className="btn-reset br2 ph3 pv2 white bg-dark-blue grow"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectDetails(project);
                          }}
                        >
                          Donate
                        </button>
                        <button
                          className={`btn-reset br2 ph3 pv2 ml2 grow ${
                            interested
                              ? 'bg-light-gray gray'
                              : 'bg-white navy ba b--black-20'
                          }`}
                          disabled={interested || addingInterest}
                          onClick={(e) => handleAddInterested(project._id, e)}
                          title={interested ? 'Already chosen' : 'Add to Interested'}
                        >
                          {interested ? 'Interested ✓' : 'Interested'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <Elements stripe={stripePromise}>
          <ProjectDetails
            project={selectedProject}
            addToFavorites={addToFavorites}
            closeModal={() => setSelectedProject(null)}
          />
        </Elements>
      )}
    </main>
  );
};

export default Home;