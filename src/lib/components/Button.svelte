<script>
	export let text;
	export let handler;
</script>

<button
	class="border border-gray-600 bg-red-300 hover:bg-red-500 hover:text-white p-1 rounded-md shadow-md active:translate-y-px"
	on:click|preventDefault={handler}
>
	{text}</button
>
