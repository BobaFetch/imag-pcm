<script>
	export let data;
	export let user;
	// let checkedOut = data.CheckedOut ? 'checkin' : 'checkout';

	const handleUpdate = async () => {
		if (data.CheckedOut === 0 || data.CheckedOut === null) {
			// checkedOut = 'checkin';
			await fetch(
				`api/pcm?number=${data.Pcm_Number}&loc=${data.Pcm_Location}&employee=${user}&checkedOut=1`,
				{
					method: 'POST',
					mode: 'cors'
				}
			);
			const res = await fetch(`api/pcm?pcm=${data.Pcm_Location}`, {
				method: 'GET',
				mode: 'cors'
			});

			if (res.ok) {
				const json = await res.json();
				data = json.data[0];
			}
			return;
		}

		if (data.CheckedOut === 1) {
			// checkedOut = 'checkout';
			await fetch(`api/pcm?number=${data.Pcm_Number}&loc=${data.Pcm_Location}&checkedOut=0`, {
				method: 'POST',
				mode: 'cors'
			});
			const res = await fetch(`api/pcm?pcm=${data.Pcm_Location}`, {
				method: 'GET',
				mode: 'cors'
			});

			if (res.ok) {
				const json = await res.json();
				data = json.data[0];
			}
			return;
		}
	};
</script>

<div class="border border-black p-3 rounded-2xl bg-gray-200">
	<div class="flex flex-row content-around justify-between">
		<div>
			<span class="font-bold">PCM Number:</span> <span>{data.Pcm_Number}</span>
		</div>
		<div>
			<span class="text-xl font-bold"
				>{data.CheckedOut === 0 || data.CheckedOut === null ? 'CHECKED IN' : 'CHECKED OUT'}</span
			>
		</div>
		<div>
			<span class="font-bold">Location: </span> <span>{data.Pcm_Location}</span>
		</div>
	</div>
	<div class="flex flex-row justify-around">
		<div class="flex flex-col">
			<span>Sheet: {data.Pcm_Sheet}</span>
			<span>Revision: {data.Pcm_Rev}</span>
			<span>Comments: {data.Pcm_Comments === null ? '' : data.Pcm_Comments}</span>
		</div>
		<div class="flex flex-col">
			<h1>
				<span class="font-bold">Last Checkout:</span>
				<span
					>{data.Checkout_Date === null ? '' : new Date(data.Checkout_Date).toLocaleString()}</span
				>
			</h1>
			<label for="employee"
				><span class="font-bold">By: </span>{data.Employee_Number === null
					? ''
					: `${data.PREMFSTNAME.trim()} ${data.PREMLSTNAME.trim()}`}</label
			>
		</div>
	</div>

	<div />
	<div class="flex justify-end">
		<button
			type="submit"
			class="border border-gray-800 rounded-lg p-2 bg-gray-200"
			class:bg-green-200={data.CheckedOut === 0 || data.CheckedOut === null}
			class:bg-red-200={data.CheckedOut === 1}
			on:click|preventDefault={handleUpdate}
		>
			{data.CheckedOut === 1 ? 'Check In' : 'Check Out'}
		</button>
	</div>
</div>
