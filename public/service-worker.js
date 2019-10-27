/* eslint-disable */
importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
)

if (workbox) {
	console.log('Yay! Workbox is loaded 🎉')
} else {
	// prettier-ignore
	console.log('Boo! Workbox didn\'t load 😬')
}

workbox.routing.registerRoute(
	/\.js$/,
	new workbox.strategies.StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: 'js-cache',
	})
)

workbox.routing.registerRoute(
	// Cache CSS files.
	/\.css$/,
	// Use cache but update in the background.
	new workbox.strategies.StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: 'css-cache',
	})
)

workbox.routing.registerRoute(
	// Cache image files.
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	// Use the cache if it's available.
	new workbox.strategies.CacheFirst({
		// Use a custom cache name.
		cacheName: 'image-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache only 60 images.
				maxEntries: 60,
				// Cache for a maximum of a day.
				maxAgeSeconds: 1 * 24 * 60 * 60,
			}),
		],
	})
)

/* eslint-disable */
