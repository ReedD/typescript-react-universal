import * as compression from 'compression';
import * as express from 'express';
import * as minifyHTML from 'express-minify-html';
import * as passport from 'passport';
import * as path from 'path';
import './config/passport';
import * as userController from './controllers/api/userController';
import * as appController from './controllers/appController';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(
    minifyHTML({
      exception_url: false,
      htmlMinifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      override: true,
    }),
  );
}

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/users/login', passport.authenticate('jwt'), userController.login);
app.post('/api/users', userController.create);

app.get('/', appController.index);
app.get('/about', appController.index);
app.get('/signup', appController.index);
app.get('/login', appController.index);

app.listen(3000);
