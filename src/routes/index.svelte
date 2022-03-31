<script>
	import LoginModal from '$lib/components/LoginModal.svelte';

	export let user;
	export let current;

	let showLoginModal = false;

	const handleLoginModal = () => {
		showLoginModal = !showLoginModal;
	};
</script>

<div class="container flex flex-col justify-center items-center h-screen ">
	{#if user}
		<p>{user}</p>
		<div class="border border-black">
			<a href="/pcm">
				<button>Pcm</button>
			</a>
			<a href="/">
				<button>Tool</button>
			</a>
			<button> Checked Out </button>
			<a href="/api/logout">
				<button>Logout</button>
			</a>
		</div>
	{:else}
		<div class="flex flex-col">
			<button
				on:click={handleLoginModal}
				class="px-10 py-5 border border-black rounded-2xl bg-gray-200">Login</button
			>
			<LoginModal title="Login" open={showLoginModal} on:close={handleLoginModal} />
			{#if current.length > 0}
				<div class="mt-10">
					Currently Checked Out:

					{#each current as pcm}
						<div>
							<span>Location: {pcm.Pcm_Location} Number: {pcm.Pcm_Number}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<div />
</div>
