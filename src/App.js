import React, { useState } from 'react';
import { connect } from 'react-redux';
import PoolCreator from './components/PoolCreator';
import AnswersSelector from './components/AnswersSelector';
import UsersManagement from './components/UsersManagement';
import {
  setUserId,
  addUser,
} from './actions';

const App = ({ poolApp, onChangeUser, onAddUser }) => {
  const [options, setOptions] = useState([]);
  const [label, setLabel] = useState(null);
  const { users, selectedUserId } = poolApp;

  return (
    <div className="App p-3">
      <UsersManagement
        onChangeUser={(newId) => { onChangeUser(newId); }}
        onAddUser={(newUser => { onAddUser(newUser); })}
        selectedUserId={selectedUserId}
        users={users}
      />
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

const mapStateToProps = (state) => ({
  poolApp: state,
});

const mapDispatchToProps = dispatch => {
  return {
    onChangeUser: id => { dispatch(setUserId(id)); },
    onAddUser: user => { dispatch(addUser(user)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
