import { db } from '$lib/_db';

export async function get({ locals }) {
	const user = locals.user || '';
	const employee = locals.employee || '';

	let current;

	await db('PcmTable')
		.select('*')
		.where('CheckedOut', 1)
		.then((res) => (current = res))
		.catch((err) => console.log(err));
	return {
		body: {
			user,
			employee,
			current
		}
	};
}
