import React, { useState } from 'react';
import Octicon, { X } from '@primer/octicons-react';
import _ from 'lodash';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { ROLES } from '../constants';


const PoolManager = ({
  onUpdatePool, onSelectAnswer, userPools, role, selectedUserId, onSelectPool,
}) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [currentPoolId, setCurrentPoolId] = useState(null);

  const setPool = (poolId) => {
    const index = _.findIndex(userPools, (({ id }) => _.toNumber(id) === _.toNumber(poolId)));
    setCurrentPoolId(poolId);
    setQuestion(userPools[index].question);
    setAnswers(userPools[index].options);
    const { answersPerUser } = userPools[index];
    const currentAnswer = _.find(answersPerUser, ({ userId }) => _.toNumber(userId) === _.toNumber(selectedUserId));
    if (!_.isNil(currentAnswer)) {
      const { answer } = currentAnswer;
      setAnswerIndex(answer);
    }
    onSelectPool({ index, poolId });
  };

  const resetForm = () => {
    setQuestion('');
    setAnswers([]);
    setCurrentPoolId(null);
  };


  const renderAnswersForm = () => _.map(answers, (answer, index) => {
    return (
      <div key={index}>
        <FormGroup tag="fieldset" check={role === ROLES.RESPONDENT}>
          {role === ROLES.OWNER && (
            <Label className="my-3" for={`answer${index}`}>
              {`Answer #${index + 1}`}
            </Label>
          )}
          {index > 0 && role === ROLES.OWNER && (
            <Button
              className="ml-2 rounded-pill"
              onClick={() => {
                setAnswers(currentAnswer => {
                  const newAnswersArray = _.filter(currentAnswer, (value, subIndex) => index !== subIndex);
                  return newAnswersArray;
                });
              }}
              color="danger"
              size="sm"
            >
              <Octicon size="small" icon={X} />
            </Button>
          )}
          {role === ROLES.OWNER && (
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
          )}
          {role === ROLES.RESPONDENT && (
            <Label check>
              <Input
                checked={answerIndex === index}
                onChange={() => {
                  setAnswerIndex(index);
                }}
                type="radio"
                name="answer"
                id={`answer${index}`}
              />
              {role === ROLES.RESPONDENT && answer}
            </Label>
          )}
        </FormGroup>
      </div>
    );
  });

  const renderPools = () => {
    const currentValue = _.findIndex(userPools, ({ id }) => !_.isNil(currentPoolId) && id === _.toNumber(currentPoolId));
    return (
      <FormGroup>
        <Input value={currentValue !== -1 ? currentValue : 'Select pool'} onChange={({ target: { value } }) => { setPool(value); }} type="select" name="select" id="selectPool">
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
    <div className="PoolManager p-3">
      <Form autoComplete="off">
        <div className="d-flex">
          {role === ROLES.OWNER && (
            <span className="mr-3">
              <Button onClick={resetForm}>Create new pool</Button>
            </span>
          )}
          {_.size(userPools) && renderPools()}
        </div>

        <FormGroup>
          <Label for="question">Question</Label>
          <Input
            disabled={role === ROLES.RESPONDENT}
            onChange={({ target: { value } }) => { setQuestion(value); }}
            value={question}
            type="text"
            name="question"
            id="question"
            placeholder={role === ROLES.OWNER ? 'Type your question...' : 'Select a pool from the above menu'}
            maxLength="80"
          />
        </FormGroup>
        {renderAnswersForm()}
        <div className="d-flex">
          {role === ROLES.OWNER && (
            <span className="mr-auto">
              <Button onClick={() => { setAnswers(currentAnswer => [...currentAnswer, '']); }}>Add Answer</Button>
            </span>
          )}
          <span className="ml-auto">
            {role === ROLES.OWNER && <Button className="mr-2" onClick={resetForm}>Reset</Button>}
            <Button onClick={() => {
              if (role === ROLES.OWNER) {
                onUpdatePool({ question, answers, poolId: currentPoolId });
              }
              if (role === ROLES.RESPONDENT) {
                onSelectAnswer({ answerIndex, poolId: currentPoolId });
              }
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

PoolManager.defaultProps = {
  // onChange: () => { },
};

export default PoolManager;
