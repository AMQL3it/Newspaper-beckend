// External Imports
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

// Internal Imports
const DB = require('./databases/modelsAutoLoader');
const adminRouter = require('./routes/adminRouter');
const loginRouter = require('./routes/loginRouter');
//const membersRouter = require('./routes/membersRouter');
const Error = require('./middlewares/common/errorHandler');

const app = express();
dotenv.config();

// Database connection
DB.connectToDatabase();
DB.modelsAutoLoader();


// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use('/',loginRouter);
app.use('/admin', adminRouter);
//app.use('/members', membersRouter);

// 404 not found handler
app.use(Error.notFoundHandler);

// Default error handler
app.use(Error.errorHandler)

// App starting point
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening to port: ${port}`);
});
