//the serviceWorker
var staticCacheName = 'carGameStatic-v1';


self.addEventListener('install', function(event) {
    // save the scripts and styles needed for the page in cache
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                'js/app.js',
                '/main.js',
                'css/main.css',
                '/favicon.ico',
                '/favicon-16x16.png',
                '/favicon-32x32.png',
                '/apple-touch-icon.png',
                '/index.html',
                '/manifest.json',
                'images/airplane.svg',
                'images/arrowIn.png',
                'images/beetle.svg',
                'images/beWare.png',
                'images/bike.svg',
                'images/boat-1.svg',
                'images/boat-2.svg',
                'images/boat.svg',
                'images/bridge.svg',
                'images/bus.svg',
                'images/car.svg',
                'images/castle.svg',
                'images/cityscape.svg',
                'images/classic-car.svg',
                'images/crossWalk.png',
                'images/desert-1.svg',
                'images/double-decker-bus.svg',
                'images/endmainRoad.png',
                'images/endMotorway.svg',
                'images/endRunover.png',
                'images/fields-1.svg',
                'images/forbidden.png',
                'images/forbud.png',
                'images/forest.svg',
                'images/giveWay.png',
                'images/goat.svg',
                'images/goFirst.png',
                'images/goin.svg',
                'images/heightLImit.png',
                'images/helicopter.svg',
                'images/hills.svg',
                'images/home-1.svg',
                'images/home.svg',
                'images/hook.png',
                'images/horse.svg',
                'images/hot-air-balloon.svg',
                'images/house-boat.svg',
                'images/infartforbud.png',
                'images/island.svg',
                'images/jeep.svg',
                'images/leaveWay.png',
                'images/locomotive.svg',
                'images/lorry.svg',
                'images/lutning.png',
                'images/MainRoad.png',
                'images/mill.svg',
                'images/minibus.svg',
                'images/minivan-taxi.svg',
                'images/minivan.svg',
                'images/monorail.svg',
                'images/motorbike.svg',
                'images/motorway.svg',
                'images/mountains.svg',
                'images/noRightTurn.png',
                'images/nuclear-plant.svg',
                'images/parrot.svg',
                'images/pig.svg',
                'images/quad.svg',
                'images/rabbit.svg',
                'images/rightArrow.png',
                'images/river.svg',
                'images/roads.svg',
                'images/roadSplit.svg',
                'images/sailboat.svg',
                'images/sailing-ship.svg',
                'images/school-bus.svg',
                'images/sea.svg',
                'images/smallerRoad.png',
                'images/speed90.png',
                'images/speed110.png',
                'images/speed120.png',
                'images/sport-car.svg',
                'images/spruce.svg',
                'images/station-wagon.svg',
                'images/stolpe.gif',
                'images/stolpe2.gif',
                'images/stop.png',
                'images/stopsignal.png',
                'images/taxi.svg',
                'images/tractor.svg',
                'images/train-1.svg',
                'images/train-2.svg',
                'images/train.svg',
                'images/tram.svg',
                'images/trees.svg',
                'images/tricycle.svg',
                'images/trolleybus.svg',
                'images/truck.svg',
                'images/turn.png',
                'images/turnright.png',
                'images/twoWayTurn.png',
                'images/underground.svg',
                'images/van.svg',
                'images/village.svg',
                'images/volkswagen-van.svg',
                'images/warning.png',
                'images/warningAirplane.png',
                'images/warningBlock.png',
                'images/warningCross.png',
                'images/warningMoose.png',
                'images/warningQue.png',
                'images/warningRail.png',
                'images/warningRoad.png',
                'images/warningRoadWork.png',
                'images/warningRoundabout.png',
                'images/warningSign.png',
                'images/warningTrain.png',
                'images/warningTunnel.png',
                'images/warningTwoWay.png',
                'images/warningWater.png',
                'images/warningWind.png',
                'images/waterfall-1.svg',
                'images/waterfall.svg',
                'images/white.png',
                'images/windmills.svg',
                'images/wolf.svg'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all( //wait for all promises to resolve
                cacheNames.filter(function(cacheName) {
                    // delete all the old versions of our cache that is not the current cache
                    return cacheName.startsWith('carGameStatic-') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
    // return with cached item if there is any otherwise take them from network
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});


// listen for a waiting service worker to install
self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
        console.log('waiting worker installed');
    }
});

// listen for push notifications
self.addEventListener('push', function(event) {
    console.log('Push message', event);
    var title = 'Push message';
    event.waitUntil(
        self.registration.showNotification(title, {
            "body": "New articles added",
            'icon': 'images/favicon-16x16.png',
            "vibrate": [200, 100, 200, 100, 200, 100, 400]
        }));
});