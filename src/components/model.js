const ml5 = require("ml5");
// const dataModel = require("../model/model.json");
// const metaData = require("../model/model_meta.json");
// const weights = require("../model/model.weights.bin");

const HashCode = (s) => {
  let hash = 0;
  if (s.length === 0) return hash;
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

const trainingOptions = {
  epochs: 128,
  batchSize: 1024,
};

const nn = ml5.neuralNetwork(options);

const model = {
  init(data, handleTrainingCompleted) {
    data.forEach((item) => {
      const inputs = {
        snake: item.snake,
        snackX: item.snackX,
        snackY: item.snackY,
      };

      const output = {
        direction: item.direction,
      };
      nn.addData(inputs, output);
    });

    console.log("normalize data", data);
    nn.normalizeData();

    // Step 7: use the trained model
    const finishedTraining = () => {
      handleTrainingCompleted("finish training");
    };

    const whileTraining = (epoch, loss) => {
      // console.log("epoch:", epoch, ", loss:", loss);
    };

    console.log("train data");
    nn.train(trainingOptions, whileTraining, finishedTraining);
  },
  load(handleTrainingCompleted) {
    const modelLoaded = () => {
      // continue on your neural network journey
      // use nn.classify() for classifications or nn.predict() for regressions
      console.log("model loaded");
      handleTrainingCompleted("finish training");
    }

    nn.load({
      model: "../model/model.json",
      metadata: "../model/model_meta.json",
      weights: "../model/model.weights.bin"
    }, modelLoaded);
  },
  // Step 8: make a classification
  classify(item, handleResult) {
    // console.log(data)
    const input = {
      snake: item.snake,
      snackX: item.snackX,
      snackY: item.snackY,
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
  saveModel() {
    nn.saveData("snake_game");
  },
  save() {
    nn.save();
  },
};

export default model;
export { HashCode };
