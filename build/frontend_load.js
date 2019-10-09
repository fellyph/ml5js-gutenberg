let featureExtrator;
let classifier;
let video;
let containerBlock;
let label = 'Loading...';
let scale = 0;
let imageWidth = 320;
let imageHeight = 270;
let pluginURL = wpProperties.pluginsUrl;

function modelIsReady() {
  classifier.load(`${pluginURL}/build/assets/model.json`, customModelIsReady);
}

function customModelIsReady() {
  label = 'Model is ready!';
  classifier.classify(gotResults);
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

  featureExtrator = ml5.featureExtractor('MobileNet', modelIsReady);
  classifier = featureExtrator.classification(video, { numLabels: 3 }, () => {
    console.log('classifier is ready!')
  });
}

function draw() {
  background(0);
  image(video, 0, 0, imageWidth, imageHeight - 30);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}