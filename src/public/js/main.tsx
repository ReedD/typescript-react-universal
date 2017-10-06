import * as containers from 'containers';
import { App } from 'containers/App';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

declare const window;
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

const splitPoints = window.splitPoints || [];
Promise.all(
  splitPoints.map(chunk => containers[chunk].loadComponent()),
).then(() => {
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
});
