import * as cleancss from 'clean-css';
import * as Express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry, SheetsRegistryProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { App } from '../../common/components/app';
import configureStore from '../../common/store/configureStore';

export const index = (req: Express.Request, res: Express.Response) => {
  // Compile an initial state
  const preloadedState = {
    browser: { userAgent: req.headers['user-agent'] || null },
  };

  // Create a new Redux store instance
  const store = configureStore(preloadedState);
  const sheets = new SheetsRegistry();

  // Render the component to a string
  const html = renderToString(
    <SheetsRegistryProvider registry={sheets}>
      <Provider store={store}>
        <App />
      </Provider>
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
