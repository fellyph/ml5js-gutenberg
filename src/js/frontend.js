let mobilenet;
let classifier;
let video;
let label = 'wc thessaloniki';
let ukeButton;
let whistleButton;
let trainButton;
let container = document.querySelector('.product-classifier');

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.child(container);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  ukeButton = createButton('happy');
  ukeButton.child(container);
  ukeButton.mousePressed(function() {
    classifier.addImage('happy');
  });

  whistleButton = createButton('sad');
  whistleButton.child('container');
  whistleButton.mousePressed(function() {
    classifier.addImage('sad');
  });

  trainButton = createButton('train');
  trainButton.child('container');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}