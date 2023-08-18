let video;
let poseNet;
let poses = [];

function setup() {
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  let canvas = createCanvas(640, 480);
  canvas.position(650, 100);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Model Loaded!');
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  background(220); // Add background color to the canvas

  if (poses.length > 0) {
    let leftWristX = poses[0].pose.keypoints[9].position.x;
    let rightWristX = poses[0].pose.keypoints[10].position.x;

    let difference = floor(rightWristX - leftWristX);

    textSize(difference); // Update textSize with the calculated difference
    fill(255); // Set text color to white
    text('Your Name', 10, 100); // Adjust coordinates as needed
  }
}