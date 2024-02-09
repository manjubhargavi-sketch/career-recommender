import React,{useState} from 'react';

import './test.css';

var result='';

function Test(){
  const [error, setError] = useState(null);
   const [prediction, setPrediction] = useState(null);
   const [selectedOptions, setSelectedOptions] = useState({
   hobby: '',
   group: '',
   percentage: '',
   subject: '',
   strength: '',
   weakness: '',});
 
   const handleOptionChange = (event) => {
      // const { name, value } = event.target;
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [event.target.name]: event.target.value,
      }));
    };
    
   
    const handleFormSubmit = async (event) => {
         event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOptions),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }
       const data = await response.json();
       if (data.predictions && data.predictions.length > 0) {
        setPrediction(data.predictions);
    } else {
        setError('No predictions found');
    }
      } catch (error) {
        console.error('Error:', error);
        alert(error);
        setError('Failed to fetch predictions');
      }

      
   };


    return(

        <body>
    <div id="Test">
  <h1 color="white">Are you ready to take the test</h1>
  <div id="test">
      <form onSubmit={handleFormSubmit} method='POST'>
       <label id="q1">Question 1:
       <p>Which among the following is you favourite hobby or close to your favourite hobby</p>
       <select 
       
       name="hobby"
       value={selectedOptions.hobby}
       onChange={handleOptionChange}>
            <option value="select">select</option>
            <option value="music">music</option>
            <option value="Programming">Programming</option>
            <option value="reading">Reading</option>
            <option value="art">Art</option>
            <option value="gardening">Gardening</option>
            <option value="socializing">Socializing</option>
            <option value="puzzles and games">Puzzles & games</option>
            
        </select>
        </label>

        <br></br>
        <label id="q2">Question :2
        <p>Which group did you opt in your high School</p>
         <select name="group"
         value={selectedOptions.group}
         onChange={handleOptionChange}>
            
            <option value="Biology">Biology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Commerce">Commerce</option>
         </select>
        </label>


        <br></br>
        <label id="q3"> Question3:
        <p>Select the range of your 12th board percentile</p>
         <select name="percentile"
         value={selectedOptions.percentage}
         onChange={handleOptionChange}>
            <option value="90-100">90-100</option>
            <option value="80-90">80-90</option>
            <option value="70-80">70-80</option>
            <option value="60-70">60-70</option>
            <option value="below 60">below 60</option>
         </select>
        </label>

        <br></br>
        <label id="q4"> Question 4: 
        <p>What is your favourite subject</p>
         <select name="subject"
         value={selectedOptions.subject}
         onChange={handleOptionChange}>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Commerce">Commerce</option>
            <option value="Economics">Economics</option>
            <option value="Psychology">Psychology</option>
         </select>
        </label>
        <label id="q5">Question 5:
        <p>What do you think is your biggest Strength</p>
         <select name="strength"
         value={selectedOptions.strength}
         onChange={handleOptionChange}>
            <option value="Communication">Communication</option>
            <option value="Intellect">Intellect</option>
            <option value="Leadership">Leadership</option>
            <option value="Resilience">Resilience</option>
            <option value="Adapatability">Adapatability</option>
         </select>
        </label>
        <br></br>
        <label id="q6" >Question:6
        <p>What do you think is your weakness</p>
        <select name="weakness"
        value={selectedOptions.weakness}
        onChange={handleOptionChange}>
            <option value="Laziness">Laziness</option>
            <option value="Procrastination">Procrastination</option>
            <option value="Deadlines">deadlines</option>
            <option value="Panic stricken">Panic in high Pressure</option>
        </select>
        </label>
     

       <button id="but" type='submit'>Submit</button>
        </form>
        <div>
        <p> Your suggested career is </p>
        <label id="output"></label>
        </div>
        {prediction !== null && <p>Prediction: {prediction}</p>}
        




  </div>

  </div>
  </body>
  )
}
export default Test;