import React from 'react';
import 'tachyons';

const DonateProfile = () => {
  // Sample donation data (replace this with actual data)
  const donationHistory = [
    { project: 'Project A', amount: 50 },
    { project: 'Project B', amount: 30 },
    { project: 'Project C', amount: 20 },
  ];

  return (
    <div className="pa4">
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          {/* User profile section */}
          <h2 className="f3 fw6">User Profile</h2>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="email">Email:</label>
            <p className="b">{/* User's email goes here */} user@example.com</p>
          </div>

          {/* Donation history */}
          <h2 className="f3 fw6">Donation History</h2>
          <div>
            <table className="f6 w-100 mw8 center" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Project</th>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Amount</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {donationHistory.map((donation, index) => (
                  <tr key={index} className={(index % 2 === 0) ? 'bg-white' : 'bg-light-gray'}>
                    <td className="pv3 pr3 bb b--black-20">{donation.project}</td>
                    <td className="pv3 pr3 bb b--black-20">{`$${donation.amount}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </article>
    </div>
  );
};

export default DonateProfile;