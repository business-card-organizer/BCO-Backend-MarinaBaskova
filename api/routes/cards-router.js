// const router = require('express').Router();
// const db = require('./cards-model.js');

// // >>>>> /api/cards/

// router.get('/', async (req, res) => {
// 	const userID = req.decodedToken.subject.toString();

// 	try {
// 		const cards = await db.findAll(userID);
// 		if (cards) {
// 			res.status(200).json(cards);
// 		} else {
// 			res.status(404).json({ message: 'User does not have any existing cards.' });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: `Event request failed ${error.message}.` });
// 	}
// });

// module.exports = router;
