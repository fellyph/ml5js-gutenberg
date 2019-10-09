let featureExtrator;
let classifier;
let video;
let controlsContainer;
let containerBlock;
let label = 'Loading...';
let scale = 0;
let productURL = '#';
let linkProduct;
let imageWidth = 320;
let imageHeight = 270;
let pluginURL = wpProperties.pluginsUrl;

// we can call json API to call the products a label them by ID
let data =  {
  'Product 1': {
    title: 'The Subtle Art of not giving a F*CK – Mark Manson',
    'url': 'http://wcthessaloniki.local/the-subtle-art-of-not-giving-a-fck-mark-manson/'
  },
  'Product 2': {
    title: 'The Martian – Andy Weir',
    'url': 'http://wcthessaloniki.local/the-martian-andy-weir/'
  },
  'Product 3': {
    title: 'The girl on the train – Paula Hawkins',
    'url': 'http://wcthessaloniki.local/the-girl-on-the-train-paula-hawkins/'
  },
};

function mobileNetIsReady() {
  classifier.load(`${pluginURL}/build/assets/model.json`, customModelIsReady);
}

function customModelIsReady() {
  classifier.classify(gotResults);
}

function gotResults(error, result) {
  if (error) {
   label = error;
  } else {
    console.log(result[0].label, result[0].confidence);
    if(result[0].confidence > 0.85) {
      addLink(data[result[0].label].title, data[result[0].label].url );
    } else {
      label = 'Please, show your book';
    }
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

  featureExtrator = ml5.featureExtractor('MobileNet', mobileNetIsReady);
  classifier = featureExtrator.classification(video, { numLabels: 3 }, () => {
    console.log('classifier is ready!')
  });

  setupControls()
}

function setupControls() {
  controlsContainer = createDiv();
  controlsContainer.parent(containerBlock);
  linkProduct = createA(productURL, 'Buy it!');
  linkProduct.parent(controlsContainer);
  controlsContainer.hide();
}

function addLink(title, url) {
  label = title;
  linkProduct.attribute('href', url);
  controlsContainer.show()
}

function draw() {
  background(0);
  image(video, 0, 0, imageWidth, imageHeight - 30);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}