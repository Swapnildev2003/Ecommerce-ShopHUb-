import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/Admin/Admin';

/**
 * Root component of the application.
 * Renders the Navbar and the Admin page.
 */
const App = () => {
  return (
    <div>
      {/* Navbar component */}
      <Navbar />
      {/* Admin page */}
      <Admin />
    </div>
  );
};

export default App;
