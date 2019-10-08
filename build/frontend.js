let mobilenet;
let classifier;
let video;
let label = 'wc thessaloniki';
let product1;
let Product2;
let trainButton;
let scale = 0;
let imageWidth = 320;
let imageHeight = 270;

function modelReady() {
  console.log('Model is ready !!!');
}

function videoReady() {
  console.log('Video is ready !!!');
}

function whileTraining(loss) {
  if (loss === null) {
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
    scale = result[0].confidence;
    classifier.classify(gotResults);
  }
}

function setup() {
  let containerBlock = document.querySelector('.product-classifier');
  let myCanvas = createCanvas(imageWidth, imageHeight);
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

  Product2 = createButton('Product 2');
  Product2.parent(containerBlock);
  Product2.mousePressed(function() {
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
  image(video, 0, 0, imageHeight, imageHeight - 30);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
  rect()
}