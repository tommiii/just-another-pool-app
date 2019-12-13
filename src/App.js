import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Octicon, { Organization } from '@primer/octicons-react';
import { Button, Modal } from 'reactstrap';
import PoolManager from './components/PoolManager';
import PoolChart from './components/PoolChart';
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
  const [currentPoolId, setCurrentPoolId] = useState(null);
  const [userModal, setUserModal] = useState(false);
  const { users, selectedUserId, pools } = poolApp;
  const toggleUserModal = () => { setUserModal(currentState => !currentState); };
  const selectedUser = _.find(users, ({ id }) => id === selectedUserId);
  const { role } = selectedUser;
  let userPools;
  if (role === ROLES.OWNER) {
    userPools = _.filter(pools, ({ ownerId }) => ownerId === selectedUserId);
  }
  if (role === ROLES.RESPONDENT) {
    userPools = pools;
  }


  const currentPool = _.find(pools, (({ id }) => !_.isNil(currentPoolId) && _.toNumber(id) === _.toNumber(currentPoolId)));

  return (
    <div className="App p-3 h-100">
      <div className="float-right d-flex">
        <Button
          onClick={toggleUserModal}
          className="rounded-circle"
        >
          <Octicon size="small" icon={Organization} />
        </Button>

      </div>
      <Modal isOpen={userModal} toggle={toggleUserModal}>
        <UsersManagement
          onChangeUser={(newId) => { onChangeUser(newId); setUserModal(false); }}
          onAddUser={(newUser => { onAddUser(newUser); })}
          selectedUserId={selectedUserId}
          users={users}
        />
      </Modal>
      <div className="content d-flex justify-content-start">
        <PoolManager
          role={role}
          selectedUserId={selectedUserId}
          onSelectAnswer={({ poolId, answerIndex }) => {
            const poolToUpdateIndex = _.findIndex(pools, ({ id }) => _.toNumber(id) === _.toNumber(poolId));
            const { answersPerUser } = pools[poolToUpdateIndex];
            const userIdex = _.findIndex(answersPerUser, ({ userId }) => _.toNumber(userId) === _.toNumber(selectedUserId));
            let newPool;
            if (!_.isNil(userIdex)) {
              const newAnswersPerUser = _.set([...answersPerUser], [userIdex], { userId: selectedUserId, answer: answerIndex });
              newPool = { ...pools[poolToUpdateIndex], answersPerUser: newAnswersPerUser };
            } else {
              newPool = { ...pools[poolToUpdateIndex], answersPerUser: [...answersPerUser, { userId: selectedUserId, answer: answerIndex }] };
            }
            const newPools = _.set([...pools], [poolToUpdateIndex], newPool);
            onUpdatePools(newPools);
          }}
          selectedUser={selectedUser}
          userPools={userPools}
          onSelectPool={(({ poolId }) => { setCurrentPoolId(poolId); })}
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
        {currentPool && <PoolChart pool={currentPool} />}
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
