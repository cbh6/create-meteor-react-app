import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import {
  Route, Router, Switch, Redirect,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import MainLayout from '../../ui/layouts/MainLayout';
import HomePage from '../../ui/pages/HomePage';
import LoginPage from '../../ui/pages/LoginPage';

const history = createHistory();

const routes = (
  <Router history={history}>
    <MainLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (Meteor.userId() ? <HomePage /> : <Redirect to="/login" />)}
        />
        <Route
          exact
          path="/login"
          render={() => (Meteor.userId() ? <Redirect to="/" /> : <LoginPage />)}
        />
      </Switch>
    </MainLayout>
  </Router>
);

Meteor.startup(() => {
  render(routes, document.querySelector('.react-root'));
});
