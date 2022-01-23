import { maxSize } from "./snake";

const ml5 = require("ml5");
// const dataModel = require("../model/model.json");
// const metaData = require("../model/model_meta.json");
// const weights = require("../model/model.weights.bin");

// const HashCode = (s) => {
//   let hash = 0;
//   if (s.length === 0) return hash;
//   for (let i = 0; i < s.length; i++) {
//     let char = s.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash = hash & hash; // Convert to 32bit integer
//   }
//   return hash;
// };

const GenerateInput = (snake, snack) => {
  let inputs = {}
  for (let i=0; i<maxSize; i++) {
    inputs["snake_" + i + "_X"] = snake[i] ? snake[i][0] : 0;
    inputs["snake_" + i + "_Y"] = snake[i] ? snake[i][1] : 0;
  }
  inputs["snack_X"] = snack[0];
  inputs["snack_Y"] = snack[1];

  return inputs;
}

const HashCode = (s) => {
  let h;
  for(let i = 0; i < s.length; i++) 
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

  return h;
}

const options = {
  task: "classification",
  // task: "regression",
  debug: false,
};

const trainingOptions = {
  epochs: 128,
  batchSize: 512,
};

const nn = ml5.neuralNetwork(options);

const model = {
  init(data, handleTrainingCompleted) {
    console.log("init:", data);
    data.forEach((item) => {
      console.log(item);
      const inputs = item.inputs;
      // const inputs = {
      //   snake: item.snake,
      //   snackX: item.snackX,
      //   snackY: item.snackY,
      // };

      const output = {
        direction: item.output,
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
      console.log("model loaded");
      handleTrainingCompleted("finish training");
    }

    nn.load({
      model: "../model/model.json",
      metadata: "../model/model_meta.json",
      weights: "../model/model.weights.bin"
    }, modelLoaded);
  },
  classify(item, handleResult) {
    console.log("classify:", item);
    const input = item.inputs;
    // const input = {
    //   snake: item.snake,
    //   snackX: item.snackX,
    //   snackY: item.snackY,
    // };

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
export { HashCode , GenerateInput};