import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import 'tachyons';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [uiError, setUiError] = useState('');

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const validEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const canSubmit =
    formState.username.trim() &&
    validEmail(formState.email) &&
    formState.password.trim().length >= 6;

  const afterAuthRedirect = () => {
    const dest = location.state?.from || '/';
    navigate(dest, { replace: true });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUiError('');

    if (!canSubmit) {
      setUiError('Please complete all fields (password at least 6 characters).');
      return;
    }

    try {
      // Assuming your CREATE_USER mutation returns { token, user }
      const { data } = await createUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });

      Auth.login(data.createUser.token);
      afterAuthRedirect();
    } catch (err) {
      console.error(err);
      setUiError('Unable to create account. Please try again or use a different email.');
    }
  };

  return (
    <main className="min-vh-100 bg-near-white dark-gray">
      <header className="tc pv5">
        <h1 className="f2 fw7 dark-blue ma0">Create your account</h1>
        <p className="mt2 mb0 mid-gray">Join New Hampshire Crowdfunding and back local initiatives.</p>
      </header>

      <section className="flex justify-center ph3 pb6">
        <article className="w-100 w-40-m w-30-l br3 ba b--black-10 shadow-5 bg-white">
          <div className="pa4">
            {/* Error banner */}
            {uiError && (
              <div className="bg-washed-red dark-red br2 pa3 mb3" role="alert" aria-live="assertive">
                {uiError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} noValidate>
              <fieldset id="signup" className="bn ph0 mh0">
                <legend className="f4 fw7 navy mb3">Sign Up</legend>

                {/* Email */}
                <label className="db fw6 lh-copy f6 mb1" htmlFor="email">Email</label>
                <input
                  className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                  required
                />

                {/* Username */}
                <div className="mt3">
                  <label className="db fw6 lh-copy f6 mb1" htmlFor="username">Username</label>
                  <input
                    className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                    type="text"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    autoComplete="username"
                    disabled={loading}
                    required
                  />
                </div>

                {/* Password + toggle */}
                <div className="mt3">
                  <div className="flex items-center justify-between">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <button
                      type="button"
                      className="link dim mid-gray f6 pointer"
                      onClick={() => setShowPw((v) => !v)}
                      aria-pressed={showPw}
                      disabled={loading}
                    >
                      {showPw ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    className="pa2 input-reset ba b--black-20 bg-transparent hover-bg-near-white w-100 br2"
                    type={showPw ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                    required
                  />
                  <small className="db mid-gray mt1">Use at least 6 characters.</small>
                </div>

                {/* Submit */}
                <div className="mt4">
                  <button
                    className={`b ph3 pv2 input-reset ba br2 pointer f6 dib ${
                      canSubmit && !loading
                        ? 'bg-dark-blue white b--dark-blue grow'
                        : 'bg-light-gray gray b--light-gray o-70'
                    }`}
                    type="submit"
                    disabled={!canSubmit || loading}
                  >
                    {loading ? 'Creating account…' : 'Create account'}
                  </button>
                </div>
              </fieldset>
            </form>

            {/* Footer links */}
            <div className="mt4">
              <p className="f6 mid-gray mv2">
                Already have an account?{' '}
                <Link to="/signin" className="link dim dark-blue">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Signup;