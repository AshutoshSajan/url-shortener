require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var chalk = require('chalk');
var sequelize = require('./config/database');
var session = require('express-session');
var User = require('./model/User');
var Store = require('./model/Store');
var Url = require('./model/Url');
var flash = require('connect-flash');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var apiRouter = require('./routes');

var app = express();

// using express session for authentication and authorization
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);

app.use(flash());

// DB testing
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// synchronizing the db
sequelize
  .sync({
    logging: console.log,
    force: true,
  })
  .then(async () => {
    const store = await Store.create({});
    const adminUserDetails = JSON.parse(process.env.ADMIN_USER);

    // create admin user
    User.create(adminUserDetails).then(async (user, err) => {
      if (user) {
        console.log(
          chalk.green.bold(
            'Connection to database is established successfully...'
          )
        );
        console.log(chalk.blue.bold('Admin user created...'));
        await Store.update(
          { UserId: user.id },
          {
            where: {
              id: store.id,
            },
          }
        );
      } else if (err) {
        return console.error(chalk.red.bold('Error creating admin user...'));
      }
    });
  })
  .catch((err) =>
    console.error(chalk.red.bold('Unable to connect to the database' + err))
  );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', (req, res) => {
  User.findOne({ email: req.body.email }).then((user, err) => {
    if (user) {
      res.status(200).json(user);
    } else if (err) {
      res.json({ err, msg: 'server error' });
    }
  });
});

app.use('/api/v1/stores/:id', (req, res) => {
  const { id } = req.params;

  Store.findOne(id, { include: ['UserId'] }).then((store, err) => {
    if (store) {
      res.status(200).json(store);
    } else if (err) {
      res.json({ err, msg: 'server error' });
    }
  });
});

app.use('/', apiRouter);

app.post('/urls', async (req, res) => {
  let url = {
    url: req.body.url,
    slug: req.body.slug,
  };

  try {
    if (!req.body.url.startsWith('https://')) {
      res.send({ err: 'urls http protocol not available' });
    }
    const newUrl = await Url.create(url);
    res.render('home', { msg: 'url create', err: '' });
  } catch (err) {
    console.error(err.message, 'catch err...');
    res.render('home', { msg: '', err: 'url already in use' });
  }
});

app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  Url.findOne({ slug }).then((url, err) => {
    if (err) {
      res.send({ err, msg: 'server error' });
    } else if (url) {
      return res.redirect(url.url);
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
