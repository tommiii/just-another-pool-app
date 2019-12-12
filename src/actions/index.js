import {
  SET_USER_ID,
  ADD_USER,
  UPDATE_POOLS,
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

export const updatePools = (pools) => {
  return {
    type: UPDATE_POOLS,
    pools,
  };
};
