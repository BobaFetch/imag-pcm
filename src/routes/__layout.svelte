<script context="module">
	export async function load({ url, session }) {
		if (url.pathname != '/' && !session.user) {
			return {
				redirect: '/',
				status: 302
			};
		}
		return { props: {} };
	}
</script>

<script>
	import '../app.css';
</script>

<slot />
