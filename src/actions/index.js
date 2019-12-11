import {
  SET_USER_ID,
  ADD_USER,
} from '../constants';

export const setUserId = (id) => {
  return {
    type: SET_USER_ID,
    id,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};
