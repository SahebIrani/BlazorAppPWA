const filesToCache = [
    // Blazor standard requirements
    '/_framework/_bin/Microsoft.AspNetCore.Blazor.Browser.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    '/_framework/_bin/Microsoft.AspNetCore.Blazor.TagHelperWorkaround.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '/_framework/_bin/Microsoft.JSInterop.dll',
    '/_framework/_bin/Mono.WebAssembly.Interop.dll',
    '/_framework/_bin/mscorlib.dll',
    '/_framework/_bin/System.Core.dll',
    '/_framework/_bin/System.dll',
    '/_framework/_bin/System.Net.Http.dll',
    '/_framework/wasm/mono.js',
    '/_framework/wasm/mono.wasm',
    '/_framework/blazor.boot.json',
    '/_framework/blazor.webassembly.js',

    // App specific requirements
    '/_framework/_bin/BlazorAppUpdates.dll',
    '/_framework/_bin/BlazorAppUpdates.pdb',
    '/css/bootstrap/bootstrap.min.css',
    '/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    '/css/site.css',
    '/favicon.ico',
    '/index.html',

    // Service Worker
    '/blazorSWRegister.js',

    // Application Manifest (PWA)
    '/manifest.json'
];

const staticCacheName = 'blazor-cache-v1';


self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});