let ml5 = require("ml5");

const HashCode = (s) => {
  let hash = 0;
  if (s.length == 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

const options = {
  task: "classification",
  debug: false,
};

const nn = ml5.neuralNetwork(options);

const model = {
  init(data, handleTrainingCompleted, snack) {
    data.forEach((item) => {
      const inputs = {
        snake: HashCode(JSON.stringify(item.snake)),
        snack: HashCode(JSON.stringify(item.snack)),
      };

      const output = {
        direction: item.direction,
      };
      nn.addData(inputs, output);
    });

    console.log("normalize data");
    nn.normalizeData();

    // Step 7: use the trained model
    const finishedTraining = () => {
      handleTrainingCompleted("finish training");
    };

    // Step 6: train your neural network
    const trainingOptions = {
      epochs: 32,
      batchSize: 12,
    };
    console.log("train data");
    nn.train(trainingOptions, finishedTraining);
  },
  // Step 8: make a classification
  classify(item, handleResult) {
    // console.log(data)
    const input = {
      snake: HashCode(JSON.stringify(item.snake)),
      snack: HashCode(JSON.stringify(item.snack)),
    };

    const handleResults = (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("classify result:", result); // {label: 'red', confidence: 0.8};
      handleResult(result);
    };
    nn.classify(input, handleResults);
  },
};

export default model;
export { HashCode };
