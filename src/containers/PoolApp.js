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
  poolApp, changeUser, add, update,
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

  const onSelectAnswer = ({ poolId, answerIndex }) => {
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
    update(newPools);
  };

  const onResetPool = (({ poolId }) => {
    if (poolId) {
      const newPools = _.filter(pools, (({ id }) => _.toNumber(id) !== _.toNumber(poolId)));
      update(newPools);
    }
    setCurrentPoolId(null);
  });

  const onUpdatePool = ({ question, answers, poolId }) => {
    if (poolId) {
      const poolToUpdate = _.find(pools, ({ id }) => _.toNumber(id) === _.toNumber(poolId));
      const newPool = { ...poolToUpdate, question, options: answers };
      const auxPools = _.filter(pools, (({ id }) => _.toNumber(id) !== _.toNumber(poolId)));
      const newPools = [...auxPools, newPool];
      update(newPools);
    } else {
      const newPool = {
        id: new Date().getTime(), question, options: answers, ownerId: selectedUserId, answersPerUser: [],
      };
      const newPools = [...pools, newPool];
      update(newPools);
    }
    setCurrentPoolId(null);
  };

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
          onChangeUser={(newId) => { changeUser(newId); setUserModal(false); setCurrentPoolId(null); }}
          onAddUser={(newUser => {
            const { id: newUserId } = newUser;
            add(newUser);
            changeUser(newUserId);
            setUserModal(false);
          })}
          selectedUserId={selectedUserId}
          users={users}
        />
      </Modal>
      <div className="row">
        <div className="col">
          <PoolManager
            role={role}
            selectedUserId={selectedUserId}
            onResetForm={() => { setCurrentPoolId(null); }}
            onSelectAnswer={onSelectAnswer}
            selectedUser={selectedUser}
            userPools={userPools}
            onResetPool={onResetPool}
            onSelectPool={(({ poolId }) => { setCurrentPoolId(poolId); })}
            onUpdatePool={onUpdatePool}
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
    changeUser: id => { dispatch(setUserId(id)); },
    add: user => { dispatch(addUser(user)); },
    update: pools => { dispatch(updatePools(pools)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolApp);
