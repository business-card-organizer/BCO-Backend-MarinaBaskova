const router = require('express').Router();
const db = require('./users-model');
const bcrypt = require('bcryptjs');

// >>>>> /api/user/

router.get('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();

	try {
		const user = await db.findById(userID);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'User with specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({ message: `User request failed ${error.message}.` });
	}
});

// update user
router.put('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { username, password, firstName, lastName, organization, jobTitle, email, phone } = req.body;

	const user = {};
	if (username) {
		user.username = username;
	}
	if (password) {
		user.password = bcrypt.hashSync(password, 10);
	}
	if (firstName) {
		user.first_name = firstName;
	}
	if (lastName) {
		user.last_name = lastName;
	}
	if (organization) {
		user.organization = organization;
	}
	if (jobTitle) {
		user.job_title = jobTitle;
	}
	if (email) {
		user.email = email;
	}
	if (phone) {
		user.phone = phone;
	}
	try {
		const userToUpdate = await db.update(user, userID);
		if (userToUpdate) {
			res.status(200).json(userToUpdate);
		} else {
			res.status(404).json({
				message: 'The user with the specified ID does not exist.'
			});
		}
	} catch (error) {
		res.status(500).json({
			message: `The user's information could not be modified: ${error.message}.`
		});
	}
});

//delete
router.delete('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();

	try {
		const deletedUser = await db.remove(userID);
		if (deletedUser) {
			// res.status(204).end();
			res.status(200).json(deletedUser);
		} else {
			res.status(404).json({ message: 'The user with the specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({
			message: `The user's information could not be modified: ${error.message}.`
		});
	}
});

module.exports = router;
