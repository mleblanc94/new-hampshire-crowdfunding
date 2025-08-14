import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import 'tachyons';
import Auth from '../utils/auth';

const Signin = () => {
  const location = useLocation();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [errorAlert, setError] = useState(null);
  const [login] = useMutation(LOGIN_USER);

  // Demo creds (prefer env vars; fallback to literals)
  const DEMO_EMAIL =
    (import.meta?.env?.VITE_DEMO_EMAIL) || 'demo@example.com';
  const DEMO_PASSWORD =
    (import.meta?.env?.VITE_DEMO_PASSWORD) || 'demopass123';

  // Prevent double-submit under StrictMode
  const autoLoginAttempted = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Shared login routine
  const loginWithCreds = async (email, password) => {
    try {
      const { data } = await login({ variables: { email, password } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setError('Invalid Login Credentials! Please try again.');
    }
  };

  // Normal form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await loginWithCreds(formState.email, formState.password);
    setFormState({ email: '', password: '' });
  };

  // Auto-login when ?demo=1 is present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('demo') === '1' && !autoLoginAttempted.current) {
      autoLoginAttempted.current = true;
      setFormState({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
      loginWithCreds(DEMO_EMAIL, DEMO_PASSWORD);
    }
  }, [location.search]); // intentionally not including loginWithCreds

  return (
    <div className="tc">
      <h1 className="f2">Welcome to New Hampshire Crowdsourcing!</h1>
      <div className="flex justify-center">
        <article className="br2 ba dark-gray b--black-10 mv4 w-40-l mw6 mh4 center shadow-5 bg-washed-green">
          <main className="pa4 black-80">
            <form className="measure" onSubmit={handleFormSubmit}>
              <fieldset id="login" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Login</legend>

                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">Email:</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password:</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="tc">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Login"
                  />
                </div>

                {/* Optional: visible fallback button */}
                <div className="tc mt3">
                  <button
                    type="button"
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    onClick={() => loginWithCreds(DEMO_EMAIL, DEMO_PASSWORD)}
                  >
                    Continue as Guest
                  </button>
                </div>
              </fieldset>
              {/* {errorAlert && <p className="red">{errorAlert}</p>} */}
            </form>
          </main>
        </article>
      </div>
    </div>
  );
};

export default Signin;
