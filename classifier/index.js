const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var natural = require('natural');
var classifier = new natural.BayesClassifier();

const trainData = require("./train_data.json");
function trainModel() {
    trainData.forEach(obj => classifier.addDocument(
        obj.key,
        obj.value
    ));
    classifier.train();

    classifier.save('classifier.json', function (err, classifier) {
        // the classifier is saved to the classifier.json file!
    });
}
//trainModel();

const testData = require("./test_data.json");
natural.BayesClassifier.load('classifier.json', null, function (err, classifier) {
    console.log("Actual - Predicted");
    testData.forEach(obj => console.log(
        obj.value, "-", classifier.classify(obj.key))
    );
});

app.get('/', (req, res) => {
    res.send('Classification server is running...')
})

app.listen(port, () => {
    console.log(`Classifier app is listening on port ${port}`)
})