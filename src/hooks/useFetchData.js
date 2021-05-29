import { useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import axios from 'axios';

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
  const reduxDispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const token = user?.token;

  const makeRequest = useCallback((options) => {
    dispatch({ type: 'start' });
    reduxDispatch(actions.error(null));
    console.log(token)

    const axiosConf = {
      url: `http://localhost:3005/api${options.url}`,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: options?.method?.toUpperCase() || 'GET',
    };

    if (options.body) 
      axiosConf['data'] = options.body;

    axios(axiosConf)
      .then(({ data }) => {
        options.dataAt?.forEach((el) => data = data[el]);
        dispatch({ type: 'resolve', data });

        // do not use callbacks with useEffect
        options.callback && options.callback();
      })
      .catch((er) => {
        dispatch({ type: 'reject', error: er });
        console.error(er);

        if (er.response) {
          console.log(er.response.status);
          reduxDispatch(actions.error(er.response));
        } else {
          er.status = 500;
          reduxDispatch(actions.error(er));
        }
      });

    console.log(axiosConf);

  }, [reduxDispatch, token]);

  return {
    data: httpData.data,
    error: httpData.error,
    loading: httpData.loading,
    makeRequest
  }
};

export default useFetchData;