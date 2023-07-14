import React, { useState } from 'react';
import axios from 'axios';

import "./App.css";
const App = () => {
  const [codeInput, setCodeInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleChange=(e)=>{
    // e.preventdefault()
    const value=e.target.value
    setCodeInput(value)
  }
  const analyzeCode = () => {
    // e.preventdefault()
    const codeData = {
      code:codeInput
    }
    axios
      .post('http://localhost:5000/analyze',codeData)
      .then((response) => {
        console.log(response.data,response.status)
        setFeedback(response.data.feedback);
      })
      .catch((error) => {
        console.log('Error analyzing code:', error);
        setFeedback('An error occurred while analyzing the code.');
      });
  };

  return (
    <>
    <div>
      <h1>Code Review App</h1><br></br><br></br>
      
      <div>
        <textarea
          value={codeInput}
          onChange={handleChange}
          placeholder="Paste your code here"
        ></textarea>
        <br></br><br></br>
        <button onClick={analyzeCode}>Analyze</button>
      </div>
      
      {feedback && <div>{feedback}</div>}
      
    </div>

    </>
  )
}

export default App;