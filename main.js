var objectArray = []
var video = ""
var objectStatus = ""
function preload(){
    video=createVideo("video.mp4")
    video.hide()
}
function setup(){
    canvas=createCanvas(400, 300)
    canvas.center()
}
function draw(){
    image(video, 0, 0, 400, 300)
    if (objectStatus != ""){
        objectDetected.detect(video, gotResult)
        for (i = 0; i < objectArray.length; i++) {
            document.getElementById("status").innerHTML = "Detected Object"
            document.getElementById("numberOfObjects").innerHTML = "No. of Objects Detected: " + objectArray.length
            fill("green")
            percent = floor(objectArray[i].confidence*100)
            text(objectArray[i].label + " " + percent + "%", objectArray[i].x, objectArray[i].y)
            noFill()
            stroke("blue")
            rect(objectArray[i].x, objectArray[i].y, objectArray[i].width, objectArray[i].height)
        }
        if(objectArray[i].label == object_name) { video.stop();
      objectDetector.detect(gotResult);
        document.getElementById("object_status").innerHTML = object_name + " Found"; synth = window.speechSynthesis; utterThis = new SpeechSynthesisUtterance(object_name + "Found"); synth.speak(utterThis);
        } else { document.getElementById("object_status").innerHTML = object_name + " Not Found"; }
    }
}
function start(){
    objectDetected = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Detecting Object"
}
function modelLoaded(){
    console.log("Model loaded successfully")
    objectStatus = true
    video.loop()
    video.speed(1)
    video.volume(0)
}
function gotResult(error, result){
    if (error){
        console.log("An error has occured.")
    }
    else{
        console.log(result)
        objectArray = result
    }
}