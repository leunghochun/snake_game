import React, { useEffect, useState, useRef } from "react";
import "./styles/styles.css";
import Playground, { Distance, Init, NewSnack } from "./pages/playground.js";
import Control from "./pages/control";
import snake from "./components/snake";
import api from "./adapters/api";
import model, { GenerateInput } from "./components/model";
import { ControlContext } from "./contexts/ControlContext";
import ShowObject from "./components/showObject";

const App = (props) => {
  const upRef = useRef(null);
  const downRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const { row, column } = props;
  const [size, setSize] = useState(2);
  const [snack, setSnack] = useState(props.snack);
  const [snakeArray, setSnakeArray] = useState(props.snakeArray);
  const [mapArray, setMapArray] = useState(props.mapArray);
  const [distance, setDistance] = useState(props.distance);
  const [pathDistance, setPathDistance] = useState(props.distance);
  const [direction, setDirection] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [trainingDone, setTrainingDone] = useState(null);
  const [trainingLog, setTrainingLog] = useState(null);

  const handleWhileTraining = (result) => {
    setTrainingLog(result);
    setTrainingDone("processing");
  };

  const handleTrainingCompleted = (result) => {
    console.log("handleTrainingCompleted", result, snack);
    setTrainingDone(result);
    let data = {
      inputs: GenerateInput(snakeArray, snack),
    };
    model.classify(data, handleResult);
  };

  const handleResult = (result) => {
    console.log("handleResult:", result, snakeArray, mapArray);
    let direct = null;
    for (let i = 0; i < result.length; i++) {
      let tempSnake = [...snakeArray];
      // console.log(result[i].label, snake.step(snakeArray[0], result[i].label, row, column));
      let head = snake.move(snakeArray, mapArray, result[i].label, row, column);
      tempSnake.unshift(head);
      tempSnake.pop();
      console.log(tempSnake, snakeArray, result[i].label, row, column, head);
      if (head !== null && direct === null) {
        direct = result[i].label;
      }
      let data = {
        inputs: GenerateInput(tempSnake, snack),
      };
      const tempHandleResult = (result) => {
        // prediction =
        console.log(result);
      };
      model.classify(data, tempHandleResult);
    }

    // switch (direct) {
    //   case "UP":
    //     upRef.current.click();
    //     break;
    //   case "DOWN":
    //     downRef.current.click();
    //     break;
    //   case "LEFT":
    //     leftRef.current.click();
    //     break;
    //   case "RIGHT":
    //     rightRef.current.click();
    //     break;
    //   default:
    //    console.log('no prediction');
    // }

    for (let i = 0; i < result.length; i++) {
      result[i][result[i].label] = result[i][result[i].label].toFixed(2);
      delete result[i].label;
      delete result[i].confidence;
    }
    setPrediction(result);
  };

  const handleButtonPress = (direct) => {
    if (direct === "SAVE") {
      model.save();
      return;
    }
    if (direct === "SAVEMODEL") {
      model.saveModel();
      return;
    }
    if (direct === "RELOAD") {
      setTrainingDone("downloading data");
      api
        .getModel()
        .then((res) =>
          model.init(res, handleTrainingCompleted, handleWhileTraining)
        );
      return;
    }

    let newSnake = [...snakeArray];
    let newMap = [...mapArray];
    let newSize = size;
    let newSnack = snack;

    let head = snake.move(newSnake, newMap, direct, row, column);
    if (head === null) return;

    newSize = snake.growth(newSize, head, snack);
    // head update
    newSnake.unshift(head);
    newMap[head[0]][head[1]] = "snake";
    // tail update
    let tail = snakeArray.length >= newSize ? newSnake.pop() : null;
    if (tail !== null) newMap[tail[0]][tail[1]] = "";
    // update state
    if (head[0] === newSnack[0] && head[1] === newSnack[1]) {
      newSnack = NewSnack(row, column, newMap);
      newMap[newSnack[0]][newSnack[1]] = "snack";
      setSnack(newSnack);
      setPathDistance(Distance(newSnake[0], newSnack));
    }

    setDirection(direct);
    setDistance(Distance(newSnake[0], newSnack));
    setSize(newSize);
    setSnakeArray(newSnake);
    setMapArray(newMap);
  };

  useEffect(() => {
    console.log("effect 222", trainingDone, snack);

    let data = {
      inputs: GenerateInput(snakeArray, snack),
    };

<<<<<<< HEAD
    if (trainingDone === null)
      // api.getModel().then((res) => model.init(res, handleTrainingCompleted));
      model.load(handleTrainingCompleted);
    else 
      model.classify(data, handleResult);
=======
    if (trainingDone === null) model.load(handleTrainingCompleted);
    // api.getModel().then((res) => model.init(res, handleTrainingCompleted));
    else model.classify(data, handleResult);
>>>>>>> origin/stupid_mode

    data["output"] = direction;
    if (direction !== null) {
      // console.log( pathDistance , distance, Math.floor(pathDistance/distance));
      for (let i = 0; i < Math.floor(pathDistance / distance); i++)
        api.insert(data);
    }
  }, [direction, snakeArray, snack, trainingDone]);

  return (
    <>
      <div className="layout">
        <Playground
          className="main"
          row={row}
          column={column}
          mapArray={mapArray}
          snakeArray={snakeArray}
          snack={snack}
        />
        <div className="right">
          <ControlContext.Provider
            value={{ distance: distance, trainingDone: trainingDone }}
          >
            <Control
              handleButtonPress={handleButtonPress}
              upRef={upRef}
              downRef={downRef}
              leftRef={leftRef}
              rightRef={rightRef}
            />
          </ControlContext.Provider>
          {prediction && (
            <><div className="underline">Prediction:</div>
              {prediction.map((object, i) => (
                <ShowObject key={i} data={object} />
                // <div key={i}>
                //   {object.label}:{object.confidence.toFixed(2)}
                // </div>
              ))}
            </>
          )}
          <div className="underline">acc/loss:</div>
          <ShowObject data={trainingLog} />
        </div>
      </div>
    </>
  );
};

const ROW = 20;
const COLUMN = 20;
const SNACK = NewSnack(ROW, COLUMN);
const SNAKEARRAY = [[Math.floor(ROW / 2), Math.floor(COLUMN / 2)]];
const MAPARRAY = Init(ROW, COLUMN, SNAKEARRAY, SNACK);
const DISTANCE = Distance(SNAKEARRAY[0], SNACK);

// Set default props
App.defaultProps = {
  row: ROW,
  column: COLUMN,
  snack: SNACK,
  snakeArray: SNAKEARRAY,
  mapArray: MAPARRAY,
  distance: DISTANCE,
};

export default App;
