<script>
	let spotifyUri = '';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="w-full max-w-screen-sm">
		<h1 class="mb-4 w-full text-center font-mono text-4xl font-bold capitalize">Posterfy</h1>

		<form
			on:submit|preventDefault={() => {
				window.location.href = `http://localhost:5173/${spotifyUri}`;
			}}
		>
			<input
				class="w-full border border-stone-800 bg-stone-50 bg-transparent px-4 py-2 outline-none transition-all placeholder:text-stone-400"
				placeholder="Enter a valid Spotify Album URI"
				type="text"
				bind:value={spotifyUri}
			/>
		</form>
	</div>
</div>
