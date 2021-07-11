import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import ErrorView from '../components/ErrorView/ErrorView';
import * as actions from '../store/actions';
import useFetchData from '../hooks/useFetchData';
import axios from 'axios';
import ProtectedRoute from '../hoc/ProtectedRoute';

const AsyncMainPage = React.lazy(() => import('./MainPage'));
const AsyncAuth = React.lazy(() => import('./Auth'));
const AsyncProfile = React.lazy(() => import('./Profile'));
const AsyncListview = React.lazy(() => import('./Listview'));
const AsyncAdview = React.lazy(() => import('./Adview'));
const AsyncPost = React.lazy(() => import('./Post'));

function App() {
  const location = useLocation();
  const { t, ready } = useTranslation('regions', { useSuspense: false });
  const { main: { regions }, user: { user } } = useSelector(s => s);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const { data, makeRequest } = useFetchData();

  useEffect(() => mounted.current = true, []);

  if (!mounted.current) {
    axios.get('/api/users/status', {
      withCredentials: true
    }).then(({ data }) => {
      setLoading(false);
      dispatch(actions.setAuthStatus(data));
    }).catch((e) => {
      console.error(e);
      setLoading(false);
      dispatch(actions.setAuthStatus(null));
    });
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const translatedList = {};
    if (ready) {
      for (let key in regions) {
        translatedList[key] = {
          regions: regions[key].regions,
          translated: {
            city: t(`regions:${key}.title`),
            regions: regions[key].regions.map(reg => t(`regions:${key}.regions.${reg}`))
          }
        }
      }
      dispatch(actions.setPrerequisites('regions', translatedList));
    }
  }, [t, dispatch, ready]);

  const groupRegions = useCallback((list) => {
    let regions = list.map(el => el.region);

    const newList = {};
    regions = regions.filter((el, i) => regions.indexOf(el) === i);

    regions.forEach(r => {
      newList[r] = { data: [] };
      data.forEach(d => {
        if (d.region === r) {
          newList[r].city = d.city;
          newList[r].data.push(d);
        }
      });
    });

    dispatch(actions.setPrerequisites('popular', newList));
  }, [data, dispatch]);

  useEffect(() => {
    makeRequest({
      url: 'api/apartments?limit=50&project=price,imageCover,offers,region,city,_id,title&sort=-numberOfViews',
      dataAt: ['data', 'docs']
    });
  }, [makeRequest]);

  useEffect(() => {
    data && groupRegions(data);
  }, [data, groupRegions]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {loading 
        ? <h1>Checking auth</h1>
        : (
          <Switch>
            {!user && (
              <Route path="/auth">
                <AsyncAuth />
              </Route>
            )}
            <Route path="*">
              <Navigation />
              <Switch>
                <Route path="/" exact>
                  <AsyncMainPage />
                </Route>
                <ProtectedRoute path="/post/:type" exact>
                  <AsyncPost />
                </ProtectedRoute>
                <Route path="/list/:city/:region/:apt" exact>
                  <AsyncAdview />
                </Route>
                <Route path="/list/:city/:region" exact>
                  <AsyncListview />
                </Route>
                <ProtectedRoute path="/user/myprofile/:section" exact>
                  <AsyncProfile />
                </ProtectedRoute>
                <Route path="*">
                  <ErrorView />
                </Route>
              </Switch>
              <Footer />
            </Route>
          </Switch>
      )}
      <button onClick={() => {
        axios('/api/users/logout', {
          withCredentials: true
        })
          .then(() => {
            dispatch(actions.setAuthStatus(null));
          })
          .catch(e => console.error(e));
      }}>
        LOGOUT
      </button>
    </React.Suspense>
  );
}

export default App;