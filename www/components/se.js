// This is a JavaScript file
var se = se || {};

        se.media = null;
        se.mediaTimer = null;
        se.srcFile = "se/snare.mp3";

        se.playSound = function () {
            // play the media file one time.
            se.media.play({numberOfLoops: 0});
        }

        se.onSuccess = function(){
            console.log("Successfully initialize a media file.");
        }

        se.onError=function (error){
            console.log("Failed to initialize a media file. [ Error code: " + error.code + ", Error message: " + error.message + "]");
        }
        
        