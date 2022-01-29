import { maxSize } from "./snake";

const ml5 = require("ml5");

const GenerateInput = (snake, snack) => {
  let inputs = {};
  for (let i = 0; i < maxSize; i++) {
    inputs["snake_" + i + "_X"] = snake[i] ? snake[i][0] : 0;
    inputs["snake_" + i + "_Y"] = snake[i] ? snake[i][1] : 0;
  }
  inputs["snack_X"] = snack[0];
  inputs["snack_Y"] = snack[1];

  return inputs;
};

const options = {
  task: "classification",
  // task: "regression",
  debug: false,
};

const trainingOptions = {
  epochs: 512,
  batchSize: 512,
};

let nn = ml5.neuralNetwork(options);

const model = {
  init(data, handleTrainingCompleted, handleWhileTraining) {
    nn = ml5.neuralNetwork(options);
    console.log("init:", data);
    data.forEach((item) => {
      // console.log(item);
      const inputs = item.inputs;
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
      let result = {
        epoch: epoch,
        acc: loss.acc.toFixed(4),
        loss: loss.loss.toFixed(4),
        val_acc: loss.val_acc.toFixed(4),
        val_loss: loss.val_loss.toFixed(4),
      };
      handleWhileTraining(result);
      // console.log("epoch:", epoch, ", loss:", loss);
    };

    console.log("train data");
    nn.train(trainingOptions, whileTraining, finishedTraining);
  },
  load(handleTrainingCompleted) {
    const modelLoaded = () => {
      console.log("model loaded");
      handleTrainingCompleted("finish training");
    };

    nn.load(
      {
        model: "../model/model.json",
        metadata: "../model/model_meta.json",
        weights: "../model/model.weights.bin",
      },
      modelLoaded
    );
  },
  classify(item, handleResult) {
    console.log("classify:", item);
    const input = item.inputs;

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
export { GenerateInput };
