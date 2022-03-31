import { db } from '$lib/_db';

export async function get({ url, locals }) {
	let employee;
	let user;
	let number = url.searchParams.get('employee');
	let errors;

	await db('EmplTable')
		.first('PREMFSTNAME as firstName', 'PREMLSTNAME as lastName', 'PREMNUMBER as employeeNumber')
		.where('PREMNUMBER', number)
		.then(
			(res) => (
				(user = `${res.firstName.trim()} ${res.lastName.trim()}`),
				(employee = `${res.employeeNumber}`)
			)
		)
		.catch((err) => {
			console.log(err);
			errors = 'NO EMPLOYEE FOUND';
		});

	if (employee) {
		locals.user = user;
		locals.employee = employee;
		return {
			status: 302,
			headers: {
				location: '/pcm',
				'set-cookie': [
					`user=${user || ''}; Max-Age=120; Path=/; HttpOnly;`,
					`employee=${employee || ''}; Max-Age=120; Path=/; HttpOnly`
				]
			}
		};
	}

	if (errors) {
		return {
			status: 400,
			headers: {
				location: '/'
			},
			body: {
				errors
			}
		};
	}
}
