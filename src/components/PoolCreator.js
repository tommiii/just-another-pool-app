import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';


const PoolCreator = ({ onChange }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['']);

  useEffect(() => {
    onChange({ question, answers });
  });

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

  return (
    <div className="PoolCreator p-3">
      <Form>
        <FormGroup>
          <Label for="question">Question</Label>
          <Input onChange={({ target: { value } }) => { setQuestion(value); }} value={question} type="text" name="question" id="question" placeholder="Type your question..." maxLength="80" />
        </FormGroup>
        {renderAnswersForm()}
        <Button onClick={() => { setAnswers(currentAnswer => [...currentAnswer, '']); }}>Add Answer</Button>
      </Form>
    </div>
  );
};

PoolCreator.defaultProps = {
  onChange: () => { },
};

export default PoolCreator;
