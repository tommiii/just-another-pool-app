import React, { useState } from 'react';
import _ from 'lodash';
import {
  Button, Modal, Form, FormGroup, Label, Input, Badge,
} from 'reactstrap';

const ROLES = {
  OWNER: 'OWNER',
  USER: 'USER',
  RESPONDENT: 'RESPONDENT',
};


const UsersManagement = ({
  users, selectedUserId, onChangeUser, onAddUser,
}) => {
  const [createUserModal, setCreateUserModal] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const changeUser = (newId) => { onChangeUser(newId); };
  const addUser = () => {
    const user = { ...newUser };

    _.set(user, 'id', new Date().getTime());
    if (!user.role) {
      _.set(user, 'role', ROLES.OWNER);
    }
    onAddUser(user);
    setCreateUserModal(false);
  };

  const selectedUser = _.find(users, ({ id }) => id === selectedUserId);
  const { name: selectedUserName, role: selectedUserRole } = selectedUser;
  const toggleCreateUserModal = () => { setCreateUserModal(currentState => !currentState); };
  const renderUsers = () => (
    <FormGroup className="m-0">
      <Input onChange={({ target: { value } }) => { const castToNumber = _.toNumber(value); changeUser(castToNumber); }} type="select" name="select" id="selectUser">
        {_.map(users, ({ name, role, id }, index) => (
          <option key={index} value={id}>
            {name}
            {' '}
            -
            {' '}
            {role}
          </option>
        ))}
      </Input>
    </FormGroup>
  );

  return (
    <div className="UsersManagement p-3">
      <div className="d-flex justify-content-between">
        <Button onClick={toggleCreateUserModal}>Create new user</Button>
        {renderUsers()}
        <span>
          Current user:
          <Badge className="ml-2" color="secondary">
            {' '}
            {selectedUserName}
            {' '}
            -
            {' '}
            {selectedUserRole}
          </Badge>
        </span>
        <Modal isOpen={createUserModal} toggle={toggleCreateUserModal}>
          <div className="p-3">
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input onChange={({ target: { value } }) => { setNewUser(currentState => ({ ...currentState, name: value })); }} type="text" name="name" id="name" placeholder="Select a name..." />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Role</Label>
                <Input onChange={({ target: { value } }) => { setNewUser(currentState => ({ ...currentState, role: value })); }} type="select" name="role" id="role">
                  <option>{ROLES.OWNER}</option>
                  <option>{ROLES.USER}</option>
                  <option>{ROLES.RESPONDENT}</option>
                </Input>
              </FormGroup>
              <Button disabled={!newUser || !newUser.name} onClick={addUser}>Submit</Button>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

UsersManagement.defaultProps = {
  onChangeUser: () => { },
  onAddUser: () => { },
  options: [],
};

export default UsersManagement;
