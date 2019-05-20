const jwt = require('jsonwebtoken');
const db = require('../api/routes/users-model.js');
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization;

		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'Invalid Credentials' });
			} else {
				// db find user by id from decodeddtoken
				// db
				// 	.findByID(decodedToken.subject)
				// 	.then((user) => {
				// 		req.user = user;
				// 		next();
				// 	})
				// 	.catch((err) => {
				// 		res.status(500).json(err);
				// 	});
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'No token provided, invalid request.' });
	}
};
