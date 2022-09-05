require('express-async-errors');
const startup = require('./functions/startup')();
const { dbConnect } = require('./middlewares/dbConnection');
const { createAdmin } = require('./middlewares/createAdmin');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Logger
const logger = require('./functions/logger');

// Routers
const auth = require('./routes/auth');
const logout = require('./routes/logout');
const register = require('./routes/register');
const search = require('./routes/search');
const update = require('./routes/update');
const upgrade = require('./routes/upgrade');
const user = require('./routes/user');

// Port
const port = process.env.PORT || 3001;

// MongoDB connection
dbConnect(process.env.DB_HOST);

// MongoDB admin check
createAdmin();

// Express config
app.use(bodyParser.json());
const corsConfig = {
    origin: true,
    credentials: true,
}
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// Routes
app.get('/', (req, res) => {
	return res.status(200).send('Welcome to mongodb-server!');
})
app.use('/auth', auth);
app.use('/logout', logout);
app.use('/register', register);
app.use('/search', search);
app.use('/update', update);
app.use('/upgrade', upgrade);
app.use('/user', user);

// 404 handler
app.use((req, res) => {
    res.sendStatus(404);
});

//  Error handler
app.use(errorHandler);

app.listen(port, logger.info(`MongoDB Server running on port ${port}`));