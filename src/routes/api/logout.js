export async function get(req) {
	req.locals.user = null;
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [`user=; Path=/; HttpOnly;`]
		}
	};
}
