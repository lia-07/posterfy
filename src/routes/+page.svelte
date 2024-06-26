<script lang="ts">
	import Poster from '$lib/components/A4_poster.svelte';

	import PosterPreview from '$lib/components/posterPreview.svelte';

	let poster: HTMLElement;
</script>

<PosterPreview originalPoster={poster}></PosterPreview>

<Poster hidden={true} bind:html={poster}></Poster>
