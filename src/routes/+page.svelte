<script lang="ts">
	//import Graduation from '$lib/img/Graduation_(album).jpg';
	import hmhas from '$lib/img/download.jpg';

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

	// Helper function to split array into chunks
	function chunkArray(array: Array<String>, size: number) {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	}

	const columns = chunkArray(tracklist, 6);
</script>

<div class="paper-a4 font-instrument bg-[#FFFCF0] drop-shadow">
	<img src={hmhas} class="mb-[4mm] aspect-square w-full" alt="" />
	<span class="ptxt-title font-bold italic">HIT ME HARD AND SOFT</span>
	<div class="flex items-baseline justify-between">
		<div class="mt-[1mm] flex h-fit items-baseline gap-[4mm]">
			<div class="flex h-[8mm] gap-[1mm]">
				<div class="aspect-square h-full bg-[#041222]"></div>
				<div class="aspect-square h-full bg-[#032850]"></div>
				<div class="aspect-square h-full bg-[#6A7064]"></div>
			</div>
			<span class="text-[8mm] leading-[8mm]">Billie Eilish &mdash; 2024</span>
		</div>
		<span class="text-[6mm] italic opacity-80">14 songs, 44m</span>
	</div>
	<div class="flex font-sans">
		{#each columns as column, colIndex}
			<div class="w-1/3">
				{#each column as track, trackIndex}
					<p>{colIndex * 6 + trackIndex + 1}. {track}</p>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.paper-a4 {
		width: 210mm;
		min-height: 297mm;
		padding: 10mm 16mm;
		border: 1px #d3d3d3 solid;
		border-radius: 5px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

	.ptxt-title {
		line-height: 20mm;
		font-size: 20mm;
	}
</style>
