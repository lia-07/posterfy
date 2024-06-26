<script lang="ts">
	import type { Album } from '@spotify/web-api-ts-sdk';

	import { onMount } from 'svelte';

	export let hidden = false;
	export let html;

	export let album: Album;

	onMount(() => {
		let tracklist: string[] = album.tracks.items.map((track) => track.name);
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
		<img src={album.images[0].url} class="mb-[2mm] aspect-square w-full" alt="" />
		<span class="ptxt-title text-ellipses line-clamp-1 text-[16mm] font-bold italic leading-[18mm]"
			>{album.name}</span
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
						>{album.artists[0].name}</span
					><span class=""> &mdash; {album.release_date.substring(0, 4)}</span>
				</div>
			</div>
			<span class="text-[7mm] italic opacity-80"
				>{album.total_tracks !== 1 ? `${album.total_tracks} songs` : '1 song'}, {Math.round(
					album.tracks.items.reduce((sum, track) => track.duration_ms + sum, 0) / (1000 * 60)
				)}m</span
			>
		</div>

		<div class="flex gap-[2mm] pt-[5mm] font-sans text-[5mm] leading-[6mm] opacity-60">
			{#each chunkedTracklist as tracks, i}
				<div class="flex-1">
					{#each tracks as track, j}
						<div
							class="line-clamp-1 flex-1 overflow-clip [&>*]:line-clamp-1 [&>*]:overflow-ellipsis"
						>
							{#if i === 4 && j === 6 && album.total_tracks > 35}
								<!-- content here -->
								<span class="italic">...{album.total_tracks - 34} more</span>
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
				<span>{album.copyrights[0].text}</span>
				<span>Content sourced from Spotify.</span>
			</div>
			<img
				src={`
https://scannables.scdn.co/uri/plain/png/041222/white/640/${album.uri}`}
				class="w-[45mm]"
				alt=""
			/>
		</div>
	</div>
</div>
