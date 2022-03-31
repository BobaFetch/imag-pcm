import { db } from '$lib/_db';

export async function get({ url }) {
	const pcmNumber = url.searchParams.get('pcm');
	let response;

	await db('PcmTable')
		.select(
			'Pcm_Location',
			'Pcm_Number',
			'Pcm_Sheet',
			'Pcm_Rev',
			'Pcm_Comments',
			'Employee_Number',
			'Checkout_Date',
			'CheckedOut',
			'PREMFSTNAME',
			'PREMLSTNAME'
		)
		.leftJoin('EmplTable', 'PcmTable.Employee_Number', '=', 'EmplTable.PREMNUMBER')
		.where('Pcm_Location', pcmNumber)
		.then((res) => (response = res))
		.catch((err) => console.log(err));

	if (response) {
		console.log(response);
		return {
			status: 200,
			headers: { 'content-type': 'application/json' },
			body: {
				data: response
			}
		};
	}
}

export async function post({ url }) {
	const pcmNumber = url.searchParams.get('number');
	const location = url.searchParams.get('loc');
	const checkedOut = parseInt(url.searchParams.get('checkedOut'));
	const employee = url.searchParams.get('employee');
	const time = new Date(Date.now()).toISOString();

	if (checkedOut === 0) {
		await db('PcmTable')
			.where({ Pcm_Location: location, Pcm_Number: pcmNumber })
			.update({ CheckedOut: 0, Checkout_Date: time });
	}

	if (checkedOut === 1) {
		await db('PcmTable')
			.where({ Pcm_Location: location, Pcm_Number: pcmNumber })
			.update({ Employee_Number: employee, CheckedOut: 1, Checkout_Date: time });
	}

	return {
		status: 201,
		headers: {
			location: '/pcm'
		}
	};
}
