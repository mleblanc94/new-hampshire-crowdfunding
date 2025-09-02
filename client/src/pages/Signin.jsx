import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import 'tachyons';

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [errorAlert, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [login, { loading }] = useMutation(LOGIN_USER);

  // Demo creds (prefer env vars; fallback to literals)
  const DEMO_EMAIL = import.meta?.env?.VITE_DEMO_EMAIL || 'guest@gmail.com';
  const DEMO_PASSWORD = import.meta?.env?.VITE_DEMO_PASSWORD || 'Guest';

  // Prevent double-submit under StrictMode
  const autoLoginAttempted = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const afterLoginRedirect = () => {
    const dest = location.state?.from || '/';
    navigate(dest, { replace: true });
  };

  // Shared login routine
  const loginWithCreds = async (email, password) => {
    try {
      setError('');
      const { data } = await login({ variables: { email, password } });
      Auth.login(data.login.token);
      afterLoginRedirect();
    } catch (e) {
      console.error(e);
      setError('Invalid email or password. Please try again.');
    }
  };

  // Normal form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email.trim() || !formState.password.trim()) return;
    await loginWithCreds(formState.email, formState.password);
  };

  // Auto-login when ?demo=1 is present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('demo') === '1' && !autoLoginAttempted.current) {
      autoLoginAttempted.current = true;
      setFormState({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
      loginWithCreds(DEMO_EMAIL, DEMO_PASSWORD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const canSubmit = formState.email.trim() && formState.password.trim();

  return (
    <main className="min-vh-100 bg-near-white dark-gray">
      <header className="tc pv5">
        <h1 className="f2 fw7 dark-blue ma0">Sign in to New Hampshire Crowdfunding</h1>
        <p className="mt2 mb0 mid-gray">Support local initiatives across the Granite State.</p>
      </header>

      <section className="flex justify-center ph3 pb6">
        <article className="w-100 w-40-m w-30-l br3 ba b--black-10 shadow-5 bg-white">
          <div className="pa4">
            {/* Error banner */}
            {errorAlert && (
              <div
                className="bg-washed-red dark-red br2 pa3 mb3"
                role="alert"
                aria-live="assertive"
              >
                {errorAlert}
              </div>
            )}

            <form onSubmit={handleFormSubmit} noValidate>
              <fieldset id="login" className="bn ph0 mh0">
                <legend className="f4 fw7 navy mb3">Login</legend>

                {/* Email */}
                <label className="db fw6 lh-copy f6 mb1" htmlFor="email">
                  Email
                </label>
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

                {/* Password + toggle */}
                <div className="mv3">
                  <div className="flex items-center justify-between">
                    <label className="db fw6 lh-copy f6" htmlFor="password">
                      Password
                    </label>
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
                    autoComplete="current-password"
                    disabled={loading}
                    required
                  />
                </div>

                {/* Submit */}
                <div className="mt3">
                  <button
                    className={`b ph3 pv2 input-reset ba br2 pointer f6 dib ${
                      canSubmit && !loading
                        ? 'bg-dark-blue white b--dark-blue grow'
                        : 'bg-light-gray gray b--light-gray o-70'
                    }`}
                    type="submit"
                    disabled={!canSubmit || loading}
                  >
                    {loading ? 'Signing in…' : 'Login'}
                  </button>
                </div>

                {/* Divider */}
                <div className="tc mv3 mid-gray">— or —</div>

                {/* Guest */}
                <div className="mt1">
                  <button
                    type="button"
                    className="b ph3 pv2 input-reset ba br2 pointer f6 dib bg-white navy b--black-20 hover-bg-near-white"
                    onClick={() => loginWithCreds(DEMO_EMAIL, DEMO_PASSWORD)}
                    disabled={loading}
                    aria-label="Continue as Guest"
                  >
                    {loading ? 'Please wait…' : 'Continue as Guest'}
                  </button>
                </div>
              </fieldset>
            </form>

            {/* Optional links */}
            <div className="mt4">
              <p className="f6 mid-gray mv2">
                New here?{' '}
                <Link to="/signup" className="link dim dark-blue">
                  Create an account
                </Link>
              </p>
              <p className="f6 mid-gray mv2">
                <Link to="/reset-password" className="link dim mid-gray">
                  Forgot password?
                </Link>
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Signin;
