import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';

import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import ErrorView from '../components/ErrorView/ErrorView';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const AsyncMainPage = React.lazy(() => import('./MainPage/MainPage'));
const AsyncAuth = React.lazy(() => import('./Auth/Auth'));
const AsyncProfile = React.lazy(() => import('./Profile/Profile'));
const AsyncListview = React.lazy(() => import('./Listview/Listview'));
const AsyncAdview = React.lazy(() => import('./Adview/Adview'));
const AsyncPost = React.lazy(() => import('./Post/Post'));

function App() {
  const location = useLocation();
  const { t, ready } = useTranslation('regions', { useSuspense: false });
  const { regions, error } = useSelector(state => state.main);
  const dispatch = useDispatch();

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

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    // dispatch(actions.error(null));
  }, [location.pathname, dispatch]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/auth/:type" exact>
          <AsyncAuth />
        </Route>
        <Route path="*">
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <AsyncMainPage />
            </Route>
            <Route path="/post/:type" exact>
              <AsyncPost />
            </Route>
            <Route path="/:city/:region/:apt" exact>
              <AsyncAdview />
            </Route>
            <Route path="/:city/:region" exact>
              <AsyncListview />
            </Route>
            <Route path="/myprofile" exact>
              <AsyncProfile />
            </Route>
            <Route path="*">
              <ErrorView />
            </Route>
          </Switch>
          <Footer />
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default App;