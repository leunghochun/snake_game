import React, { useEffect, useState, useRef } from "react";
import "./styles/styles.css";
import Playground, { Distance, Init, NewSnack } from "./pages/playground.js";
import Control from "./pages/control";
import snake from "./components/snake";
import api from "./adapters/api";
import model, { HashCode, GenerateInput } from "./components/model";

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
  const [direction, setDirection] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [trainingDone, setTrainingDone] = useState(null);

  // console.log('App:', mapArray, ',size:,', size, snakeArray, row, column);

  const handleTrainingCompleted = (result) => {
    console.log("handleTrainingCompleted", result, snack);
    setTrainingDone(result);
    let data = {
      inputs: GenerateInput(snakeArray, snack),
    };
    // let data = {
    //   snake: HashCode(JSON.stringify(snakeArray)),
    //   snackX: snack[0],
    //   snackY: snack[1]
    // }
    model.classify(data, handleResult);
  };

  const handleResult = (result) => {
    console.log("handleResult:", result, snakeArray, mapArray);
    let direct = null;
    for (let i = 0; i < result.length; i++) {
      // console.log(result[i].label, snake.step(snakeArray[0], result[i].label, row, column));
      let head = snake.move(snakeArray, mapArray, result[i].label, row, column);
      console.log(
        result[i].label,
        snakeArray,
        result[i].label,
        row,
        column,
        head
      );
      if (head !== null && direct === null) {
        direct = result[i].label;
      }
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
      api.getModel().then((res) => model.init(res, handleTrainingCompleted));
      return;
    }

    let newSnake = [...snakeArray];
    let newMap = [...mapArray];
    let newSize = size;
    let newSnack = snack;

    let head = snake.move(newSnake, newMap, direct, row, column);
    if (head === null) return;

    newSize = snake.growth(newSize, head, snack);
    // snake update
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
    }

    setDirection(direct);
    setDistance(Distance(newSnake[0], newSnack));
    setSize(newSize);
    setSnakeArray(newSnake);
    setMapArray(newMap);
  };

  useEffect(() => {
    console.log("effect 222", trainingDone);
    // let data = {
    //   snake: HashCode(JSON.stringify(snakeArray)),
    //   snackX: snack[0],
    //   snackY: snack[1],
    //   direction: direction
    // }
    let data = {
      inputs: GenerateInput(snakeArray, snack),
    };

    if (trainingDone === null)
      // api.getModel().then((res) => model.init(res, handleTrainingCompleted));
      model.load(handleTrainingCompleted);
    else 
      model.classify(data, handleResult);

    data["output"] = direction;
    if (direction !== null) api.insert(data);
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
          <Control
            handleButtonPress={handleButtonPress}
            distance={distance}
            trainingDone={trainingDone}
            upRef={upRef}
            downRef={downRef}
            leftRef={leftRef}
            rightRef={rightRef}
          />
          {prediction && (
            <div>
              {prediction.map((object, i) => (
                <div key={i}>
                  {object.label}:{object.confidence.toFixed(2)}
                </div>
              ))}
            </div>
          )}
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
