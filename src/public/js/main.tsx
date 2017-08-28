import { App } from 'containers/App';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
  () => {
    const ssStyles = document.getElementById('server-side-styles');
    ssStyles.parentNode.removeChild(ssStyles);
  },
);
