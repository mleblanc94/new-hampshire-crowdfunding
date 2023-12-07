import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import 'tachyons';
import { LOGIN_USER } from '../utils/mutations';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      // Handle successful login here, access response data as needed
      console.log('Login Successful:', data);
      // You might store token in local storage or state after successful login
    },
    onError: (error) => {
      // Handle login error
      console.error('Login Error:', error);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Call the login mutation with provided username and password
    try {
      await login({ variables: { username, password } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="tc">
      <h1 className="f2">Welcome to New Hampshire Crowdsourcing!</h1>
      <div className="flex justify-center">
        <article className="br2 ba dark-gray b--black-10 mv4 w-40-l mw6 mh4 center shadow-5 bg-washed-green">
          <main className="pa4 black-80">
            {/* Login Card */}
            <form className="measure" onSubmit={handleFormSubmit}>
              <fieldset id="login" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Login</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="login">
                    Login:
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    id="login"
                    name="login"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password:
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="tc">
                  <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value={loading ? 'Logging in...' : 'Login'}
                    disabled={loading}
                  />
                </div>
              </fieldset>
              {error && <p>Error: {error.message}</p>}
            </form>
          </main>
        </article>
      </div>
    </div>
  );
};

export default Signin;
