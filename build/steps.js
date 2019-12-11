// 1 - loading the feature extrator
featureExtrator = ml5.featureExtractor('MobileNet', mobileNetIsReady)

// 2 - defining source of our classification
classifier = featureExtrator.classification(video, { numLabels: 3 });

// 3 - adding labels
classifier.addImage('Happy')

//4 - Training
classifier.train(whileTraining);

// 5 - classifing 
classifier.classify(gotResults);

// 6 - load pre-trained model
classifier.load(`${pluginURL}/build/assets/model.json`, customModelIsReady);