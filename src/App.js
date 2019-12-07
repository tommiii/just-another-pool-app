import React, { useState, useEffect } from 'react';
import PoolCreator from './components/PoolCreator';
import AnswersSelector from './components/AnswersSelector';
import UsersManagement from './components/UsersManagement';

const App = () => {
  const [options, setOptions] = useState([]);
  const [label, setLabel] = useState(null);

  return (
    <div className="App p-3">
      <UsersManagement />
      <div className="d-flex justify-content-start">
        <PoolCreator onChange={({ question, answers }) => {
          setOptions(answers);
          setLabel(question);
        }}
        />
        <AnswersSelector options={options} label={label} />
      </div>
    </div>
  );
};

export default App;
