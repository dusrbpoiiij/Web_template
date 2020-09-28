import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// redux 
import {Provider} from 'react-redux';
import store from './data/store';
import { ToastContainer } from 'react-toastify';

// Component
import Header from './screens/header/header';
import Home from './screens/Home/home';
import Footer from './screens/footer/footer'
import Register from './screens/user/register';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component = {Home} />
        <Route exact path='/register' component = {Register} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

