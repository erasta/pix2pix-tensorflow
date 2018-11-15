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
    startWebcam();
    // snapshot();
    // stopWebcam();
}

function snapshot() {
    // Draws current image from the video element into the canvas
    canvas.height = video.videoHeight * canvas.width / video.videoWidth;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var sobelData = Sobel(imageData);

    // [sobelData].toImageData() returns a new ImageData object
    var sobelImageData = sobelData.toImageData();
    inverseImage(sobelImageData);
    thresholdImage(sobelImageData, 240);
    ctx.putImageData(sobelImageData, 0, 0);
    editors[0].buffer.drawImage(canvas, 0, 0, canvas.width, canvas.height);//, 0, 0, SIZE, SIZE);
}

function inverseImage(image) {
    for (var y = 0; y < image.height; ++y) {
        for (var x = 0; x < image.width; ++x) {
            image.data[4 * (x + image.width * y) + 0] = 255 - image.data[4 * (x + image.width * y) + 0];
            image.data[4 * (x + image.width * y) + 1] = 255 - image.data[4 * (x + image.width * y) + 1];
            image.data[4 * (x + image.width * y) + 2] = 255 - image.data[4 * (x + image.width * y) + 2];
        }
    }
}

function thresholdImage(image, th) {
    for (var y = 0; y < image.height; ++y) {
        for (var x = 0; x < image.width; ++x) {
            var r = image.data[4 * (x + image.width * y) + 0];
            var g = image.data[4 * (x + image.width * y) + 1];
            var b = image.data[4 * (x + image.width * y) + 2];
            if (r < th || g < th || b < th) {
                image.data[4 * (x + image.width * y) + 0] = 0;
                image.data[4 * (x + image.width * y) + 1] = 0;
                image.data[4 * (x + image.width * y) + 2] = 0;
            }
        }
    }
}

init();
