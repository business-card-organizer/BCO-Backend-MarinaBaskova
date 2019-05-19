const db = require('../../config/dbConfig');

module.exports = {
	// find,
	findById,
	// create,
	remove,
	update
};

async function findById(id) {
	const user = await db('users')
		.select({
			id: 'id',
			username: 'username',
			firstName: 'first_name',
			lastName: 'last_name',
			password: 'password',
			organization: 'organization',
			jobTitle: 'job_title',
			email: 'email',
			phone: 'phone'
		})
		.where({ id })
		.first();
	return user;
}

async function update(infoToUpdate, id) {
	const editedUser = await db('users').where({ id }).update(infoToUpdate);
	if (editedUser) {
		const updatedUser = await findById(id);
		return updatedUser;
	}
}

async function remove(id) {
	const userToDelete = await findById(id);
	if (userToDelete) {
		const numOfDeleted = await db('users').where({ id }).del();
		if (numOfDeleted) {
			return userToDelete;
		}
	}
}
