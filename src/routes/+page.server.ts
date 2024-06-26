import { SPOTIFY_ID, SPOTIFY_SECRET } from '$env/static/private';

import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const spotifySdk = SpotifyApi.withClientCredentials(SPOTIFY_ID, SPOTIFY_SECRET);

const items = await spotifySdk.search('Hit me hard and', ['album']);

console.table(
	items.albums.items.map((item) => ({
		name: item.name,
		artist: item.artists[0].name,
		date: item.release_date,
		popularity: item.popularity
	}))
);

export const load = () => {
	return {
		items: items
	};
};
