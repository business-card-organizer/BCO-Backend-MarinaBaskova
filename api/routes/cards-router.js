const router = require('express').Router();
const db = require('./cards-model.js');
const eventDB = require('./events-model.js');

// >>>>> /api/cards/

router.get('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();

	try {
		const cards = await db.findAll(userID);
		if (cards.length > 0) {
			res.status(200).json(cards);
		} else {
			res.status(404).json({ message: 'User does not have any existing cards.' });
		}
	} catch (error) {
		res.status(500).json({ message: `Cards request failed ${error.message}.` });
	}
});

router.get('/:id', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { id } = req.params;
	try {
		const card = await db.findById(id, userID);
		if (card) {
			res.status(200).json(card);
		} else {
			res.status(404).json({ message: 'Card with specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({ message: `Cards request failed ${error.message}.` });
	}
});

router.post('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { firstName, lastName, organization, jobTitle, email, phone, eventId } = req.body;
	if (!firstName || !lastName || !organization || !jobTitle || !email || !phone) {
		res.status(401).json({
			message:
				'Please do not leave firstName,lastName, organization, jobTitle, email or phone of the card fields blank.'
		});
	} else {
		try {
			let userEvent;
			if (eventId) {
				userEvent = await eventDB.findById(eventId, userID);
			} else {
				userEvent = null;
			}
			try {
				const newCard = await db.create({
					first_name: firstName,
					last_name: lastName,
					organization: organization,
					job_title: jobTitle,
					email: email,
					phone: phone,
					event_id: userEvent.id,
					user_id: userID
				});
				if (newCard) {
					res.status(201).json(newCard);
				}
			} catch (error) {
				res.status(500).json({ message: `Your card could not be posted ${error.message}.` });
			}
		} catch (error) {
			res.status(500).json({ message: `Your card could not be posted ${error.message}.` });
		}
	}
});

router.put('/:id', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { id } = req.params;
	const { firstName, lastName, organization, jobTitle, email, phone, eventId } = req.body;
	try {
		let userEvent;
		if (eventId) {
			userEvent = await eventDB.findById(eventId, userID);
		} else {
			userEvent = null;
		}
		try {
			const card = await db.findById(id, userID);
			if (card) {
				const cardUpdate = { user_id: userID };
				if (firstName) {
					cardUpdate.first_name = firstName;
				}
				if (lastName) {
					cardUpdate.last_name = lastName;
				}
				if (organization) {
					cardUpdate.organization = organization;
				}
				if (jobTitle) {
					cardUpdate.job_title = jobTitle;
				}
				if (email) {
					cardUpdate.email = email;
				}
				if (phone) {
					cardUpdate.phone = phone;
				}
				if (eventId) {
					cardUpdate.event_id = userEvent.id;
				}
				try {
					const editedCard = await db.update(cardUpdate, id);
					if (editedCard) {
						res.status(200).json(editedCard);
					} else {
						res.status(404).json({
							message: 'The event with the specified ID does not exist.'
						});
					}
				} catch (error) {
					res.status(500).json({
						message: `The events's information could not be modified: ${error.message}.`
					});
				}
			} else {
				res.status(401).json({
					message: `The card with the specified ID does not exist.`
				});
			}
		} catch (error) {
			res.status(500).json({
				message: `Card updated failed ${error.message}.`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: `Card updated failed ${error.message}.`
		});
	}
});

router.delete('/:id', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { id } = req.params;
	try {
		const deletedCard = await db.remove(id, userID);
		if (deletedCard) {
			res.status(204).end();
			// res.status(200).json(deletedCard);
		} else {
			res.status(404).json({ message: 'The card with the specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({
			message: `The card's information could not be modified: ${error.message}.`
		});
	}
});

module.exports = router;
