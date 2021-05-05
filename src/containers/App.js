import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router';

import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import Scrollbar from '../components/UI/Scrollbar/Scrollbar';

const AsyncHeader = React.lazy(() => import('./Header/Header'));
const AsyncAuth = React.lazy(() => import('./Auth/Auth'));
const AsyncProfile = React.lazy(() => import('./Profile/Profile'));
const AsyncListview = React.lazy(() => import('./Listview/Listview'));
const AsyncAdview = React.lazy(() => import('./Adview/Adview'));

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
              <h1>Page not found</h1>
            </Route>
          </Switch>
          <Footer />
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default App;