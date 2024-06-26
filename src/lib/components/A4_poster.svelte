<script lang="ts">
	import hmhas from '$lib/img/download.jpg';
	import hmhasCode from '$lib/img/spotify_album_7aJuG4TFXa2hmE4z1yxc3n.png';

	import { onMount } from 'svelte';

	export let hidden = false;
	export let html;

	export let art = hmhas;
	export let title = 'HIT ME HARD AND SOFT';
	export let artist = 'Billie Eilish';
	export let year = 2024;
	export let duration = '44m';
	export let copyrightInfo = '© 2024 Darkroom/Interscope Records.';
	export let spotifyCode = hmhasCode;
	export let tracklist = [
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
</script>

<div class={hidden ? 'pointer-events-none absolute -top-[297mm] -z-50' : ''}>
	<div
		bind:this={html}
		class=" flex h-[297mm] w-[210mm] flex-col bg-[#FFFCF0] px-[16mm] py-[12mm] font-instrument"
	>
		<img src={art} class="mb-[2mm] aspect-square w-full" alt="" />
		<span class="ptxt-title text-ellipses line-clamp-1 text-[16mm] font-bold italic leading-[18mm]"
			>{title}</span
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
						>{artist}</span
					><span class=""> &mdash; {year}</span>
				</div>
			</div>
			<span class="text-[7mm] italic opacity-80"
				>{tracklist.length !== 1 ? `${tracklist.length} songs` : '1 song'}, {duration}</span
			>
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
								<span class="italic">...{tracklist.length - 34} more</span>
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
				class="max-w-[100mm] font-sans text-[3.5mm] leading-[4mm] opacity-60 [&>*]:line-clamp-1 [&>*]:text-ellipsis"
			>
				<span>{copyrightInfo}</span>
				<span>Content sourced from Spotify.</span>
			</div>
			<img src={spotifyCode} class="w-[45mm]" alt="" />
		</div>
	</div>
</div>
