const request = require('supertest');
const db = require('../config/dbConfig');
const server = require('../api/server.js');

describe('server', () => {
	it('sets the enviroment to testing', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});
	let globalToken;

	describe('post/api/auth/register', () => {
		afterEach(async () => {
			await db('users').del();
		});
		it('should respond with 201 ok', () => {
			const user = { username: 'Test1', password: 'hello', firstName: 'Test', lastName: 'Test' };
			return request(server).post('/api/auth/register').send(user).then((res) => {
				expect(res.status).toBe(201);
			});
		});
		it('should return json', () => {
			const user = { username: 'TestTest', password: 'hello', firstName: 'Test', lastName: 'Test' };
			return request(server).post('/api/auth/register').send(user).then((res) => {
				token = res.body.token;
				expect(res.type).toBe('application/json');
			});
		});
		it('should return an object', () => {
			const user = { username: 'TestTest', password: 'hello', firstName: 'Test', lastName: 'Test' };
			return request(server).post('/api/auth/register').send(user).then((res) => {
				token = res.body.token;
				expect(typeof res).toBe('object');
			});
		});
		it('should return 401 if information is incomplete', () => {
			const user = { username: 'TestTest', password: 'hello', lastName: 'Test' };
			return request(server).post('/api/auth/register').send(user).then((res) => {
				token = res.body.token;
				expect(res.status).toBe(401);
			});
		});
	});
	describe('get/api/user', () => {
		afterAll(async () => {
			await db('users').del();
		});
		it('should respond with 201 ok and sets the token', () => {
			const user = { username: 'Test2', password: 'hello', firstName: 'Test', lastName: 'Test' };
			return request(server).post('/api/auth/register').send(user).then((res) => {
				globalToken = res.body.token;
				expect(res.body.token).toBe(globalToken);
				expect(res.body).toHaveProperty('qrCode');
				expect(res.status).toBe(201);
			});
		});
		it('should respond with 200', () => {
			return request(server).get('/api/user').set('Authorization', globalToken).then((res) => {
				expect(res.status).toBe(200);
			});
		});
		it('should return an object', () => {
			return request(server).get('/api/user').set('Authorization', globalToken).then((res) => {
				expect(typeof res).toBe('object');
			});
		});
		it('should fail if token is not provied', () => {
			return request(server).get('/api/user').then((res) => {
				expect(res.status).toBe(401);
			});
		});
	});

	describe('get/api/cards', () => {
		afterAll(async () => {
			await db('users').del();
		});
		it('should respond with 201 ok and sets the token', () => {
			const user = { username: 'Test3', password: 'hello', firstName: 'Test', lastName: 'Test' };
			return request(server).post('/api/auth/register').send(user).then((res) => {
				globalToken = res.body.token;
				expect(res.body.token).toBe(globalToken);
				expect(res.body).toHaveProperty('qrCode');
				expect(res.status).toBe(201);
			});
		});

		it('should return an object on post card', () => {
			let card = {
				firstName: 'Banana',
				lastName: 'Apple',
				organization: 'Cucumber',
				jobTitle: 'ABC',
				email: 'abc@gmail.com',
				phone: '123-456-456'
			};
			return request(server).post('/api/cards').set('Authorization', globalToken).send(card).then((res) => {
				expect(res.status).toBe(201);
				expect(typeof res).toBe('object');
				expect(res.type).toBe('application/json');
				expect(res.body.firstName).toBe('Banana');
			});
		});
		it('sould respond with 200 on get cards', () => {
			return request(server).get('/api/cards').set('Authorization', globalToken).then((res) => {
				expect(res.status).toBe(200);
			});
		});
		it('should return an object', () => {
			return request(server).get('/api/cards').set('Authorization', globalToken).then((res) => {
				expect(typeof res).toBe('object');
			});
		});
		it('should fail if token is not provied', () => {
			return request(server).get('/api/cards').then((res) => {
				expect(res.status).toBe(401);
			});
		});

		it('should return 200 and updated card', () => {
			let card = {
				firstName: 'Kiwi',
				lastName: 'Apple',
				organization: 'Cucumber',
				jobTitle: 'ABC',
				email: 'c@gmail.com',
				phone: '323-456-456'
			};
			return request(server).post('/api/cards').set('Authorization', globalToken).send(card).then((res) => {
				console.log(res.body.id);
				expect(res.status).toBe(201);
				card = {
					firstName: 'Kiwi1',
					lastName: 'Apple',
					organization: 'Cucumber',
					jobTitle: 'ABC',
					email: 'c@gmail.com',
					phone: '323-456-456'
				};
				return request(server)
					.put(`/api/cards/${res.body.id}`)
					.set('Authorization', globalToken)
					.send(card)
					.then((res) => {
						expect(res.status).toBe(200);
						expect(res.body.firstName).toBe(card.firstName);
						console.log(res.body);
					});
			});
		});
		it('should return 204 on deleted', () => {
			let card = {
				firstName: 'Pear',
				lastName: 'Apple',
				organization: 'Cucumber',
				jobTitle: 'ABC',
				email: 'c@gmail.com',
				phone: '323-456-456'
			};
			return request(server).post('/api/cards').set('Authorization', globalToken).send(card).then((res) => {
				console.log(res.body.id);
				expect(res.status).toBe(201);

				return request(server)
					.delete(`/api/cards/${res.body.id}`)
					.set('Authorization', globalToken)
					.then((res) => {
						expect(res.status).toBe(204);
					});
			});
		});
	});
});
