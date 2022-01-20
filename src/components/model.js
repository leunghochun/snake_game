let ml5 = require("ml5");

const options = {
  task: "classification",
  debug: true,
};

const nn = ml5.neuralNetwork(options);

const model = {
  init(data) {
    // console.log(data)
    data.forEach(item => {
      const inputs = {};

      for (let i=0; i<item.snake.length; i++) {
        inputs["s"+i+"x"] = item.snake[i][0];
        inputs["s"+i+"y"] = item.snake[i][1];
      }
      inputs["snackx"] = item.snack[0];
      inputs["snacky"] = item.snack[0];
      // console.log(inputs)
      const output = {
        direction: item.direction
      };
      // console.log(inputs);
      nn.addData(inputs, output);
    });

    console.log('normalize data');
    nn.normalizeData();

    // Step 7: use the trained model
    const finishedTraining = () => {
      console.log('finish training')
    }

    // Step 6: train your neural network
    const trainingOptions = {
      epochs: 32,
      batchSize: 12
    }
    nn.train(trainingOptions, finishedTraining);

  },
  // Step 8: make a classification
  classify(data, handleResult){
    // console.log(data)
    let input = {};
    for (let i=0; i<data.snake.length; i++) {
      input["s"+i+"x"] = data.snake[i][0];
      input["s"+i+"y"] = data.snake[i][1];
    }
    input["snackx"] = data.snack[0];
    input["snacky"] = data.snack[0];
    // console.log(inputs)
    // console.log('classify:', input);
    // Step 9: define a function to handle the results of your classification
    const handleResults = (error, result) => {
      if(error){
        console.error(error);
        return;
      }
      console.log('classify result:', result); // {label: 'red', confidence: 0.8};
      handleResult(result);
    };
    nn.classify(input, handleResults);
  },
};

export default model;