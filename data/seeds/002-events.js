exports.seed = function(knex, Promise) {
	return knex('events').del().then(function() {
		return knex('events').insert([
			{ id: 1, event_name: 'wwdc 2019', city: 'San Francisco', user_id: 1 },
			{ id: 2, event_name: 'wwdc 2019', city: 'San Francisco', user_id: 2 },
			{ id: 3, event_name: 'google io 2019', city: 'San Francisco', user_id: 2 },
			{ id: 4, event_name: 'google io 2019', city: 'San Francisco', user_id: 4 },
			{ id: 5, event_name: 'react 2019', city: 'New York', user_id: 3 },
			{ id: 6, event_name: 'techspo 2019', city: 'Los Angeles', user_id: 3 },
			{ id: 7, event_name: 'techspo 2019', city: 'Los Angeles', user_id: 4 }
		]);
	});
};
