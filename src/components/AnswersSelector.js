import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';


const AnswersSelector = ({ options, label, onChange }) => {
  const [answerIndex, setAnswerIndex] = useState(null);

  useEffect(() => {
    onChange({ answerIndex });
  });

  const renderOptions = () => _.map(options, (option, index) => (option !== ''
    && (
      <FormGroup check key={index}>
        <Label check>
          <Input
            onClick={() => { setAnswerIndex(index); }}
            type="radio"
            name="answers-selector"
          />
          {' '}
          {option}
        </Label>
      </FormGroup>
    )
  ));

  if (!options || !label) {
    return null;
  }

  return (
    <div className="AnswersSelector p-3">
      <Form>
        <FormGroup tag="fieldset">
          <legend>{label}</legend>
        </FormGroup>
        {renderOptions()}
      </Form>
    </div>
  );
};

AnswersSelector.defaultProps = {
  onChange: () => { },
  options: [],
};

export default AnswersSelector;
