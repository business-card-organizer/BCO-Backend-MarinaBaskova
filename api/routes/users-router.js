const router = require('express').Router();
const db = require('./users-model');
const bcrypt = require('bcryptjs');

// >>>>> /api/users

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await db.findById(id);
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
router.put('/:id', async (req, res) => {
	const { username, password, firstName, lastName, organization, jobTitle, email, phone } = req.body;
	const user = {
		username,
		password: bcrypt.hashSync(password, 10),
		first_name: firstName,
		last_name: lastName,
		organization,
		job_title: jobTitle,
		email,
		phone
	};
	try {
		const userToUpdate = await db.update(user, req.params.id);
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
router.delete('/:id', async (req, res) => {
	try {
		const deletedUser = await db.remove(req.params.id);
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
