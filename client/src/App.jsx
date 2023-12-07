// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import { Outlet } from 'react-router-dom';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <div className="flex-column justify-center align-center min-100-vh bg-primary">
//         <Header />
//         <Outlet />
//         <Footer />
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;

import React from 'react';
import 'tachyons';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-wrapper">
        <div className="flex-grow-1">
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;