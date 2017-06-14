import * as cleancss from 'clean-css';
import { App } from 'containers/App';
import { RequestHandler } from 'express';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry, SheetsRegistryProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { IApplicationState } from 'reducers';
import configureStore from 'store/configureStore';

export const index: RequestHandler = (req, res) => {
  // Compile an initial state
  const preloadedState: IApplicationState = {};

  // Create a new Redux store instance
  const history = createMemoryHistory({
    initialEntries: [req.url],
  });
  const store = configureStore(history, preloadedState);
  const sheets = new SheetsRegistry();

  // Render the component to a string
  const html = renderToString(
    <SheetsRegistryProvider registry={sheets}>
      <App
        history={history}
        store={store}
        userAgent={req.headers['user-agent'] || 'all'}
      />
    </SheetsRegistryProvider>,
  );

  const { styles } = new cleancss().minify(sheets.toString());

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  res.render('app', {
    html,
    preloadedState: finalState,
    styles,
  });
};
