exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('users', (table) => {
			table.increments();
			table.string('username', 30).notNullable().unique();
			table.string('first_name', 30).notNullable();
			table.string('last_name').notNullable();
			table.string('password', 100).notNullable();
			table.string('organization', 100);
			table.string('job_title', 100);
			table.string('email', 128);
			table.string('phone', 30);
			table.string('unique_code', 10).notNullable().unique();
		})
		.createTable('events', (table) => {
			table.increments();
			table.string('event_name', 100).notNullable();
			table.string('city', 50).notNullable();
			table
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('cards', (table) => {
			table.increments();
			table.string('first_name', 30).notNullable();
			table.string('last_name').notNullable();
			table.string('organization', 100);
			table.string('job_title', 100);
			table.string('email', 128);
			table.string('phone', 30);
			table
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table
				.integer('event_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('events')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users').dropTableIfExists('events').dropTableIfExists('cards');
};
