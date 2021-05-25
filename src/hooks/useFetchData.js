import { useEffect, useState } from 'react';
import axios from '../axios';

/**
* @param {object} options - Parameters
* @param {string} options.url - Request URL
* @param {string} options.method - HTTP Method
* @param {function} options.cb - Callback to run after request is seccussful
* @param {object} options.body - Request body
*/

const STATE = {};

const REDUCER = () => {

};

const useFetchData = ({ url, method, body, cb }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = () => {

  };

  useEffect(() => {
    setError(null);
    setLoading(true);
    axios({
      url: url,
      method: method.toUpperCase()
    }, body && body)
    .then(({ data }) => {
      setData(data);
      setLoading(false);
      cb && cb();
    })
    .catch((er) => {
      console.error(er);
      setError(er);
      setLoading(null);
    });
  }, [url, method, body, cb]);

  return {
    data,
    error,
    loading
  }
};

export default useFetchData;