import actionTypes from './actionTypes';

export const setPrerequisites = (name, value) => ({
  type: actionTypes.IMPORT_PREREQUISITES,
  name,
  value
});

export const error = (error) => ({
  type: actionTypes.ON_ERROR,
  error
});

export const setSearch = (search) => ({
  type: actionTypes.ON_INPUT_SEARCH,
  search
});

export const storeCache = (name, cache) => ({
  type: actionTypes.ON_STORE_CACHE,
  name,
  cache 
})