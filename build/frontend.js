let featureExtrator;
let classifier;
let video;
let controlsContainer;
let containerBlock;
let label = 'wc thessaloniki';
let product1;
let product2;
let product3;
let trainButton;
let saveButton;
let scale = 0;
let imageWidth = 320;
let imageHeight = 270;

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
    console.log(result)
    label = `${result[0].label}`;
    scale = result[0].confidence;
    classifier.classify(gotResults);
  }
}

function setup() {
  containerBlock = document.querySelector('.product-classifier');
  let myCanvas = createCanvas(imageWidth, imageHeight);

  myCanvas.parent(containerBlock);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  featureExtrator = ml5.featureExtractor('MobileNet');
  classifier = featureExtrator.classification(video, { numLabels: 3 }, () => {
    console.log('classifier is ready!')
  });
  setupButton();
}

function setupButton() {
  controlsContainer = createDiv();
  controlsContainer.parent(containerBlock);

  product1 = createButton('Product 1');
  product1.parent(controlsContainer);
  product1.mousePressed(function() {
    classifier.addImage('Product 1');
  });

  product2 = createButton('Product 2');
  product2.parent(controlsContainer);
  product2.mousePressed(function() {
    classifier.addImage('Product 2');
  });

  product3 = createButton('Product 3');
  product3.parent(controlsContainer);
  product3.mousePressed(function() {
    classifier.addImage('Product 3');
  });

  trainButton = createButton('train');
  trainButton.parent(controlsContainer);
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

  saveButton = createButton('Saves');
  saveButton.parent(controlsContainer);
  saveButton.mousePressed(function() {
    classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0, imageWidth, imageHeight - 30);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}