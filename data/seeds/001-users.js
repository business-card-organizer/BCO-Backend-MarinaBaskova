const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
	return knex('users').truncate().then(function() {
		return knex('users').insert([
			{
				username: 'DavidB',
				first_name: 'David',
				last_name: 'Smith',
				password: bcrypt.hashSync('hello', 10),
				unique_code: Math.random().toString(36).substring(7)
			},
			{
				username: 'JohnS',
				first_name: 'John',
				last_name: 'Smith',
				password: bcrypt.hashSync('hello', 10),
				unique_code: Math.random().toString(36).substring(7)
			},
			{
				username: 'AmyS',
				first_name: 'Amy',
				last_name: 'Smith',
				password: bcrypt.hashSync('hello', 10),
				organization: 'ABC Network',
				job_title: 'Web Dev',
				email: 'amys@abcnet.com',
				phone: '123-456-789',
				unique_code: Math.random().toString(36).substring(7)
			}
		]);
	});
};
