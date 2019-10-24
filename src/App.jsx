import React, { Suspense } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  saveIsLoggedInCookie,
  isLoggedInCookie,
  clearIsLoggedInCookie,
} from './helpers/universalCookie';

import AppErrorBoundary from './components/Common/AppErrorBoundary';
import ArticleViewer from './components/Common/ArticleViewer';
import ArticleEditor from './components/Common/ArticleEditor';

import hasAuthenticatedContext from './components/Account/AuthenticationContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import ArticlesList from './components/Tabs/Home/ArticlesList';
import ComposeArticleForm from './components/Tabs/ComposeArticle/ComposeArticleForm';

import LoginPage from './components/Account/LoginPage';
import SignUpForm from './components/Account/SignUpForm';

import './App.css';

function AppLayout() {
  return (
    <>
      <Route path='/' component={Header} />

      <main>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignUpForm} />

        <Route exact path='/newarticle' component={ComposeArticleForm} />
        <Route path='/editarticles/:id' component={ArticleEditor} />
        <Route path='/articles/:id' component={ArticleViewer} />

        <Route exact path='/' component={ArticlesList} />
      </main>

      <Route path='/' component={Footer} />
    </>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <AppLayout />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.setAppLogInState = () => {
      saveIsLoggedInCookie();
      this.setState({ isLoggedIn: true });
    };

    this.setAppLogOutState = () => {
      clearIsLoggedInCookie();
      this.setState({ isLoggedIn: false });
    };

    this.state = {
      isLoggedIn: isLoggedInCookie(),
      setAppLogInState: this.setAppLogInState,
      setAppLogOutState: this.setAppLogOutState,
    };
  }

  render() {
    const { isLoggedIn, setAppLogInState, setAppLogOutState } = this.state;

    return (
      <AppErrorBoundary>
        <hasAuthenticatedContext.Provider
          value={{
            isLoggedIn,
            setAppLogInState,
            setAppLogOutState,
          }}
        >
          <AppRouter />
        </hasAuthenticatedContext.Provider>
      </AppErrorBoundary>
    );
  }
}
