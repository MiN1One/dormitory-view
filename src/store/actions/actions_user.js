import actionTypes from './actionTypes';

export const login = (user) => ({
  type: actionTypes.ON_LOG_IN_OUT,
  user
});

export const editFavorites = (list) => ({
  type: actionTypes.ON_EDIT_FAVORITES,
  list
});