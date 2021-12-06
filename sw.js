importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox) {
	console.log("Ajua! workbox esta cargado! :) ");
	workbox.precaching.precacheAndRoute([]);

	/* cache de imagenes en la  , por ejempo  (others) editamos a otras carpetas que se obtuvieron y configuramos en el archivo sw-config.js*/
	workbox.routing.registerRoute(
		/(.*)others(.*)\.(?:png|gif|jpg)/,
		new workbox.strategies.CacheFirst({
			cacheName: "images",
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries:50,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				})
			]
		})
	);


workbox.routing.registerRoute(
		/.*\.(?:css|js|scss|)/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "assets",
	})
);

workbox.routing.registerRoute(
	new RegExp("https:fonts.(?:googleapis|gstatic).com/(.*)"),
	new workbox.strategies.CacheFirst({
		cacheName: "google-fonts",
		plugins:[
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200],
			}),
		],
	})

);

workbox.googleAnalytics.initialize();

workbox.core.skipWainting();
workbox.core.clientsClain();
} else {
	console.log("¡Fallo! workbox no esta cargado"):

}
