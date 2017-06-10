import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from '../../common/components/app';
import configureStore from '../../common/store/configureStore';

const preloadedState = (window as any).__PRELOADED_STATE__;
const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
  () => {
    const ssStyles = document.getElementById('server-side-styles');
    ssStyles.parentNode.removeChild(ssStyles);
  },
);
