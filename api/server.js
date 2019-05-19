const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const userRouter = require('./routes/userRouter.js');
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World' });
});

// server.use('/api/user', userRouter);

module.exports = server;
