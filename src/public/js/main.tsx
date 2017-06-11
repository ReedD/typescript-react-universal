import { App } from 'components/app';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

declare const __PRELOADED_STATE__: any;
const store = configureStore(__PRELOADED_STATE__);

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
