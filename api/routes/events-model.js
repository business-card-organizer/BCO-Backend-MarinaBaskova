const db = require('../../config/dbConfig');

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove
};

async function findAll(user_id) {
	const userEvents = await db('events')
		.select({ id: 'events.id', eventName: 'events.event_name', city: 'events.city' })
		.where({ user_id });
	return userEvents;
}

async function findById(id, userID) {
	const event = await db('events')
		.select({
			id: 'events.id', // do I need to show EventID in response ??
			eventName: 'events.event_name',
			city: 'events.city'
		})
		.where({ 'events.id': id })
		.andWhere({ user_id: userID })
		.first();
	return event;
}

async function create(newEvent) {
	const [ id ] = await db('events').insert(newEvent, 'id');
	if (id) {
		const event = await findById(id, newEvent.user_id);
		return event;
	}
}

async function update(event, id) {
	const editedEvent = await db('events').where({ id }).update(event);
	if (editedEvent) {
		const resultedEvent = await findById(id, event.user_id);
		return resultedEvent;
	}
}

async function remove(id, userID) {
	const eventToDelete = await findById(id, userID);
	if (eventToDelete) {
		const numOfDeleted = await db('events').where({ id }).del();
		return numOfDeleted;
	}
}
