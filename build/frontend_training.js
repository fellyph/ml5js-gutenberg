let mobilenet;
let classifier;
let video;
let label = 'WordPress And Machine Learning';
let product1;
let product2;
let trainButton;
let videoWidth = 320;
let videoHeight = 270;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function doTraining(loss) {
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
    classifier.classify(gotResults);
  }
}

function setup() {
    let myCanvas = createCanvas(videoWidth, videoHeight);
    myCanvas.parent(containerBlock);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
  
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);
  
    setupButtons();
}

function draw() {
  if(containerBlock) {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
  }
}

function setupButtons() {
  button1 = createButton('Happy');
  button1.parent(containerBlock);
  button1.mousePressed(() => { classifier.addImage('Happy')});

  button2 = createButton('Sad');
  button2.parent(containerBlock);
  button2.mousePressed(() => { classifier.addImage('Sad') });

  trainButton = createButton('train');
  trainButton.parent(containerBlock);
  trainButton.mousePressed(() => { classifier.train(doTraining) });
}



