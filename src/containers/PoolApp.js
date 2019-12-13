import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Octicon, { Organization } from '@primer/octicons-react';
import { Button, Modal } from 'reactstrap';
import PoolManager from '../components/PoolManagement';
import PoolChart from '../components/PoolChart';
import UsersManagement from '../components/UsersManagement';
import { ROLES } from '../constants';
import {
  setUserId,
  addUser,
  updatePools,
} from '../actions';

const PoolApp = ({
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
          onChangeUser={(newId) => { onChangeUser(newId); setUserModal(false); setCurrentPoolId(null); }}
          onAddUser={(newUser => { onAddUser(newUser); })}
          selectedUserId={selectedUserId}
          users={users}
        />
      </Modal>
      <div className="row">
        <div className="col">
          <PoolManager
            role={role}
            selectedUserId={selectedUserId}
            onResetForm={() => {
              setCurrentPoolId(null);
            }}
            onSelectAnswer={({ poolId, answerIndex }) => {
              const poolToUpdateIndex = _.findIndex(pools, ({ id }) => _.toNumber(id) === _.toNumber(poolId));
              const { answersPerUser } = pools[poolToUpdateIndex];
              const userIdex = _.findIndex(answersPerUser, ({ userId }) => _.toNumber(userId) === _.toNumber(selectedUserId));
              let newPool;
              if (userIdex !== -1) {
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
            onResetPool={(({ poolId }) => {
              const newPools = _.filter(pools, (({ id }) => _.toNumber(id) !== _.toNumber(poolId)));
              onUpdatePools(newPools);
              setCurrentPoolId(null);
            })}
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
                setCurrentPoolId(null);
              }
            }}
          />
        </div>
        {currentPool
          && (
            <div className="col">
              <PoolChart pool={currentPool} />
            </div>
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
)(PoolApp);
