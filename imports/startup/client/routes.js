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
import RegisterPage from '../../ui/pages/RegisterPage';
import ForgotPasswordPage from '../../ui/pages/ForgotPasswordPage';
import NewPasswordPage from '../../ui/pages/NewPasswordPage';
import MyAccountPage from '../../ui/pages/MyAccountPage';

const history = createHistory();

const routes = (
  <Router history={history}>
    <MainLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (Meteor.userId() ? <Redirect to="/home" /> : <Redirect to="/login" />)}
        />
        <Route
          exact
          path="/home"
          render={() => (Meteor.userId() ? <HomePage /> : <Redirect to="/login" />)}
        />
        <Route
          exact
          path="/login"
          render={() => (Meteor.userId() ? <Redirect to="/" /> : <LoginPage />)}
        />
        <Route
          exact
          path="/register"
          render={() => (Meteor.userId() ? <Redirect to="/" /> : <RegisterPage />)}
        />
        <Route
          exact
          path="/forgot-password"
          render={() => (Meteor.userId() ? <Redirect to="/" /> : <ForgotPasswordPage />)}
        />
        <Route exact path="/new-password/:token" render={props => <NewPasswordPage {...props} />} />
        <Route
          exact
          path="/my-account"
          render={() => (Meteor.userId() ? <MyAccountPage /> : <Redirect to="/login" />)}
        />
      </Switch>
    </MainLayout>
  </Router>
);

Meteor.startup(() => {
  render(routes, document.querySelector('.react-root'));
});
