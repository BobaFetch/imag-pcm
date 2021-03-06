import cookie from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.user = cookies.user;
	event.locals.employee = cookies.employee;

	const response = await resolve(event);

	response.headers['set-cookie'] = `user=${event.locals.user || ''}; Path=/; HttpOnly`;

	return response;
}

export async function getSession(request) {
	return {
		user: request.locals.user,
		employee: request.locals.employee
	};
}
