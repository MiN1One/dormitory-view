import { useCallback, useReducer, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import axios from 'axios';
import { FaGalacticSenate } from 'react-icons/fa';

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

const useFetchData = (options = {
  loading: false
}) => {
  STATE.loading = options.loading;
  const [httpData, dispatch] = useReducer(reducer, STATE);
  // const reduxDispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const token = user?.token;

  const makeRequest = useCallback((options) => {
    dispatch({ type: 'start' });

    const axiosConf = {
      // url: `/${options.url}`,
      url: `http://localhost:3005/${options.url}`,
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
        console.log(data);

        if (options?.dataSecondary) {
          const main = { ...data };
          options.dataAt?.forEach((el) => data = data[el]);
          
          data = {
            [options.dataSecondary]: main[options.dataSecondary],
            data: [...data]
          };
        } else {
          options?.dataAt?.forEach((el) => data = data[el]);
        }

        dispatch({ type: 'resolve', data });
        
        // do not use callbacks with useEffect to manipulate data
        options.callback && options.callback();
      })
      .catch((er) => {
        if (er.response) {
          console.log(er.response.status);
        } else {
          er.status = 500;
        }

        dispatch({ type: 'reject', error: er });
        console.log(er.response && er.response);
      });

  }, [token]);

  return {
    data: httpData.data,
    error: httpData.error,
    loading: httpData.loading,
    makeRequest,
    setData: (data) => dispatch({ type: 'resolve', data })
  };
};

export default useFetchData;