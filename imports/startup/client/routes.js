import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route, Router, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import MainLayout from '../../ui/layouts/MainLayout';

const history = createHistory();

const routes = (
  <Router history={history}>
    <MainLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Header as="h1" textAlign="center">
              Meteor Base App Project
            </Header>
          )}
        />
      </Switch>
    </MainLayout>
  </Router>
);

Meteor.startup(() => {
  render(routes, document.querySelector('.react-root'));
});
