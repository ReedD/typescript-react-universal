import { preloadComponents } from 'components/AsyncComponent';
import * as Debug from 'debug';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as compose from 'koa-compose';
import * as compress from 'koa-compress';
import * as minifyHTML from 'koa-html-minifier';
import * as serve from 'koa-static';
import * as views from 'koa-views';
import * as path from 'path';
import * as zlib from 'zlib';
import './config/db';
import './config/errors';
import session from './config/session';
import userController from './controllers/api/userController';
import appController from './controllers/appController';

const debug = Debug('app');
debug('App starting');

(async () => {
  debug('Preloading all AsyncComponents');
  await preloadComponents();
  debug('AsyncComponents preloaded');
})();

const app = new Koa();

app.use(session(app));

app.use(bodyParser());

app.use(
  compress({
    filter: contentType => {
      return /text|javascript|css/i.test(contentType);
    },
    flush: zlib.Z_SYNC_FLUSH,
  }),
);

app.use(serve(path.join(__dirname, '..', 'public')));

app.use(
  views(path.join(__dirname, 'views'), {
    extension: 'pug',
    map: {
      pug: 'pug',
    },
  }),
);

if (process.env.NODE_ENV === 'production') {
  app.use(
    minifyHTML({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
    }),
  );
}

app.use(compose([appController, userController]));

app.listen(process.env.PORT || 3000, () => {
  debug(`App listening on port ${process.env.PORT || 3000}`);
});
