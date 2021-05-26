import { useCallback, useEffect, useReducer, useState } from 'react';
import axios from '../axios';

const STATE = {
  loading: false,
  data: null,
  error: null
};

const reducer = (state, action) => {
  switch (action.type.toUpperCase()) {
    case 'START':
      return { ...state, loading: true, error: null };
    case 'RESOLVE':
      return { 
        ...state, 
        data: action.data, 
        loading: false,
        error: null
      }
    case 'REJECT':
      return { ...state, loading: false, error: action.error };
    default: 
      return state;
  }
};

const useFetchData = () => {
  const [httpData, dispatch] = useReducer(reducer, STATE);

  const makeRequest = useCallback((options) => {
    dispatch({ type: 'start' });
    axios({
      url: options.url,
      method: options?.method?.toUpperCase() || 'GET',
    }, options.body && options.body)
    .then(({ data }) => {
      options.dataAt?.forEach((el) => data = data[el]);
      dispatch({ type: 'resolve', data });
    })
    .catch((er) => {
      dispatch({ type: 'resolve', error: er });
      console.error(er);
    });
  }, []);

  return {
    data: httpData.data,
    error: httpData.error,
    loading: httpData.loading,
    makeRequest
  }
};

export default useFetchData;