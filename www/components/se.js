// This is a JavaScript file
var se = {};

        se.media = null;
        se.mediaTimer = null;
        se.srcFile = "se/snare.mp3";

       
        function onDeviceReady() {
            console.log("ready");
            media = new Media (getPath() + srcFile , onSuccess, onError);
        }

        function playSound(){
            // play the media file one time.
            media.play({numberOfLoops: 0});
            // start the timer
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // Return a current playback position
                    media.getCurrentPosition(
                        //A Callback function if it's success
                        function(position) {
                            if (position > -1) {
                                //If the playback stops at "-0.001" position, set the timer to 0.
                                if(position == -0.001){
                                    position = 0;
                                }
                                setAudioPosition((position) + " sec");
                            }
                        },
                        //A callback function in case of failure
                        function(error) {
                            console.log("Error getting pos=" + error);
                            setAudioPosition("Error: " + error);
                        }
                    );
                }, 1000);
            }
        }

        function pauseSound(){
            if (media) {
                media.pause();
            }
        }

        function stopSound(){
            if (media) {
                media.stop();
            }
        }

        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }

        function onSuccess(){
            console.log("Successfully initialize a media file.");
        }

        function onError(error){
            console.log("Failed to initialize a media file. [ Error code: " + error.code + ", Error message: " + error.message + "]");
        }
        
        