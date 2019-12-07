import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Button, Modal, Form, FormGroup, Label, Input,
} from 'reactstrap';

const ROLES = {
  OWNER: 'OWNER',
  USER: 'USER',
  RESPONDENT: 'RESPONDENT',
};


const UsersManagement = ({ }) => {
  const [createUserModal, setCreateUserModal] = useState(false);

  const toggleCreateUserModal = () => { setCreateUserModal(currentState => !currentState); };

  return (
    <div className="UsersManagement p-3">
      <Button onClick={toggleCreateUserModal}>Create new user</Button>
      <Modal isOpen={createUserModal} toggle={toggleCreateUserModal}>
        <div className="p-3">
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" placeholder="Select a name..." />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Role</Label>
              <Input type="select" name="role" id="role">
                <option>{ROLES.OWNER}</option>
                <option>{ROLES.USER}</option>
                <option>{ROLES.RESPONDENT}</option>
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </Modal>

    </div>
  );
};

UsersManagement.defaultProps = {
  onChange: () => { },
  options: [],
};

export default UsersManagement;
