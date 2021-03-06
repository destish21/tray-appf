const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
// const dbConnection = require('./database');

const MongoStore = require('connect-mongo')(session);

const passport = require('./passport');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
// Route requires
const user = require('./routes/user');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

 // Passport
 app.use(passport.initialize());
 app.use(passport.session()); // calls the deserializeUser

  // Routes
  app.use('/api/user', user);

const url = process.env.MONGODB_URL;
mongoose
  .connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log('Connected to Mongo');

      // Sessions
      app.use(
        session({
          secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
          store: new MongoStore({ mongooseConnection: mongoose.connection }),
          resave: false, //required
          saveUninitialized: false, //required
        })
      );

      // app.post('/api/user', (req, res) => {
      //   console.log('THE ROUTE IS HIT');
      // });

      // Starting Server
      
    },
    (err) => {
      /** handle initial connection error */
      console.log('error connecting to Mongo: ');
      console.log(err);
    }
  )
  .catch((err) => console.log({ err }));

 

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    //
    app.get('*', (req, res) => {
      res.sendfile(path.join((__dirname = 'client/build/index.html')));
    });
  }

  // build mode
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
