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
				phone: '124-245-789',
				user_id: 2,
				event_id: 2
			},
			{
				first_name: 'Sophia',
				last_name: 'Williams',
				organization: 'Great Web Dev',
				job_title: 'frontend engineer',
				email: 'Sophia@greatwebdev.com',
				phone: '111-456-789',
				user_id: 2,
				event_id: 1
			},
			{
				first_name: 'Jeremy',
				last_name: 'Brown',
				organization: 'Gret Tech',
				job_title: 'backend developer',
				email: 'Jeremy@greattech.com',
				phone: '924-456-789',
				user_id: 1,
				event_id: 3
			},
			{
				first_name: 'Ashley',
				last_name: 'Moore',
				organization: 'Mobile App',
				job_title: 'mobile engineer',
				email: 'Linda@greatwebdev.com',
				phone: '184-456-789',
				user_id: 3,
				event_id: 3
			}
		]);
	});
};
