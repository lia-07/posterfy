<script lang="ts">
	//import Graduation from '$lib/img/Graduation_(album).jpg';
	import hmhas from '$lib/img/download.jpg';
	import hmhasCode from '$lib/img/spotify_album_7aJuG4TFXa2hmE4z1yxc3n.png';
	import { onMount } from 'svelte';
	import tilt from 'vanilla-tilt';

	let tracklist = [
		'Skinny',
		'Lunch',
		'Chihiro',
		'Birds of a Feather BUT YUM',
		'Wildflower',
		'The Greatest',
		"L'Amour de Ma Vie",
		'The Diner',
		'Bittersuite',
		'Blue',
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

	let poster: HTMLElement | HTMLElement[];

	onMount(() =>
		tilt.init(poster, {
			max: 10,
			speed: 1000,
			reverse: true,
			glare: true,
			'max-glare': 0.6
		})
	);
</script>

<div bind:this={poster} class="paper-a4 m-8 flex flex-col bg-[#FFFCF0] font-instrument drop-shadow">
	<img src={hmhas} class="mb-[4mm] aspect-square w-full" alt="" />
	<span class="ptxt-title line-clamp-1 overflow-ellipsis font-bold italic"
		>HIT ME HARD AND SOFT</span
	>
	<div class="flex items-baseline justify-between">
		<div class="flex h-fit items-baseline gap-[4mm] pt-[2mm]">
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

	<div class="grid grid-cols-3 gap-[4mm] pt-[4mm] font-sans text-[5mm] opacity-60">
		<div class="col-span-1 overflow-clip [&>*]:line-clamp-1 [&>*]:overflow-ellipsis">
			{#each tracklist.slice(0, 6) as track, i}
				<p>{i + 1}. {track}</p>
			{/each}
		</div>
		<div class="col-span-1 overflow-clip [&>*]:overflow-ellipsis">
			{#each tracklist.slice(6, 12) as track, i}
				<p>{i + 6 + 1}. {track}</p>
			{/each}
		</div>
		<div class="col-span-1 overflow-clip [&>*]:overflow-ellipsis">
			{#each tracklist.slice(12, 18) as track, i}
				{#if i === 5 && tracklist[19]}
					<!-- content here -->
					<span class="italic">...{tracklist.length - 17} more</span>
				{:else}
					<p>{i + 12 + 1}. {track}</p>
				{/if}
			{/each}
		</div>
	</div>
	<div class=" flex h-max flex-1 items-end justify-between">
		<span class="line-clamp-1 max-w-[100mm] text-ellipsis font-sans text-[4mm] opacity-70"
			>© 2024 Darkroom/Interscope Records</span
		>
		<img src={hmhasCode} class="w-[50mm]" alt="" />
	</div>
</div>

<style>
	.paper-a4 {
		width: 210mm;
		min-height: 297mm;
		padding: 12mm 16mm;
		border: 1px #d3d3d3 solid;
		border-radius: 5px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

	.ptxt-title {
		line-height: 18mm;
		font-size: 18mm;
	}
</style>
