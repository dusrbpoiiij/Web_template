const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

const app = express();

// Config.env to ./config/config.evn
require('dotenv').config({
  path: './config/config.env'
});

// Connect DB 
connectDB();

// Config BodyParser 
app.use(bodyParser.json());

// Config helmet 
app.use(helmet());

// Config for only development
if(process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.CLIENT_URL
  }))

  app.use(morgan('dev'));
}

// Load all routes
const authRouter = require('./routes/auth.route');


// Use Route setting 
app.use('/api/user/', authRouter);



app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})