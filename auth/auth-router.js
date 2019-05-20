const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../api/routes/users-model.js');
const secret = process.env.SECRET;

// >>>>> /api/auth

router.post('/register', async (req, res) => {
	let newUser = req.body;
	if (
		!newUser.hasOwnProperty('username') ||
		!newUser.hasOwnProperty('password') ||
		!newUser.hasOwnProperty('firstName') ||
		!newUser.hasOwnProperty('lastName')
	) {
		res.status(401).json({ error: 'Please provide name and password and department for the user' });
	} else {
		const hash = bcrypt.hashSync(newUser.password, 8);
		newUser.password = hash;
		try {
			const addedUser = await db.create({
				username: newUser.username,
				password: newUser.password,
				first_name: newUser.firstName,
				last_name: newUser.lastName,
				unique_code: Math.random().toString(36).substring(7)
			});
			if (addedUser) {
				const token = generateToken(addedUser);
				res.status(201).json({
					message: `Welcome ${addedUser.username}!`,
					token,
					userID: addedUser.id,
					uniqueCode: addedUser.uniqueCode
				});
			}
		} catch (error) {
			res.status(500).json({ message: `The was an error while adding new user ${error.message}.` });
		}
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(401).json({ message: 'Please enter valid credentials.' });
	} else {
		try {
			const user = await db.findByUser(username);
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(201).json({
					message: `Welcome ${user.username}!`,
					token,
					userID: user.id,
					uniqueCode: user.unique_code
				});
			} else {
				res.status(401).json({ message: 'Username or password is incorrect.' });
			}
		} catch (error) {
			res.status(500).json({ message: `Login failed ${error.message}.` });
		}
	}
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: '7d'
	};

	return jwt.sign(payload, secret, options);
}

module.exports = router;
