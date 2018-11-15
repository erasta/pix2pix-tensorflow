//--------------------
// GET USER MEDIA CODE
//--------------------
var video;

function startWebcam() {
    video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (stream) {
        video.srcObject = stream;
    }).catch(function (error) {
        console.log('error', error);
    });
}

function stopWebcam() {
    video.srcObject.getTracks()[0].stop()
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function init() {
    // Get the canvas and obtain a context for
    // drawing in it
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
}

function snapshot() {
    // Draws current image from the video element into the canvas
    canvas.height = video.videoHeight * canvas.width / video.videoWidth;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
init();
