import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PoolCreator from './components/PoolManager';
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
  const { users, selectedUserId, pools } = poolApp;
  const selectedUser = _.find(users, ({ id }) => id === selectedUserId);
  const { role } = selectedUser;
  let userPools;
  if (role === ROLES.OWNER) {
    userPools = _.filter(pools, ({ ownerId }) => ownerId === selectedUserId);
  }
  if (role === ROLES.USER) {
    userPools = pools;
  }

  return (
    <div className="App p-3">
      <UsersManagement
        onChangeUser={(newId) => { onChangeUser(newId); }}
        onAddUser={(newUser => { onAddUser(newUser); })}
        selectedUserId={selectedUserId}
        users={users}
      />
      <div className="content mt-5">
        {_.includes([ROLES.OWNER, ROLES.USER], role) && (
          <PoolCreator
            role={role}
            selectedUserId={selectedUserId}
            onSelectAnswer={({ poolId, answerIndex }) => {
              const poolToUpdate = _.find(pools, ({ id }) => _.toNumber(id) === _.toNumber(poolId));
              const { answersPerUser } = poolToUpdate;
              const userIdex = _.findIndex(answersPerUser, ({ userId }) => _.toNumber(userId) === _.toNumber(selectedUserId));
              let newPool;
              if (!_.isNil(userIdex)) {
                const newAnswersPerUser = _.set([...answersPerUser], [userIdex], { userId: selectedUserId, answer: answerIndex });
                newPool = { ...poolToUpdate, answersPerUser: newAnswersPerUser };
              } else {
                newPool = { ...poolToUpdate, answersPerUser: [...answersPerUser, { userId: selectedUserId, answer: answerIndex }] };
              }
              const auxPools = _.filter(pools, (({ id }) => _.toNumber(id) !== _.toNumber(poolId)));
              const newPools = [...auxPools, newPool];
              onUpdatePools(newPools);
            }}
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
          />
        )}
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
