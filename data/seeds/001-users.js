const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
	return knex('users').delete().then(function() {
		return knex('users').insert([
			{
				username: 'DavidB',
				first_name: 'David',
				last_name: 'Smith',
				password: bcrypt.hashSync('hello', 10),
				qr_code: Math.random().toString(36).substring(7)
			},
			{
				username: 'JohnS',
				first_name: 'John',
				last_name: 'Smith',
				password: bcrypt.hashSync('hello', 10),
				qr_code: Math.random().toString(36).substring(7)
			},
			{
				username: 'AmyJ',
				first_name: 'Amy',
				last_name: 'Jade',
				password: bcrypt.hashSync('hello', 10),
				organization: 'ABC Network',
				job_title: 'Web Dev',
				email: 'amys@abcnet.com',
				phone: '123-456-789',
				qr_code: Math.random().toString(36).substring(7)
			},
			{
				username: 'TomC',
				first_name: 'Tom',
				last_name: 'Charles',
				password: bcrypt.hashSync('hello', 10),
				organization: 'Lambda School',
				job_title: 'Student',
				qr_code: Math.random().toString(36).substring(7)
			},
			{
				username: 'JenH',
				first_name: 'Jen',
				last_name: 'Hill',
				password: bcrypt.hashSync('hello', 10),
				organization: 'NFL',
				job_title: 'Frontend Developer',
				qr_code: Math.random().toString(36).substring(7)
			}
		]);
	});
};
