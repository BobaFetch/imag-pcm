import { knex } from 'knex';

export const db = knex({
	client: 'mssql',
	connection: {
		host: 'HOST',
		user: 'USER',
		password: 'PASSWORD',
		database: 'DATABASE'
	}
});
