import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PoolCreator from './components/PoolCreator';
import AnswersSelector from './components/AnswersSelector';
import UsersManagement from './components/UsersManagement';
import { ROLES } from './constants';
import {
  setUserId,
  addUser,
  updatePools,
} from './actions';

const App = ({
  poolApp, onChangeUser, onAddUser, onUpdatePools,
}) => {
  const [options, setOptions] = useState([]);
  const [label, setLabel] = useState(null);
  const { users, selectedUserId, pools } = poolApp;
  const selectedUser = _.find(users, ({ id }) => id === selectedUserId);
  const userPools = _.filter(pools, ({ ownerId }) => ownerId === selectedUserId);
  const { role } = selectedUser;
  return (
    <div className="App p-3">
      <UsersManagement
        onChangeUser={(newId) => { onChangeUser(newId); }}
        onAddUser={(newUser => { onAddUser(newUser); })}
        selectedUserId={selectedUserId}
        users={users}
      />
      <div className="content mt-5">
        {role === ROLES.OWNER && (
          <PoolCreator
            selectedUser={selectedUser}
            userPools={userPools}
            onUpdatePool={({ question, answers, poolId }) => {
              if (poolId) {
                const poolToUpdate = _.find(pools, ({ id }) => _.toNumber(id) === _.toNumber(poolId));
                const newPool = { ...poolToUpdate, question, options: answers };
                const auxPools = _.filter(pools, (({ id }) => _.toNumber(id) !== _.toNumber(poolId)));
                const newPools = [...auxPools, newPool];
                onUpdatePools(newPools);
              } else {
                const newPool = {
                  id: new Date().getTime(), question, options: answers, ownerId: selectedUserId, answersPerUser: [],
                };
                const newPools = [...pools, newPool];
                onUpdatePools(newPools);
              }
            }}
            onChange={({ question, answers }) => {
              setOptions(answers);
              setLabel(question);
            }}
          />
        )}
        {role === ROLES.USER && <AnswersSelector options={options} label={label} />}
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
    onUpdatePools: pools => { dispatch(updatePools(pools)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
