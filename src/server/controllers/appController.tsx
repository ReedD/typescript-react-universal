import * as cleancss from 'clean-css';
import { App } from 'containers/App';
import * as Debug from 'debug';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'store/configureStore';
import { sheetsRegistry } from 'styles';

const debug = Debug('app:controller');

// import { createMemoryHistory } from 'history';

const router = new Router();

router.get('/*', async (ctx, next) => {
  debug(`GET to ${ctx.path}`);
  // Create a new Redux store instance
  // const history = createMemoryHistory({
  //   initialEntries: [req.url],
  // });

  sheetsRegistry.reset();

  // Render the component to a string
  const splitPoints: string[] = [];
  const context = {
    splitPoints,
  };
  const html = renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <App />
    </StaticRouter>,
  );
  debug('React components SSR');
  const { styles } = new cleancss().minify(sheetsRegistry.toString());
  debug('CSS generated');

  // Grab the initial state from our Redux store
  const finalState = {}; // store.getState();

  await ctx.render('app', {
    html,
    preloadedState: finalState,
    splitPoints,
    styles,
  });
  debug('Pug rendered');
  debug('GET complete');
});

export default compose([router.routes(), router.allowedMethods()]);
