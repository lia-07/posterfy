<script lang="ts">
	import Poster from '$lib/components/Poster.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.items);
	const album = data.items;

	let spotifyLink: string;
</script>

<div class="h-screen overflow-clip">
	<form
		class=" w-full"
		on:submit|preventDefault={() => {
			let spotifyUri = spotifyLink.match(/album\/([a-zA-Z0-9]{22})/);
			if (spotifyUri) {
				window.location.href = `http://localhost:5173/${spotifyUri[1]}`;
			} else {
				alert('Invalid Spotify link');
			}
		}}
	>
		<input
			class="w-full border border-stone-800 bg-stone-50 bg-transparent px-4 py-2 outline-none transition-all placeholder:text-stone-400"
			placeholder="Enter a valid Spotify Album Link"
			type="text"
			bind:value={spotifyLink}
		/>
	</form>
	<div class="flex h-full w-full items-center justify-center p-8">
		<Poster {album}></Poster>
	</div>
</div>
