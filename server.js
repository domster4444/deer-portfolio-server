const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const globalErrorHandler = require('./middleware/errorMiddleware');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoute');
const connectDB = require('./config/db');
const { cloudinary } = require('./utils/cloudnary');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./utils/passport');
const authRoute = require('./routes/auth');
dotenv.config();
// connect to the database
connectDB(); //? connect db
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' })); //? allow body parsing
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//? routes
app.get('/', (req, res) => {
  res.send('application server working fine');
});

//!___ provide url to access the image by cloudinary
// configure routes
app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(
      fileStr,
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: 'Error uploading file',
            error: err,
          });
        } else {
          //! -------SERVER GETS "IMAGE ID OBJ" FROM CLOUDINARY . store that to access later
          console.log(
            'cloudinary image object as response after upload to cloudinary'
          );
          console.log(result);
          //! ------SERVER GETS "IMAGE ID OBJ" FROM CLOUDINARY . store that to access later
          res.status(200).json({
            message: 'File uploaded successfully',
            result,
          });
        }
      }
    );
  } catch (err) {
    console.error('your error' + err);
  }
});
//!___ Cloudinary route

app.use('/api/users', userRoutes);
app.use('/account', passwordResetRoutes);

// TODO: auth
app.use('/auth', authRoute);

//?global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
