const db = require('../../config/dbConfig');

module.exports = {
	findAll,
	findById,
	create
	// create,
	// update,
	// remove
};

async function findAll(user_id) {
	const userCards = await db('cards')
		.select({
			id: 'cards.id',
			firstName: 'cards.first_name',
			lastName: 'cards.last_name',
			organization: 'cards.organization',
			jobTitle: 'cards.job_title',
			email: 'cards.email',
			phone: 'cards.phone',
			eventId: 'cards.event_id',
			eventId: 'cards.event_id',
			eventName: 'events.event_name',
			city: 'events.city',
			userId: 'cards.user_id'
		})
		.leftOuterJoin('events', 'events.id', 'cards.event_id')
		.where({ userId: user_id });
	return userCards;
}

async function findById(id, userID) {
	const card = await db('cards')
		.select({
			id: 'cards.id',
			firstName: 'cards.first_name',
			lastName: 'cards.last_name',
			organization: 'cards.organization',
			jobTitle: 'cards.job_title',
			email: 'cards.email',
			phone: 'cards.phone',
			eventId: 'cards.event_id',
			eventId: 'cards.event_id',
			eventName: 'events.event_name',
			city: 'events.city',
			userId: 'cards.user_id'
		})
		.leftOuterJoin('events', 'events.id', 'cards.event_id')
		.where({ 'cards.id': id })
		.andWhere({ userId: userID })
		.orderBy('cards.user_id')
		.first();
	return card;
}

async function create(newCard) {
	const [ id ] = await db('cards').insert(newCard, 'id');
	if (id) {
		const card = await findById(id, newCard.user_id);
		return card;
	}
}