<script lang="ts">
	import Poster from '$lib/components/Poster.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.items);
	const album = data.items;
</script>

<Poster {album}></Poster>
