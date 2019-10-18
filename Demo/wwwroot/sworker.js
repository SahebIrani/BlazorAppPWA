console.log("This is service worker talking .. !!!!");
var cacheName = 'SinjulMSBH Blazor App PWA';
var filesToCache = [
    '/',
    // Static Html and css files
    '/index.html',
    '/offline.html',
    '/css/site.css',
    '/css/bootstrap/bootstrap.min.css',
    '/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    '/css/open-iconic/font/fonts/open-iconic.woff',
    // Blazor framework
    '/_framework/blazor.server.js',
    '/_framework/blazor.webassembly.js',
    '/_framework/blazor.boot.json',
    // Our additional files
    '/manifest.json',
    '/serviceworker.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // The web assembly/.net dll's
    '/_framework/wasm/mono.js',
    '/_framework/wasm/mono.wasm',
    '/_framework/_bin/Microsoft.AspNetCore.Authorization.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.Browser.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Components.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Metadata.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.Options.dll',
    '/_framework/_bin/Microsoft.Extensions.Primitives.dll',
    '/_framework/_bin/Microsoft.JSInterop.dll',
    '/_framework/_bin/Mono.Security.dll',
    '/_framework/_bin/Mono.WebAssembly.Interop.dll',
    '/_framework/_bin/mscorlib.dll',
    '/_framework/_bin/System.Buffers.dll',
    '/_framework/_bin/System.ComponentModel.Annotations.dll',
    '/_framework/_bin/System.Core.dll',
    '/_framework/_bin/System.dll',
    '/_framework/_bin/System.Memory.dll',
    '/_framework/_bin/System.Net.Http.dll',
    '/_framework/_bin/System.Numerics.Vectors.dll',
    '/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll',
    '/_framework/_bin/System.Text.Json.dll',
    '/_framework/_bin/System.Threading.Tasks.Extensions.dll',
    // Application pages
    '/Counter',
    '/FetchData',
    '/Index',
    // The compiled project .dll's
    '/_framework/_bin/HostedBlazorApplication.Client.dll',
    '/_framework/_bin/HostedBlazorApplication.Shared.dll'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install .. !!!!');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell .. !!!!');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request).then(response => {
                caches.put(event.request, response.clone());
                return response;
            });
        })
    );
});