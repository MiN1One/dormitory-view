import { useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';
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
        data: action.data, 
        loading: false,
        error: null
      }
    case 'REJECT':
      return { ...state, loading: false, error: action.error };
      
    default: return state;
  }
};

const useFetchData = (options = {
  loading: false
}) => {
  STATE.loading = options.loading;
  const [httpData, dispatch] = useReducer(reducer, STATE);
  const { token } = useSelector(state => state.user);
  
  const setData = (data) => dispatch({ type: 'resolve', data });

  const makeRequest = useCallback((options) => {
    dispatch({ type: 'start' });

    const axiosConf = {
      url: `/${options.url}`,
      withCreditentials: true,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      method: options?.method?.toUpperCase() || 'GET',
    };

    console.log(token);

    if (token)
      axiosConf.headers['Authorization'] = `Bearer ${token}`;

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
        
        options.callback && options.callback(data, setData);
      })
      .catch((er) => {
        if (er.response) {
          console.log(er.response.status);
          er.message = er.response.data.message;
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
    setError: useCallback((error) => dispatch({ type: 'reject', error }), []),
    setData: useCallback(setData, [])
  };
};

export default useFetchData;