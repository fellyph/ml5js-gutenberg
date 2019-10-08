let mobilenet;
let classifier;
let video;
let label = 'wc thessaloniki';
let product1;
let product2;
let trainButton;
let videoWidth = 320;
let videoHeight = 270;
let barWidth = 20;
let barHeight = videoHeight - 2;
let percentage = 1;

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
    label = `${result[0].label}`;
    percentage = result[0].confidence;
    classifier.classify(gotResults);
  }
}

function setup() {
  let myCanvas = createCanvas(videoWidth + barWidth, videoHeight);
  let containerBlock = document.querySelector('.product-classifier');

  myCanvas.parent(containerBlock);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  product1 = createButton('Product 1');
  product1.parent(containerBlock);
  product1.mousePressed(function() {
    classifier.addImage('Product 1');
  });

  product2 = createButton('Product 2');
  product2.parent(containerBlock);
  product2.mousePressed(function() {
    classifier.addImage('Product 2');
  });

  trainButton = createButton('train');
  trainButton.parent(containerBlock);
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
  rect(videoWidth - 1, 1, barWidth, barHeight * percentage);
}