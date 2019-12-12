import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';


const PoolCreator = ({ onChange, onUpdatePool, userPools }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentPoolId, setCurrentPoolId] = useState(null);

  useEffect(() => {
    onChange({ question, answers });
  });

  const setPool = (id) => {
    setCurrentPoolId(id);
    setQuestion(userPools[id].question);
    setAnswers(userPools[id].options);
  };

  const resetForm = () => {
    setQuestion('');
    setAnswers([]);
    setCurrentPoolId(null);
  };

  const renderAnswersForm = () => _.map(answers, (answer, index) => {
    return (
      <div key={index}>
        <FormGroup>
          <Label for={`answer${index}`}>
            {`Answer #${index + 1}`}
          </Label>
          {index > 0 && (
            <Button
              className="ml-2"
              onClick={() => {
                setAnswers(currentAnswer => {
                  const newAnswersArray = _.filter(currentAnswer, (value, subIndex) => index !== subIndex);
                  return newAnswersArray;
                });
              }}
              color="danger"
              size="sm"
            >
              Delete

            </Button>
          )}
          <Input
            onChange={({ target: { value } }) => {
              setAnswers(currentAnswers => {
                const newAnswersArray = [...currentAnswers];
                newAnswersArray[index] = value;
                return newAnswersArray;
              });
            }}
            type="text"
            value={answer}
            name={`answer${index}`}
            id={`answer${index}`}
            placeholder="Type your answer..."
            maxLength="80"
          />
        </FormGroup>
      </div>
    );
  });

  const renderPools = () => {
    const currentValue = _.find(userPools, ({ id }) => id === currentPoolId);
    return (
      <FormGroup>
        <Input value={!currentPoolId ? 'Select pool' : currentValue} onChange={({ target: { value } }) => { setPool(value); }} type="select" name="select" id="selectPool">
          <option disabled value="Select pool">Select pool</option>
          {_.map(userPools, ({ question: poolQuestion, id }, index) => (
            <option key={index} value={id}>
              {poolQuestion}
            </option>
          ))}
        </Input>
      </FormGroup>
    );
  };

  return (
    <div className="PoolCreator p-3">
      <Form>
        <div className="d-flex">
          <span className="mr-3">
            <Button onClick={resetForm}>Create new pool</Button>
          </span>
          {_.size(userPools) && renderPools()}
        </div>

        <FormGroup>
          <Label for="question">Question</Label>
          <Input onChange={({ target: { value } }) => { setQuestion(value); }} value={question} type="text" name="question" id="question" placeholder="Type your question..." maxLength="80" />
        </FormGroup>
        {renderAnswersForm()}
        <div className="d-flex">
          <span className="mr-auto">
            <Button onClick={() => { setAnswers(currentAnswer => [...currentAnswer, '']); }}>Add Answer</Button>
          </span>
          <span className="ml-auto">
            <Button className="mr-2" onClick={resetForm}>Reset</Button>
            <Button onClick={() => {
              onUpdatePool({ question, answers, poolId: currentPoolId });
            }}
            >
              Save

            </Button>
          </span>
        </div>
      </Form>
    </div>
  );
};

PoolCreator.defaultProps = {
  onChange: () => { },
};

export default PoolCreator;
