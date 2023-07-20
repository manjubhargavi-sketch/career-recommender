
import './App.css';
import React from 'react';
import Test from './Test.js';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
function handleclick(){
  root.render(
    <React.StrictMode>
      <Test />
    </React.StrictMode>
  );
}
function App() {
  return (
    <body>
    <div className="App">
      <div id="head">
        <h2>Looking for career recommendations ?? You're at the right place!</h2></div>
        <div id="image">
          <img src="career.gif" align="left"width="device-width" height="600dp"alt="career"></img>
        </div>
        <div id="content">
          <p>Are you feeling lost in the vast sea of career choices? Don't worry; 
            we're here to help you navigate your way to a fulfilling and successful career that aligns with your passions and strengths.
             Our website is designed to provide you with fancy and personalized content to guide you on your journey to finding the perfect career path.</p>
<br></br><p>
Discover Your Passion

Unearth the depths of your true passion! Our interactive assessments and quizzes will delve into your interests, hobbies, and natural inclinations to uncover the core elements that ignite your enthusiasm. No more uncertainty about what you love - we'll pinpoint it for you!</p>
          
        </div>
        <div id="take">
        <button  align="center" id="but" onClick={handleclick}>Take Test</button></div>
     
    </div>
    </body>
  );
}

export default App;
