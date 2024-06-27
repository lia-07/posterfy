<script>
	let spotifyLink = '';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="w-full max-w-screen-sm">
		<h1 class="mb-4 w-full text-center font-mono text-4xl font-bold capitalize">Posterfy</h1>

		<form
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
	</div>
</div>
