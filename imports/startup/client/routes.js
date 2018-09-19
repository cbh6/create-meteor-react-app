import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route, Router, Switch } from 'react-router-dom';

import MainLayout from '../../ui/layouts/MainLayout';

const history = createHistory();

const routes = (
  <Router history={history}>
    <MainLayout>
      <Switch>
        <Route exact path="/" render={() => <h1>Meteor Base Project</h1>} />
      </Switch>
    </MainLayout>
  </Router>
);

Meteor.startup(() => {
  render(routes, document.querySelector('.react-root'));
});
