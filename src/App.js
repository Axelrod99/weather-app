import React from 'react';
import Weather from './components/weather';
import Header from './components/header';


const App = () => {
  return (
    <div className='bg-blue-100 Axiforma'>
      <Header/>
      <Weather />
    </div>
  );
};

export default App;