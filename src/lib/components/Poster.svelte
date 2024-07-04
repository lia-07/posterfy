<script lang="ts">
	import PosterElement from '$lib/components/A4_poster.svelte';

	import type { Album } from '@spotify/web-api-ts-sdk';

	export let album: Album;

	let posterElement: HTMLElement;

	import { toPng } from 'html-to-image';
	import { onMount } from 'svelte';
	import tilt from 'vanilla-tilt';

	let posterPreview: string;
	let posterPreviewContainer: HTMLElement;

	function updatePoster() {
		toPng(posterElement).then((png) => {
			posterPreview = png;
		});
	}

	$: if (posterElement) {
		toPng(posterElement).then((png) => {
			posterPreview = png;
		});
	}

	onMount(() =>
		tilt.init(posterPreviewContainer, {
			max: 7,
			speed: 1500,
			glare: true,
			'max-glare': 0.5
		})
	);
</script>

<PosterElement hidden={true} on:rerender={updatePoster} bind:html={posterElement} {album}
></PosterElement>

<div
	bind:this={posterPreviewContainer}
	class="asepct-[1/1.41] h-3/4 overflow-clip rounded-md drop-shadow-xl"
>
	{#if posterPreview}
		<img class="h-full" src={posterPreview} alt="Preview" />
	{/if}
</div>
