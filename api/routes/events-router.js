const router = require('express').Router();
const db = require('./events-model.js');
const bcrypt = require('bcryptjs');

// >>>>> /api/events/

router.get('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();

	try {
		const user = await db.findAll(userID);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'Event with specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({ message: `Event request failed ${error.message}.` });
	}
});

router.get('/:id', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { id } = req.params;
	try {
		const event = await db.findById(id, userID);
		if (event) {
			res.status(200).json(event);
		} else {
			res.status(404).json({ message: 'Event with specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({ message: `Event request failed ${error.message}.` });
	}
});

router.post('/', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { eventName, city } = req.body;
	if (!eventName || !city) {
		res.status(401).json({ message: 'Please do not leave any of the event fields blank.' });
	} else {
		try {
			const newEvent = await db.create({
				event_name: eventName,
				city,
				user_id: userID
			});
			if (newEvent) {
				res.status(201).json(newEvent);
			}
		} catch (error) {
			res.status(500).json({ message: `Your event could not be posted ${error.error}.` });
		}
	}
});

router.put('/:id', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { id } = req.params;
	try {
		const event = await db.findById(id, userID);
		if (event) {
			const { eventName, city } = req.body;
			const eventUpdate = { user_id: userID };
			if (eventName) {
				eventUpdate.event_name = eventName;
			}
			if (city) {
				eventUpdate.city = city;
			}
			try {
				const editedEvent = await db.update(eventUpdate, id);
				if (editedEvent) {
					res.status(200).json(editedEvent);
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
				message: `The event with the specified ID does not exist.`
			});
		}
	} catch (error) {
		res.status(500).json({
			message: `Event updated failed ${error.message}.`
		});
	}
});

router.delete('/:id', async (req, res) => {
	const userID = req.decodedToken.subject.toString();
	const { id } = req.params;
	try {
		const deletedEvent = await db.remove(id, userID);
		if (deletedEvent) {
			res.status(204).end();
			// res.status(200).json(deletedEvent);
		} else {
			res.status(404).json({ message: 'The event with the specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({
			message: `The events's information could not be modified: ${error.message}.`
		});
	}
});

module.exports = router;
