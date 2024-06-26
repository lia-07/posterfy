<script lang="ts">
	import Poster from '$lib/components/A4_poster.svelte';

	import PosterPreview from '$lib/components/posterPreview.svelte';

	let poster: HTMLElement;

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.items);
	const album = data.items;
</script>

<PosterPreview originalPoster={poster}></PosterPreview>

<Poster hidden={true} bind:html={poster} {album}></Poster>
