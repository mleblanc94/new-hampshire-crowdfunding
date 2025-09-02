import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { UPDATE_FUNDING } from '../utils/mutations';
import 'tachyons';
import './Home.css'; // keep your modal styles here or paste the CSS below

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
  const pct = Math.max(0, Math.min(100, Math.round((Number(current) / Math.max(Number(goal), 1)) * 100)));
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

const QUICK_AMOUNTS = [10, 25, 50, 100];

const ProjectDetails = ({ project, closeModal }) => {
  const modalRef = useRef(null);
  const [amount, setAmount] = useState('');
  const [uiError, setUiError] = useState('');

  const [updateFunding, { loading }] = useMutation(UPDATE_FUNDING);
  const loggedIn = AuthService.loggedIn();
  const userId = loggedIn ? AuthService.getProfile()?.data?._id : null;

  const current = Number(project?.currentFunding || 0);
  const goal = Number(project?.fundingGoal || 1);
  const pct = Math.max(0, Math.min(100, Math.round((current / Math.max(goal, 1)) * 100)));

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  // Close on overlay click (but not inside)
  const onOverlayClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) closeModal();
  };

  const setQuickAmount = (val) => {
    setUiError('');
    setAmount(String(val));
  };

  const parsedAmount = useMemo(() => {
    const n = parseInt(String(amount).replace(/[^\d]/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
  }, [amount]);

  const canDonate = loggedIn && parsedAmount > 0 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiError('');

    if (!loggedIn) {
      setUiError('Please sign in to donate.');
      return;
    }
    if (parsedAmount <= 0) {
      setUiError('Enter a valid donation amount.');
      return;
    }

    try {
      await updateFunding({
        variables: {
          projectId: project._id,
          amount: parsedAmount,
          userId, // if your mutation uses it to add a backer
        },
      });
      closeModal();
    } catch (err) {
      console.error('Error updating funding:', err);
      setUiError('We could not process your donation. Please try again.');
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-100 h-100 flex items-center justify-center modal-overlay"
      onClick={onOverlayClick}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proj-title"
    >
      <div className="modal-card br3 bg-white shadow-5">
        <button
          className="close-x"
          aria-label="Close"
          onClick={closeModal}
          type="button"
        >
          ×
        </button>

        {/* Header image */}
        <div className="modal-hero">
          <img
            src={getImageSrc(project?.imageName)}
            alt={project?.title}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="pa4">
          <h2 id="proj-title" className="f3 fw7 dark-blue mt0 mb2">
            {project?.title}
          </h2>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-between mb3">
            <div className="mb2">
              <div className="gray">Raised</div>
              <strong className="dark-blue">${fmtMoney(current)}</strong>
            </div>
            <div className="mb2">
              <div className="gray">Goal</div>
              <strong>${fmtMoney(goal)}</strong>
            </div>
            <div className="mb2">
              <div className="gray">Progress</div>
              <strong>{pct}%</strong>
            </div>
          </div>

          {/* Progress */}
          <div className="mb3">
            <ProgressBar current={current} goal={goal} />
          </div>

          {/* Description */}
          <p className="gray lh-copy mt0 mb4">{project?.description}</p>

          {/* Donation form */}
          <form onSubmit={handleSubmit} noValidate>
            {uiError && (
              <div className="bg-washed-red dark-red br2 pa3 mb3" role="alert">
                {uiError}
              </div>
            )}

            <label className="db fw6 lh-copy f6 mb2">Choose an amount</label>
            <div className="flex flex-wrap mb3">
              {QUICK_AMOUNTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`br2 ba b--black-10 ph3 pv2 pointer mr2 mb2 ${
                    parsedAmount === q ? 'bg-dark-blue white b--dark-blue' : 'bg-near-white dark-gray'
                  }`}
                  onClick={() => setQuickAmount(q)}
                  disabled={loading}
                  aria-pressed={parsedAmount === q}
                >
                  ${q}
                </button>
              ))}
            </div>

            <label htmlFor="donationAmount" className="db fw6 lh-copy f6 mb1">
              Or enter a custom amount
            </label>
            <div className="flex items-center mb3">
              <span className="br2 bl bt bb b--black-20 ph2 pv2 bg-near-white">$</span>
              <input
                id="donationAmount"
                name="donationAmount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pa2 input-reset ba b--black-20 bg-transparent w-100 br2 br--right"
                placeholder="e.g., 25"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
              />
            </div>

            {!loggedIn ? (
              <a
                href="/signin"
                className="link dib br2 ph3 pv2 white bg-dark-blue grow"
              >
                Sign in to Donate
              </a>
            ) : (
              <button
                type="submit"
                className={`br2 ph3 pv2 pointer ${
                  canDonate ? 'bg-dark-blue white grow' : 'bg-light-gray gray o-70'
                }`}
                disabled={!canDonate}
              >
                {loading ? 'Processing…' : 'Donate'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;