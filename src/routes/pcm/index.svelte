<script>
	import { onDestroy, onMount } from 'svelte';
	import PcmCard from '$lib/components/PcmCard.svelte';

	export let user;
	export let employee;
	// export let current;
	export let pcm;
	export let pcmNumber;
	let myInterval;

	onMount(() => {
		myInterval = setInterval(() => {
			location.reload();
		}, 130000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});

	const fetchPcm = async () => {
		const res = await fetch(`/api/pcm?pcm=${pcmNumber}`, {
			method: 'GET',
			mode: 'cors'
		});

		if (res.ok) {
			pcmNumber = '';

			const { data } = await res.json();
			pcm = data;
		}
	};
</script>

<div class="container flex flex-col  h-screen">
	<div class="flex flex-row justify-between p-5">
		<h1>USER: <a href={`user/${employee}`}>{user}</a></h1>
		<a href="api/logout">
			<button class="bg-red-300 p-3 rounded-lg shadow-md shadow-black">Logout</button>
		</a>
	</div>
	{#if pcm}
		<div>
			{#each pcm as item}
				<PcmCard user={employee} data={item} />
			{/each}
		</div>
	{/if}
	<div class="justify-self-center self-center my-auto flex flex-col">
		<input
			type="text"
			bind:value={pcmNumber}
			placeholder="Enter PCM Location"
			class="border border-black p-3"
		/>
		<button class="my-10 border border-gray-600 p-3" on:click|preventDefault={fetchPcm}
			>Search</button
		>
	</div>
</div>
