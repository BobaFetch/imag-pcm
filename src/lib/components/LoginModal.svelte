<script>
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let title = '';
	let err;

	let employeeNumber = '';

	const dispatch = createEventDispatcher();

	const close = () => {
		dispatch('close');
	};

	const handleEmployeeInput = (e) => {
		err = '';
		employeeNumber += e.target.value;
	};

	const handleClear = () => {
		employeeNumber = '';
	};

	const handleAuth = async () => {
		const res = await fetch(`api/login?employee=${employeeNumber}`, {
			method: 'GET',
			mode: 'cors'
		});

		if (!res.ok) {
			employeeNumber = '';
			const { errors } = await res.json();
			console.log(errors);
			err = errors;
			return 0;
		}

		if (res.ok) {
			location.replace('/pcm');
		}
	};
</script>

{#if open}
	<div
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
	>
		<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
		<div
			class="bg-white w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
		>
			<div class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl ">
				{title}
				<button class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4" on:click={close}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
						><path d="M0 0h24v24H0V0z" fill="none" /><path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
						/></svg
					>
				</button>
			</div>
			<div class="content p-8 flex flex-col justify-center items-center">
				<label for="employee_number">
					<input
						type="text"
						name="employee_number"
						bind:value={employeeNumber}
						placeholder="Enter Employee Number"
						class="border border-black p-3 text-center"
					/>
				</label>
				<div class="flex flex-col justify-center items-center my-5 ">
					<div class="flex-row">
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="1"
							on:click|preventDefault={handleEmployeeInput}>1</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="2"
							on:click|preventDefault={handleEmployeeInput}>2</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="3"
							on:click|preventDefault={handleEmployeeInput}>3</button
						>
					</div>
					<div class="flex-row">
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="4"
							on:click|preventDefault={handleEmployeeInput}>4</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="5"
							on:click|preventDefault={handleEmployeeInput}>5</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="6"
							on:click|preventDefault={handleEmployeeInput}>6</button
						>
					</div>
					<div class="flex-row">
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="7"
							on:click|preventDefault={handleEmployeeInput}>7</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="8"
							on:click|preventDefault={handleEmployeeInput}>8</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="9"
							on:click|preventDefault={handleEmployeeInput}>9</button
						>
					</div>
					<div class="flex-row">
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							on:click|preventDefault={handleClear}>CLEAR</button
						>
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							value="0"
							on:click|preventDefault={handleEmployeeInput}>0</button
						>
						<!-- <a href=> -->
						<button
							class="border border-gray-600 bg-gray-200 rounded-lg w-20 h-20"
							on:click|preventDefault={handleAuth}>ENTER</button
						>
						<!-- </a> -->
					</div>
				</div>
				{#if err}
					<div>
						<h1 class="text-red-600 text-2xl">{err}</h1>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
