import React from 'react';
import './App.css';
import MainContainer from '../src/components/containers/MainContainer';
import { Provider } from 'react-redux';
import store from './redux/store/store';

function App() {
  return <Provider store={store}>
    <MainContainer />
  </Provider>
}

export default App;
