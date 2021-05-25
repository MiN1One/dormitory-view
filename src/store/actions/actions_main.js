import actionTypes from './actionTypes';

export const setPrerequisites = (name, value) => ({
  type: actionTypes.IMPORT_PREREQUISITES,
  name,
  value
});