import { App } from 'components/app';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { render } from 'react-dom';
import { IApplicationState } from 'reducers';
import configureStore from 'store/configureStore';

declare const __PRELOADED_STATE__: IApplicationState;
const history = createBrowserHistory();
const store = configureStore(history, __PRELOADED_STATE__);

render(
  <App store={store} history={history} userAgent={navigator.userAgent} />,
  document.getElementById('root'),
  () => {
    const ssStyles = document.getElementById('server-side-styles');
    ssStyles.parentNode.removeChild(ssStyles);
  },
);
