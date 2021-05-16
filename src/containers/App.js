import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router';

import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import Scrollbar from '../components/UI/Scrollbar/Scrollbar';
import ErrorView from '../components/ErrorView/ErrorView';

const AsyncHeader = React.lazy(() => import('./Header/Header'));
const AsyncAuth = React.lazy(() => import('./Auth/Auth'));
const AsyncProfile = React.lazy(() => import('./Profile/Profile'));
const AsyncListview = React.lazy(() => import('./Listview/Listview'));
const AsyncAdview = React.lazy(() => import('./Adview/Adview'));
const AsyncPost = React.lazy(() => import('./Post/Post'));

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

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
              <AsyncHeader />
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