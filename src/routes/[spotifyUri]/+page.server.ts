import { SPOTIFY_ID, SPOTIFY_SECRET } from '$env/static/private';

import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { error } from '@sveltejs/kit';

const spotifySdk = SpotifyApi.withClientCredentials(SPOTIFY_ID, SPOTIFY_SECRET);

export const load = async ({ params }) => {
	try {
		const items = await spotifySdk.albums.get(params.spotifyUri);
		return {
			items: items
		};
	} catch (err) {
		error(500);
	}
};
