import React, { useState } from 'react';
import _ from 'lodash';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { ROLES } from '../constants';


const UsersManagement = ({
  users, selectedUserId, onChangeUser, onAddUser,
}) => {
  const [newUser, setNewUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(selectedUserId);
  const addUser = () => {
    const user = { ...newUser };
    _.set(user, 'id', new Date().getTime());
    if (!user.role) {
      _.set(user, 'role', ROLES.OWNER);
    }
    onAddUser(user);
  };

  const renderUsers = () => (
    <FormGroup className="m-0">
      <Input
        defaultValue={selectedUserId}
        onChange={({ target: { value } }) => { const castToNumber = _.toNumber(value); setCurrentUserId(castToNumber); }}
        type="select"
        name="select"
        id="selectUser"
      >
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
      <div className="select-user">
        <span className="font-weight-bold">Select User</span>
        {renderUsers()}
        <Button className="float-right mt-3" onClick={() => onChangeUser(currentUserId)}>Confirm</Button>
      </div>
      <div className="create-user mt-5">
        <span className="font-weight-bold">Create User</span>
        <Form autoComplete="off">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input onChange={({ target: { value } }) => { setNewUser(currentState => ({ ...currentState, name: value })); }} type="text" name="name" id="name" placeholder="Select a name..." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Role</Label>
            <Input onChange={({ target: { value } }) => { setNewUser(currentState => ({ ...currentState, role: value })); }} type="select" name="role" id="role">
              <option>{ROLES.OWNER}</option>
              <option>{ROLES.RESPONDENT}</option>
            </Input>
          </FormGroup>
          <Button className="float-right" disabled={!newUser || !newUser.name} onClick={addUser}>Submit</Button>
        </Form>
      </div>
    </div>

  );
};

UsersManagement.defaultProps = {
  onChangeUser: () => { },
  onAddUser: () => { },
  users: [],
};

export default UsersManagement;
