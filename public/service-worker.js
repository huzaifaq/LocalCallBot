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
	'/',
	// Use cache but update in the background.
	new workbox.strategies.StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: 'page-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache for a maximum of 3 days.
				maxAgeSeconds: 3 * 24 * 60 * 60,
			}),
		],
	})
)

workbox.routing.registerRoute(
	/\/api\//,
	// Use cache but update in the background.
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'api-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache for a maximum of 3 days.
				maxAgeSeconds: 3 * 24 * 60 * 60,
			}),
		],
	})
)

workbox.routing.registerRoute(
	/\.js$/,
	// Use cache but update in the background.
	new workbox.strategies.StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: 'js-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache for a maximum of 3 days.
				maxAgeSeconds: 3 * 24 * 60 * 60,
			}),
		],
	})
)

workbox.routing.registerRoute(
	/\.css$/,
	// Use cache but update in the background.
	new workbox.strategies.StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: 'css-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache for a maximum of 3 days.
				maxAgeSeconds: 3 * 24 * 60 * 60,
			}),
		],
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
				// Cache for a maximum of 7 days.
				maxAgeSeconds: 7 * 24 * 60 * 60,
				// Purge on Quota error
				purgeOnQuotaError: true,
			}),
		],
	})
)
