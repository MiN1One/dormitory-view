import actionTypes from './actionTypes';

export const login = (user) => ({
  type: actionTypes.ON_LOG_IN_OUT,
  user
});

