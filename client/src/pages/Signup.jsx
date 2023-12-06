import React from 'react';
import 'tachyons';

const Signup = () => {
  return (
    <div className="tc">
      <h1 className="f2">Welcome to New Hampshire Crowdsourcing!</h1>
      <div className="flex justify-center">
        <article className="br2 ba dark-gray b--black-10 mv4 w-40-l mw6 mh4 center shadow-5 bg-washed-green">
          <main className="pa4 black-80">
            {/* Signup Card */}
            <form className="measure">
              <fieldset id="signup" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">Email:</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email" id="email" name="email" />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password:</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password" id="password" name="password" />
                </div>
                <div className="tc">
                  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit" value="Sign Up" />
                </div>
              </fieldset>
            </form>
          </main>
        </article>
      </div>
    </div>
  );
};

export default Signup;
