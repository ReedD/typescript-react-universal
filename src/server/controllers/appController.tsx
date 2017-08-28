import * as cleancss from 'clean-css';
import { App } from 'containers/App';
import { RequestHandler } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry, SheetsRegistryProvider } from 'react-jss';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'store/configureStore';
// import { createMemoryHistory } from 'history';

export const index: RequestHandler = (req, res) => {
  // Create a new Redux store instance
  // const history = createMemoryHistory({
  //   initialEntries: [req.url],
  // });
  const sheets = new SheetsRegistry();

  // Render the component to a string
  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );

  const { styles } = new cleancss().minify(sheets.toString());

  // Grab the initial state from our Redux store
  const finalState = {}; // store.getState();

  res.render('app', {
    html,
    preloadedState: finalState,
    styles,
  });
};
