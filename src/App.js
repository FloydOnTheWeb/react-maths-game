import React from 'react';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import AppFooter from './components/AppFooter';
import './App.css';
import './style.scss';

function App() {
  return (
    <div className="Game">
      <AppHeader />
      <AppContent />
      <AppFooter />
    </div>
  );
}

export default App;
