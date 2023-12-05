import React from 'react';

const BusinessProfile = () => {
  // Sample project data for the business owner (replace this with actual data)
  const activeProjects = [
    { title: 'Project X', status: 'Active' },
    { title: 'Project Y', status: 'Active' },
    { title: 'Project Z', status: 'Active' },
  ];

  return (
    <div className="pa4">
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          {/* Business profile section */}
          <h2 className="f3 fw6">Business Profile</h2>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="businessName">Business Name:</label>
            <p className="b">Business ABC</p>
          </div>

          {/* Active projects */}
          <h2 className="f3 fw6">Active Projects</h2>
          <div>
            <table className="f6 w-100 mw8 center" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Project Title</th>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Status</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {activeProjects.map((project, index) => (
                  <tr key={index} className={(index % 2 === 0) ? 'bg-white' : 'bg-light-gray'}>
                    <td className="pv3 pr3 bb b--black-20">{project.title}</td>
                    <td className="pv3 pr3 bb b--black-20">{project.status}</td>
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

export default BusinessProfile;