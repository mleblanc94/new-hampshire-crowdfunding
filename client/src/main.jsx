import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import BusinessProfile from './pages/BusinessProfile.jsx';
import CreateProject from './pages/CreateProject.jsx';
import DonateProfile from './pages/DonateProfile.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/signin',
        element: <Signin />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/business',
        element: <BusinessProfile />
      }, {
        path: 'donate',
        element: <DonateProfile />
      }, {
        path: 'create',
        element: <CreateProject />
      }, {
        path: '/home',
        element: <Home />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
