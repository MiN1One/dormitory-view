import React from 'react';
import { Route, Switch } from 'react-router';

import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

const AsyncHeader = React.lazy(() => import('../containers/Header/Header'));
const AsyncAuth = React.lazy(() => import('../containers/Auth/Auth'));

function App() {
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