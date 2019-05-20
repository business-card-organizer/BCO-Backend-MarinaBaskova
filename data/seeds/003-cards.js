exports.seed = function(knex, Promise) {
	return knex('cards').truncate().then(function() {
		return knex('cards').insert([
			{
				first_name: 'Fred',
				last_name: 'Martin',
				organization: 'Manning',
				job_title: 'Writter',
				email: 'fredmartin@manning.com',
				phone: '123-456-789',
				user_id: 1,
				event_id: 1
			},
			{
				first_name: 'Linda',
				last_name: 'Vohra',
				organization: 'Great Web Dev',
				job_title: 'CEO',
				email: 'Linda@greatwebdev.com',
				phone: '124-456-789',
				user_id: 2,
				event_id: 1
			}
		]);
	});
};
