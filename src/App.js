import React , {useEffect, useState} from 'react';
import './styles/styles.css';
import Playground, {Distance, Init, NewSnack} from './pages/playground.js';
import Control from './pages/control';
import snake from './components/snake';
import api from './adapters/api';
import model, {HashCode} from './components/model';

const App = (props) => {
  const {row, column} = props;
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
    console.log('handleTrainingCompleted', result, snack);
    setTrainingDone(result);
    let data = {
      snake: HashCode(JSON.stringify(snakeArray)),
      snackX: snack[0],
      snackY: snack[1]
    }
    model.classify(data, handleResult);
  }

  const handleResult = (result) => {
    console.log('handleResult:', result, snakeArray, mapArray);
    // let nextSteps = [];
    // for(const predict of result) {
    //   let head = snake.move(snakeArray, mapArray, predict.label, row, column);
    //   if (head !== null) {
    //     console.log(head, Distance(head, snack), predict.label, predict.confidence);
    //     nextSteps.push([Distance(head, snack), predict.confidence, predict.label]);
    //   }
    // }
    setPrediction(result);

    // if (nextSteps.length <= 2) return;
    // nextSteps = nextSteps.sort((a, b) => { 
    //   let diff = a[0] - b[0];
    //   if (diff !== 0) return diff;
    //   return b[1] - a[1];
    // });
    // console.log("nextSteps:", nextSteps, nextSteps[0][2]);

    // let nextStep = nextSteps[0][2];
    // handleButtonPress(result[0].label);
  }

  const handleButtonPress = (direct) => {
    let newSnake = [...snakeArray];
    let newMap = [...mapArray];
    let newSize = size;
    let newSnack = snack;

    let head = snake.move(newSnake, newMap, direct, row, column);
    if (head === null) return;

    newSize = snake.growth(newSize, head, snack);
    // snake update
    newSnake.unshift(head);
    newMap[head[0]][head[1]] = 'snake';
    // tail update
    let tail = snakeArray.length >= newSize ? newSnake.pop() : null;
    if (tail !== null) newMap[tail[0]][tail[1]]= '';
    // update state
    if (head[0] === newSnack[0] && head[1] === newSnack[1]) {
      newSnack = NewSnack(row, column, newMap);
      newMap[newSnack[0]][newSnack[1]] = 'snack';
      setSnack(newSnack);
    }

    setDirection(direct);
    setDistance(Distance(newSnake[0], newSnack));
    setSize(newSize);
    setSnakeArray(newSnake);
    setMapArray(newMap);
  }

  useEffect(() => {
    // api.getModel().then((res) => setModel(res));
    console.log("effect", trainingDone)
    if (trainingDone === null)
      api.getModel().then((res) => model.init(res, handleTrainingCompleted));
    // console.log('did mount');
  })

  // useEffect(() => {
  //   // console.log("snakeArray snack effect", snakeArray, snack, trainingDone);
  //   if (trainingDone === null) return;
  //   let data = {
  //     snake: HashCode(JSON.stringify(snakeArray)),
  //     snackX: snack[0],
  //     snackY: snack[1]
  //   }
  //   model.classify(data, handleResult);
  // }, [snack, snakeArray, trainingDone])

  useEffect(() => {
    let data = {
      snake: HashCode(JSON.stringify(snakeArray)),
      snackX: snack[0],
      snackY: snack[1],
      direction: direction
    }
    if (direction !== null)
      api.insert(data);
    model.classify(data, handleResult);
  }, [direction, snakeArray, snack])

  return (
    <>
      <div className='layout'>
        <Playground className="main" 
          row={row} 
          column={column} 
          mapArray={mapArray}
          snakeArray={snakeArray}
          snack={snack}
          />
        <div className='right'>
          <Control handleButtonPress={handleButtonPress} distance={distance} trainingDone={trainingDone}/>
          {
            prediction && 
            <div>
              {prediction.map((object, i) => <div key={i}>{object.label}:{object.confidence.toFixed(2)}</div>)}
            </div>
          }
        </div>
      </div>
    </>
  );
}

const ROW = 20;
const COLUMN = 20;
const SNACK = NewSnack(ROW, COLUMN);
const SNAKEARRAY = [[Math.floor(ROW/2), Math.floor(COLUMN/2)]];
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
