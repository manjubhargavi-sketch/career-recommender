import React from 'react';
import { useParams } from 'react-router-dom';

const Predict = () => {
  const { result } = useParams();

  return (
    <div>
      <h1>Result Page</h1>
      <p>Result: {result}</p>
    </div>
  );
};

export default Predict;