<script lang="ts">
	//import Graduation from '$lib/img/Graduation_(album).jpg';
	import hmhas from '$lib/img/download.jpg';
	import hmhasCode from '$lib/img/spotify_album_7aJuG4TFXa2hmE4z1yxc3n.png';
	import * as htmlToImage from 'html-to-image';
	import { onMount } from 'svelte';
	import tilt from 'vanilla-tilt';

	let hideRealPoster = true;

	let tracklist = [
		'Skinny',
		'Lunch',
		'Chihiro',
		'Birds of a Feather',
		'Wildflower',
		'The Greatest',
		"L'Amour de Ma Vie",
		'The Diner',
		'Bittersuite',
		'Blue'
	];

	onMount(() => {
		chunkedTracklist = [];
		for (let i = 0; i < tracklist.length; i += 7) {
			if (i <= 7 * 4) {
				chunkedTracklist.push(tracklist.slice(i, i + 7));
			}
		}
	});

	let chunkedTracklist: any[] = [];

	onMount(() =>
		tilt.init(posterPreviewElement, {
			max: 7,
			reverse: true,
			speed: 1500,
			glare: true,
			'max-glare': 0.5
		})
	);

	let poster: HTMLElement;
	let posterPreview: string;
	let posterPreviewElement: HTMLElement;

	function updatePoster() {
		htmlToImage.toPng(poster).then((png) => {
			posterPreview = png;
		});
	}

	$: if (poster) {
		htmlToImage.toPng(poster).then((png) => {
			posterPreview = png;
		});
	}
</script>

<div class="flex h-full w-full items-center justify-center p-8">
	<div
		bind:this={posterPreviewElement}
		class="asepct-[1/1.41] h-full overflow-clip rounded-md drop-shadow-xl"
	>
		{#if posterPreview}
			<img class="h-full" src={posterPreview} alt="Preview" />
		{/if}
	</div>
</div>
<div class={hideRealPoster ? 'pointer-events-none absolute -top-[297mm] -z-50' : ''}>
	<div
		bind:this={poster}
		class=" flex h-[297mm] w-[210mm] flex-col bg-[#FFFCF0] px-[16mm] py-[12mm] font-instrument"
	>
		<img src={hmhas} class="mb-[4mm] aspect-square w-full" alt="" />
		<span class="ptxt-title text-ellipses line-clamp-1 pl-[0.75mm] font-bold italic"
			>HIT ME HARD AND SOFT</span
		>
		<div class="flex items-end justify-between">
			<div class="flex h-fit items-end gap-[4mm] pt-[2mm]">
				<div class="flex h-[8mm] gap-[1mm]">
					<div class="aspect-square h-full bg-[#041222]"></div>
					<div class="aspect-square h-full bg-[#032850]"></div>
					<div class="aspect-square h-full bg-[#6A7064]"></div>
				</div>
				<div class="flex gap-[2mm] text-[8mm] leading-[8mm]">
					<span class=" line-clamp-1 w-fit max-w-[90mm] overflow-ellipsis break-words"
						>Billie Eilish</span
					><span class=""> &mdash; 2024</span>
				</div>
			</div>
			<span class="text-[6mm] italic opacity-80">14 songs, 44m</span>
		</div>

		<div class="flex gap-[2mm] pt-[5mm] font-sans text-[5mm] leading-[6mm] opacity-60">
			{#each chunkedTracklist as tracks, i}
				<div class="flex-1">
					{#each tracks as track, j}
						<div
							class="line-clamp-1 flex-1 overflow-clip [&>*]:line-clamp-1 [&>*]:overflow-ellipsis"
						>
							{#if i === 4 && j === 6 && tracklist[28]}
								<!-- content here -->
								<span class="italic">...{tracklist.length - 7 * 5} more</span>
							{:else}
								<p>{j + i * 7 + 1}. {track}</p>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class=" flex h-max flex-1 items-end justify-between">
			<div
				class="max-w-[100mm] font-sans text-[3.5mm] leading-[3.5mm] opacity-60 [&>*]:line-clamp-1 [&>*]:text-ellipsis"
			>
				<span class="">© 2024 Darkroom/Interscope Records.</span>
				<span>Content sourced from Spotify.</span>
			</div>
			<img src={hmhasCode} class="w-[45mm]" alt="" />
		</div>
	</div>
</div>

<style>
	.paper-a4 {
		width: 210mm;
		min-height: 297mm;
		padding: 12mm 16mm;
	}

	.ptxt-title {
		line-height: 18mm;
		font-size: 18mm;
		vertical-align: baseline;
	}
</style>
