import { knex } from 'knex';

export const db = knex({
	client: 'mssql',
	connection: {
		host: 'IMASQL01',
		user: 'esisa',
		password: 'CNIAMI000',
		database: 'Esi2000Db'
	}
});
