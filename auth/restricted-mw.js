const jwt = require('jsonwebtoken');
const db = require('../api/routes/users-model.js');
const secret = process.env.SECRET || 'testing';

module.exports = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization;

		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'Invalid Credentials' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'No token provided, invalid request.' });
	}
};
