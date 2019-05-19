exports.seed = function(knex, Promise) {
	return knex('events').truncate().then(function() {
		return knex('events').insert([
			{ event_name: 'wwdc 2019', city: 'San Francisco', user_id: 1 },
			{ event_name: 'wwdc 2019', city: 'San Francisco', user_id: 2 }
		]);
	});
};
