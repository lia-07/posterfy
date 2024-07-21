<script lang="ts">
	import type { Album } from '@spotify/web-api-ts-sdk';

	import { prominent } from 'color.js';
	import { createEventDispatcher, onMount } from 'svelte';

	export let hidden = false;
	export let html;

	export let album: Album;

	const copyrights = album.copyrights[0].text;

	let scannableElement: HTMLElement;

	let dispatch = createEventDispatcher();
	let dominantColours = ['#ccc', '#ccc', '#ccc'];
	let scannable: string;

	onMount(async () => {
		let tracklist: string[] = album.tracks.items.map((track) => track.name);
		chunkedTracklist = [];
		for (let i = 0; i < tracklist.length; i += 7) {
			if (i <= 7 * 4) {
				chunkedTracklist.push(tracklist.slice(i, i + 7));
			}
		}
		prominent(album.images[0].url, { amount: 3, format: 'hex', group: 64 }).then(async (color) => {
			if (Array.isArray(color) && color.every((item) => typeof item === 'string')) {
				dominantColours = color.sort(
					(a, b) =>
						(parseInt(b.replace('#', ''), 16) % 256) - (parseInt(a.replace('#', ''), 16) % 256)
				);
			} else if (typeof color == 'string') {
				dominantColours = dominantColours.fill(color);
			}
			try {
				let bgColour = dominantColours
					.reduce((darkest, color) =>
						dominantColours.reduce((sum, c) => sum + parseInt(c.slice(1), 16), 0) <
						dominantColours.reduce((sum, c) => sum + parseInt(darkest.slice(1), 16), 0)
							? color
							: darkest
					)
					.substring(1, 7);
				console.log(bgColour);

				let scannableUrl = `
https://scannables.scdn.co/uri/plain/png/${bgColour}/${parseInt(bgColour, 16) > 0xffffff / 1.4 ? 'black' : 'white'}/640/${album.uri}`;
				console.log(scannableUrl);
				scannable = await fetchImage(scannableUrl);
			} catch (error) {
				console.error('Error fetching image:', error);
			}
			await new Promise((r) => setTimeout(r, 1));

			dispatch('rerender');
		});
	});

	let chunkedTracklist: any[] = [];

	let img: HTMLImageElement;

	export async function fetchImage(imageUrl: string) {
		try {
			const response = await fetch(imageUrl);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const blob = await response.blob();
			const imageObjectUrl = URL.createObjectURL(blob);
			return imageObjectUrl;
		} catch (error) {
			console.error('Error fetching the image:', error);
			throw error;
		}
	}
</script>

<div class="{hidden ? 'pointer-events-none absolute -top-[297mm] -z-50' : ''}}">
	<div
		bind:this={html}
		class=" flex h-[297mm] w-[210mm] flex-col bg-[#FFFCF0] px-[18mm] py-[12mm] font-instrument"
	>
		<div class="flex h-[196mm] flex-col items-start gap-[3mm]">
			<div
				class="aspect-square min-h-0 flex-shrink flex-grow overflow-hidden border border-black/10"
			>
				<img
					alt="Alb"
					bind:this={img}
					src={album.images[0].url}
					class="h-full w-full object-cover"
				/>
			</div>

			<span
				class=" -mb-[6mm] -ml-[5mm] w-full pb-[6mm] pl-[4mm] text-[16mm] font-bold italic leading-[18mm]"
				>{album.name}</span
			>
		</div>

		<div class=" flex items-center justify-between gap-[2mm]">
			<div class="flex h-fit flex-1 items-center gap-[4mm] pt-[2mm]">
				<div class="flex h-[8mm] gap-[1mm]">
					<div
						class="aspect-square h-full border border-black/10"
						style="background-color: {dominantColours[0]};"
					></div>
					<div
						class="aspect-square h-full border border-black/10"
						style="background-color: {dominantColours[1]};"
					></div>
					<div
						class="aspect-square h-full border border-black/10"
						style="background-color: {dominantColours[2]};"
					></div>
				</div>
				<div class=" text-[7mm] leading-[7mm]">
					<span class="-mb-[0.5mm] line-clamp-1 w-full text-ellipsis pb-[0.5mm]">
						{album.release_date.substring(0, 4)}
						{album.album_type} &mdash; {album.artists.reduce(
							(str, artist, index) => (index === 0 ? artist.name : `${str}, ${artist.name}`),
							''
						)}
					</span>
				</div>
			</div>
			<span class="pt-[3mm] text-[6mm] italic leading-[6mm] opacity-80"
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
								<span class="italic">...{album.total_tracks - 34} more</span>
							{:else}
								<p>{j + i * 7 + 1}. {track.replace(/ \(feat\..*?\)$/, '')}</p>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class=" flex h-max flex-1 items-end justify-between gap-[6mm]">
			<div
				class="flex h-[12mm] w-1/2 flex-col justify-end gap-0 font-sans text-[3mm] leading-[3mm] opacity-50 [&>*]:text-ellipsis"
			>
				<span class="line-clamp-2 text-ellipsis"
					>{copyrights.charAt(0) === '©' ? copyrights : '© ' + copyrights}</span
				>
				<span>Content sourced from Spotify.</span>
			</div>
			{#if scannable}
				<img
					bind:this={scannableElement}
					src={scannable}
					class="h-[12mm] border border-black/10"
					alt=""
				/>
			{/if}
		</div>
	</div>
</div>
