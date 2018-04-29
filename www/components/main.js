    // The watch id references the current `watchAcceleration`
    var watchID = null;

    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
        startWatch();
        se.media = new Media (getPath() + se.srcFile , se.onSuccess, se.onError);
    }

    // Start watching the acceleration
    //
    function startWatch() {

        // Update acceleration every 3 seconds
        var options = { frequency: 100 };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    //
    function onSuccess(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
        // if shaking then sounds
        if(isShaked(acceleration.x,acceleration.y,acceleration.z)){
            //console.log('Shaked');
            se.playSound();
        }
    }

    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('onError!');
    }
    
    // isShaked: is shaked the phone
    //
    var _beforeAcceleration = {};
    _beforeAcceleration.x = 0.0;
    _beforeAcceleration.y = 9.8;
    _beforeAcceleration.z = 0.0;
    
    function isShaked(x,y,z) {
        var da = Math.pow(x,2)
               +Math.pow(y,2)
               +Math.pow(z,2);
        var db = Math.pow(_beforeAcceleration.x,2)
               +Math.pow(_beforeAcceleration.y,2)
               +Math.pow(_beforeAcceleration.z,2);
        _beforeAcceleration.x = x;
        _beforeAcceleration.y = y;
        _beforeAcceleration.z = z;
        
        return 4.0 < da - db;
    }
    // getPath: get current path
    //
    function getPath() {
            var str = location.pathname;
            var i = str.lastIndexOf('/');
            return str.substring(0,i+1);
    }
    