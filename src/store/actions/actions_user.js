import actionTypes from './actionTypes';

export const login = (user, token) => ({
  type: actionTypes.ON_LOG_IN_OUT,
  user,
  token
});

export const editFavorites = (list) => ({
  type: actionTypes.ON_EDIT_FAVORITES,
  list
});

export const setAuthStatus = (data) => ({
  type: actionTypes.ON_SET_AUTH,
  user: data?.user,
  token: data?.token
});