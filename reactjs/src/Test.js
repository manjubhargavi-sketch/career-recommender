import React,{useState} from 'react';

import './test.css';
import Predict from './predict';
// import {ReactDOM,Router} from 'react-dom/client';

import {Routes,Route,Link} from 'react-router-dom';

// import axios from 'axios';



var result='';

function Test(){

   const [selectedOptions, setSelectedOptions] = useState({
   hobby: '',
   group: '',
   percentile: '',
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
    
    function prediction(){
 

      
        if(selectedOptions.hobby==='Programming' || selectedOptions.hobby==='Puzzles & games'){
           
            result="Programmer";
        }

        var outputelement=document.getElementById("output");
        outputelement.innerHTML=result;
       }
    
    
   function handleSubmit(event){
     
      event.preventDefault();
      const {hobby,group,percentile,subject,strength,weakness}=selectedOptions;
      
      var result=prediction();
      
      
      fetch('http://localhost:8000/quiz/submit',{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
         },
         body:JSON.stringify({hobby,group,percentile,subject,strength,weakness}),})
         
         .then(response=>response.json())
      .then(selectedOptions=>{
         console.log('Entry created:',selectedOptions);
          })
       .catch(error=>{
         console.error('Error creating entry:',error);
        })
        
      
   }
    

    return(

        <body>
    <div id="Test">
  <h1 color="white">Are you ready to take the test</h1>
  <div id="test">
      <form onSubmit={handleSubmit}>
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
            <option value="Art">Art</option>
            <option value="Gardening">Gardening</option>
            <option value="Socializing">Socializing</option>
            <option value="Puzzles & games">Puzzles & games</option>
            
        </select>
        </label>

        <br></br>
        <label id="q2">Question :2
        <p>Which group did you opt in your high School</p>
         <select name="group"
         value={selectedOptions.group}
         onChange={handleOptionChange}>
            
            <option value="bio">Biology</option>
            <option value="comp">Computer Science</option>
            <option value="com">Commerce</option>
         </select>
        </label>


        <br></br>
        <label id="q3"> Question3:
        <p>Select the range of your 12th board percentile</p>
         <select name="percentile"
         value={selectedOptions.percentile}
         onChange={handleOptionChange}>
            <option value="90-100">90-100</option>
            <option value="80-90">80-90</option>
            <option value="70=80">80-90</option>
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
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
            <option value="chem"> Chemistry</option>
            <option value="phy">Physics</option>
            <option value="com">Commerce</option>
            <option value="eco">Economics</option>
            <option value="psy">Psychology</option>
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
            <option value="lazy">Laziness</option>
            <option value="procrastination">Procrastination</option>
            <option value="deadlines">deadlines</option>
            <option value="panic">Panic in high Pressure</option>
        </select>
        </label>
     

       <button id="but" type='submit'>Submit</button>
        </form>
        <div>
        <p> Your suggested career is </p>
        <label id="output"></label>
        </div>

       





  </div>

  </div>
  </body>
  )
}
export default Test;