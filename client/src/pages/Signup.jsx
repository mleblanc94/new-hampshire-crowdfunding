import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import 'tachyons';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      // Handle successful signup here, access response data as needed
      console.log('Signup Successful:', data);
      // You might navigate to a different page or perform other actions after successful signup
    },
    onError: (error) => {
      // Handle signup error
      console.error('Signup Error:', error);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Call the signup mutation with provided email and password
    try {
      await signup({ variables: { email, password } });
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
            {/* Signup Card */}
            <form className="measure" onSubmit={handleFormSubmit}>
              <fieldset id="signup" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={loading ? 'Signing Up...' : 'Sign Up'}
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

export default Signup;
