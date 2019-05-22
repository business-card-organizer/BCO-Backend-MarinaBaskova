const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./routes/users-router.js');
const authRouter = require('../auth/auth-router.js');
const eventsRouter = require('./routes/events-router.js');
const cardsRouter = require('./routes/cards-router.js');

const restricted = require('../auth/restricted-mw.js');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World' });
});

server.use('/api/user', restricted, userRouter);
server.use('/api/events', restricted, eventsRouter);
server.use('/api/cards', restricted, cardsRouter);
server.use('/api/auth', authRouter);

module.exports = server;
