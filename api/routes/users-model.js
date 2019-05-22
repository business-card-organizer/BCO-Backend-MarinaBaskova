const db = require('../../config/dbConfig');

module.exports = {
	findById,
	findByUser,
	findByQR,
	create,
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
			organization: 'organization',
			jobTitle: 'job_title',
			email: 'email',
			phone: 'phone',
			qrCode: 'qr_code'
		})
		.where({ id })
		.first();
	return user;
}

async function findByQR(qrCode) {
	const user = await db('users')
		.select({
			id: 'id',
			username: 'username',
			firstName: 'first_name',
			lastName: 'last_name',
			organization: 'organization',
			jobTitle: 'job_title',
			email: 'email',
			phone: 'phone',
			qrCode: 'qr_code'
		})
		.where({ 'users.qr_code': qrCode })
		.first();
	return user;
}

async function findByUser(username) {
	const user = await db('users').where({ username }).first();
	return user;
}

async function create(newUser) {
	const [ id ] = await db('users').insert(newUser, 'id');
	if (id) {
		const user = await findById(id);
		return user;
	}
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
