'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"version.json": "1d024426761394fa772f05e695914a66",
"index.html": "7fa4b8c9d82843ed23b2b2ef8cb54985",
"/": "7fa4b8c9d82843ed23b2b2ef8cb54985",
"flutter_bootstrap.js": "cbba4d4b0d2c88ab48c11df503d47218",
"main.dart.js": "7abab6c873aa245d6adcd3c9c25075ee",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"manifest.json": "bf0060ec8a5cfc9966b2782c59832697",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "1de2f215e0d76700915ee6afef6bfafe",
"assets/AssetManifest.bin.json": "4f0923d49e5f3abd9e2e848c8d2c3ed8",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/fonts/MaterialIcons-Regular.otf": "d7f4dbacaa7f970028e8e646fc7b44eb",
"assets/AssetManifest.json": "03fc7484e7113e00eecdb208dc3e41f6",
"assets/assets/images/rose.jpeg": "468f67e27f8e5d9d854c501ec9000c9c",
"assets/assets/images/saitama.jpeg": "e75e2a39f52e43a3de554d408995b6ec",
"assets/assets/images/deku.jpeg": "5bfda096687a35683f78810edc985f4c",
"assets/assets/images/shirogane.jpeg": "d2dbc6ade79e45fbb15b143b74228102",
"assets/assets/images/mattress6.jpeg": "9ad4819c1da2cdf4c8332435bbdd5d00",
"assets/assets/images/tanjiro.jpeg": "06cf4b00ab36ee7688ab6dc31c249fb1",
"assets/assets/images/luffy.jpeg": "471662874b12fe95bad3a10e612b741e",
"assets/assets/images/mattress3.jpeg": "f7022bd36f54b32206eb33649fadbad6",
"assets/assets/images/cycle02.jpeg": "e9f26328f89f8eca02218025684c8bc8",
"assets/assets/images/naruto.jpeg": "46ad4ea65cde3660d73b38ea420564ab",
"assets/assets/images/mattress.jpeg": "2891f8eff03ed237f6f21d80f902af2c",
"assets/assets/images/cycle6.jpeg": "d6be0619cf7a7e763a41698dc808eb37",
"assets/assets/images/kitahara.jpeg": "f2ced9d4a62b602e04d3a86ffe79baf6",
"assets/assets/images/cycle3.jpeg": "dccb81bfd9ef099dee8df8911798bb74",
"assets/assets/images/mattress1.jpeg": "1451552cb6c713e3b49a6bca8008b7ac",
"assets/assets/images/mattress4.jpeg": "24471a0da2886d09a0db42711d2d082c",
"assets/assets/images/placeholder.png": "9ad6b4eb70cad14706984c9f88d0863a",
"assets/assets/images/cycle2.jpeg": "cfa15c167d237a21d36b6fc44a28d6d3",
"assets/assets/images/isagi.jpeg": "982e3e4191f561647b009ed495395b0a",
"assets/assets/images/mattress2.jpeg": "2610a120527bc172b9ea0c1762cc10d9",
"assets/assets/images/cycle4.jpeg": "1378e246aa6541376af894519c004cf2",
"assets/assets/images/cycle5.jpeg": "d8aa2f8d1fa97756cf877bc010295c0a",
"assets/assets/images/mattress5.jpeg": "870f2a6d45aacc231645b3798662ef02",
"assets/assets/images/cycle1.jpeg": "ee2fc19c07f5017168cd3ddedb53b6c7",
"assets/assets/images/cycle01.jpeg": "862ec4927c552956f6e5bdd91a287e29",
"assets/AssetManifest.bin": "0bf8e80f83701f488104b07d250d3446",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "c365717684165fc416dd056708b56e1e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
