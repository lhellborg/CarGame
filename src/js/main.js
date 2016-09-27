// register a service worker
if ('serviceWorker' in navigator) {
    // register a serviceworker
    navigator.serviceWorker.register('/serWor.js', {
        scope: '/'
    }).then(function(registration) {
        'use strict';
        if (!navigator.serviceWorker.controller) {
            return; //no service worker
        }

        if (registration.waiting) { //check to see if there is a service worker waiting to replace the active one
            registration.waiting.postMessage({
                action: 'skipWaiting'
            }); //all updates should go out directly send a message to the service Worker script
            console.log('service worker waiting');
        }
        console.log('registered a service worker with scope: ', registration.scope);

    }).catch(function(err) {
        'use strict';
        console.log('serviceWorker not registered: ', err);
    });
}