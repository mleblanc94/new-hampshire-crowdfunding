import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_USER_CREATED,
  GET_USER_INTERESTED,
  GET_USER_DONATED,
} from '../utils/queries';
import AuthService from '../utils/auth';
import 'tachyons';
import './Profile.css';

import image1 from '../projImages/image1.jpg';
import image2 from '../projImages/image2.jpg';
import image3 from '../projImages/image3.svg';
import image4 from '../projImages/image4.png';
import image5 from '../projImages/image5.jpg';
import image6 from '../projImages/image6.jpg';

const IMAGE_MAP = { image1, image2, image3, image4, image5, image6 };
const getImageSrc = (name) => IMAGE_MAP[name] || image1;
const fmtMoney = (n) => Number(n || 0).toLocaleString();

const ProgressBar = ({ current = 0, goal = 1 }) => {
  const pct = Math.max(0, Math.min(100, Math.round((current / Math.max(goal, 1)) * 100)));
  return (
    <div className="w-100 br-pill bg-light-gray" style={{ height: 10 }}>
      <div
        className="br-pill"
        style={{
          height: 10,
          width: `${pct}%`,
          background: 'linear-gradient(90deg,#4062BB,#28A9E0)',
          transition: 'width .5s ease',
        }}
        aria-label={`Raised ${pct}% of goal`}
      />
    </div>
  );
};

const Section = ({ title, subtitle, children }) => (
  <section className="mb4">
    <header className="mb3 tc">
      <h2 className="f3 fw7 dark-blue ma0">{title}</h2>
      {subtitle && <p className="gray mt2 mb0">{subtitle}</p>}
    </header>
    {children}
  </section>
);

const ProjectCard = ({ project }) => {
  const current = Number(project?.currentFunding || 0);
  const goal = Number(project?.fundingGoal || 1);

  return (
    <article className="br3 ba b--black-10 bg-white shadow-5 h-100 flex flex-column">
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#E5E7EB' }}>
        <img
          src={getImageSrc(project?.imageName)}
          alt={project?.title}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="pa3 flex-auto">
        <h3 className="f4 fw7 dark-blue mt0 mb2">{project?.title}</h3>
        <p className="mt0 mb3 gray lh-copy">
          {project?.description?.length > 140
            ? project.description.slice(0, 137) + '…'
            : project?.description}
        </p>

        <div className="mb2">
          <ProgressBar current={current} goal={goal} />
        </div>
        <div className="flex items-center justify-between">
          <strong>${fmtMoney(current)}</strong>
          <span className="gray">of ${fmtMoney(goal)}</span>
        </div>
      </div>
    </article>
  );
};

const Profile = () => {
  const userId = AuthService.loggedIn() ? AuthService.getProfile()?.data?._id : null;

  // Redirect if not logged in
  useEffect(() => {
    if (!userId) window.location.assign('/signin');
  }, [userId]);
  if (!userId) return null;

  const { loading: loadingCreated, data: dataCreated, error: errCreated } = useQuery(
    GET_USER_CREATED,
    { variables: { userId }, skip: !userId, fetchPolicy: 'cache-and-network' }
  );
  const { loading: loadingInterested, data: dataInterested, error: errInterested } = useQuery(
    GET_USER_INTERESTED,
    { variables: { userId }, skip: !userId, fetchPolicy: 'cache-and-network' }
  );
  const { loading: loadingDonated, data: dataDonated, error: errDonated } = useQuery(
    GET_USER_DONATED,
    { variables: { userId }, skip: !userId, fetchPolicy: 'cache-and-network' }
  );

  const loading = loadingCreated || loadingInterested || loadingDonated;

  const createdProjects = useMemo(() => dataCreated?.getcreatedProjects ?? [], [dataCreated]);
  const interestProjects = useMemo(() => dataInterested?.getinterestedIn ?? [], [dataInterested]);
  const donatedProjects = useMemo(() => dataDonated?.getbackedProjects ?? [], [dataDonated]);

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
        <div className="center" style={{ maxWidth: 1140 }}>
          <h1 className="f2 fw7 ma0">Your Profile</h1>
          <p className="mt2 mb0 lh-copy" style={{ color: 'rgba(255,255,255,.9)' }}>
            Review your campaigns, track projects you’re interested in, and see your impact.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="ph3 pv4">
        <div className="center" style={{ maxWidth: 1140 }}>
          {loading && <p className="tc gray">Loading your projects…</p>}

          {(errCreated || errInterested || errDonated) && (
            <div className="bg-washed-red dark-red br2 pa3 mb4 tc" role="alert">
              There was a problem loading your profile. Please refresh the page.
            </div>
          )}

          {/* Created */}
          <Section
            title={`Projects Created (${createdProjects.length})`}
            subtitle="These are campaigns you’ve started."
          >
            {createdProjects.length === 0 ? (
              <div className="tc gray">
                <p className="mb3">You haven’t created any campaigns yet.</p>
                <a href="/create" className="link dib br2 ph3 pv2 white bg-dark-blue grow">
                  Start a Campaign
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center">
                {createdProjects.map((p) => (
                  <div key={p._id} className="w-100 w-50-m w-33-l pa2">
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Interested */}
          <Section
            title={`Projects Interested In (${interestProjects.length})`}
            subtitle="You’ve marked interest in these campaigns."
          >
            {interestProjects.length === 0 ? (
              <div className="tc gray">
                <p className="mb3">No interested projects yet.</p>
                <a href="/#active-projects" className="link dib br2 ph3 pv2 dark-blue bg-white ba b--black-10 grow">
                  Explore Projects
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center">
                {interestProjects.map((p) => (
                  <div key={p._id} className="w-100 w-50-m w-33-l pa2">
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Donated */}
          <Section
            title={`Projects Donated To (${donatedProjects.length})`}
            subtitle="Campaigns you’ve backed with donations."
          >
            {donatedProjects.length === 0 ? (
              <div className="tc gray">
                <p className="mb3">You haven’t donated to any campaigns yet.</p>
                <a href="/#active-projects" className="link dib br2 ph3 pv2 dark-blue bg-white ba b--black-10 grow">
                  Find Campaigns
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center">
                {donatedProjects.map((p) => (
                  <div key={p._id} className="w-100 w-50-m w-33-l pa2">
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </section>
    </main>
  );
};

export default Profile;
