import React from 'react';

const Signin = () => {
  return (
    <div className="pa4">
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
        <main className="pa4 black-80">
          {/* Login Card */}
          <form className="measure">
            <fieldset id="login" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Login</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="login">Login:</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text" id="login" name="login" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password:</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password" id="password" name="password" />
              </div>
            </fieldset>
            <div className="tc">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit" value="Login" />
            </div>
          </form>
        </main>
      </article>

      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
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
            </fieldset>
            <div className="tc">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit" value="Sign Up" />
            </div>
          </form>
        </main>
      </article>
    </div>
  );
};

export default Signin