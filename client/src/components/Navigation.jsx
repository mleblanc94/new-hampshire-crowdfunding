// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import 'tachyons';

// const Navigation = () => {
//   const location = useLocation();

//   // Function to check if the current path matches the given link
//   const isCurrentPage = (link) => {
//     return location.pathname === link;
//   };

//   return (
//     <nav>
//       <ul className="flex justify-around list ma0 sans-serif f3 lh-copy bg-navy pv3">
//         <li>
//           <Link
//             to="/home"
//             className={`near-white ${isCurrentPage('/home') ? 'fw8' : ''}`}
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/create"
//             className={`near-white ${isCurrentPage('/create') ? 'fw8' : ''}`}
//           >
//             Create
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/business"
//             className={`near-white ${isCurrentPage('/business') ? 'fw8' : ''}`}
//           >
//             Profile
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/signin"
//             className={`near-white ${isCurrentPage('/') ? 'fw8' : ''}`}
//           >
//             Login
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/signup"
//             className={`near-white ${isCurrentPage('/') ? 'fw8' : ''}`}
//           >
//             Signup
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import 'tachyons';

// const Navigation = () => {
//   const location = useLocation();

//   // Function to check if the current path matches the given link
//   const isCurrentPage = (link) => {
//     return location.pathname === link;
//   };

//   return (
//     <nav>
//       <ul className="flex justify-between list ma0 sans-serif f3 lh-copy bg-navy pv3">
//         <li>
//           <Link
//             to="/home"
//             className={`near-white ${isCurrentPage('/home') ? 'fw8' : ''}`}
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/create"
//             className={`near-white ${isCurrentPage('/create') ? 'fw8' : ''}`}
//           >
//             Create
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/business"
//             className={`near-white ${isCurrentPage('/business') ? 'fw8' : ''}`}
//           >
//             Profile
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/signin"
//             className={`near-white ${isCurrentPage('/signin') ? 'fw8' : ''}`}
//           >
//             Login
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/signup"
//             className={`near-white ${isCurrentPage('/signup') ? 'fw8' : ''}`}
//           >
//             Signup
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';

// const Navigation = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };

//   return (
//     <nav>
//       <ul className="flex justify-between list ma0 sans-serif f3 lh-copy bg-navy pv3">
//         <li>
//           <Link to="/" className="near-white">
//             <h1 className="m-0">Tech Thoughts</h1>
//           </Link>
//           <p className="m-0">Get into the mind of a programmer.</p>
//         </li>
//         <li>
//           {Auth.loggedIn() ? (
//             <div>
//               <span className="near-white">Hey there, {Auth.getProfile().data.username}!</span>
//               <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-black ml2" onClick={logout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div>
//               <Link to="/login">
//                 <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-black mr2">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-black">
//                   Signup
//                 </button>
//               </Link>
//             </div>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Auth from '../utils/auth';

// const Navigation = () => {
//   const location = useLocation();

//   const isCurrentPage = (link) => {
//     return location.pathname === link;
//   };

//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };

//   return (
//     <nav>
//       <ul className="flex justify-between list ma0 sans-serif f3 lh-copy bg-navy pv3">
//         <li>
//           <Link to="/" className={`near-white ${isCurrentPage('/') ? 'fw8' : ''}`}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/create" className={`near-white ${isCurrentPage('/create') ? 'fw8' : ''}`}>
//             Create
//           </Link>
//         </li>
//         <li>
//           <Link to="/business" className={`near-white ${isCurrentPage('/business') ? 'fw8' : ''}`}>
//             Profile
//           </Link>
//         </li>
//         <li>
//           <Link to="/signup" className={`near-white ${isCurrentPage('/signup') ? 'fw8' : ''}`}>
//             Signup
//           </Link>
//         </li>
//         <li>
//           {Auth.loggedIn() ? (
//             <button className={`f6 link dim br-pill ph3 pv2 mb2 dib white bg-black ${isCurrentPage('/login') ? 'fw8' : ''}`} onClick={logout}>
//               Logout
//             </button>
//           ) : (
//             <Link to="/login">
//               <button className={`f6 link dim br-pill ph3 pv2 mb2 dib white bg-black ${isCurrentPage('/signup') ? 'fw8' : ''}`}>
//                 Login
//               </button>
//             </Link>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

const Navigation = () => {
  const location = useLocation();

  const isCurrentPage = (link) => {
    return location.pathname === link;
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav>
      <ul className="flex justify-between list ma0 sans-serif f3 lh-copy bg-navy pv3">
        <li>
          <Link to="/" className={`near-white ${isCurrentPage('/') ? 'fw8' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/create" className={`near-white ${isCurrentPage('/create') ? 'fw8' : ''}`}>
            Create
          </Link>
        </li>
        <li>
          <Link to="/business" className={`near-white ${isCurrentPage('/business') ? 'fw8' : ''}`}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button className={`f6 link dim br-pill ph3 pv2 mb2 dib white bg-black ${isCurrentPage('/signup') ? 'fw8' : ''}`}>
              Signup
            </button>
          </Link>
        </li>
        <li>
          {Auth.loggedIn() ? (
            <button className={`f6 link dim br-pill ph3 pv2 mb2 dib white bg-black ${isCurrentPage('/login') ? 'fw8' : ''}`} onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/Signin">
              <button className={`f6 link dim br-pill ph3 pv2 mb2 dib white bg-black ${isCurrentPage('/login') ? 'fw8' : ''}`}>
                Login
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
