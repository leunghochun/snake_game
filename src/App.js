import React , {useEffect, useState} from 'react';
import './styles/styles.css';
import Playground, {Distance, Init, NewSnack} from './pages/playground.js';
import Control from './pages/control';
import snake from './components/snake';
import api from './adapters/api';

const App = (props) => {
  const {row, column} = props;
  const [size, setSize] = useState(2);
  const [snack, setSnack] = useState(props.snack);
  const [snakeArray, setSnakeArray] = useState(props.snakeArray);
  const [mapArray, setMapArray] = useState(props.mapArray);
  const [distance, setDistance] = useState(props.distance);
  const [direction, setDirection] = useState(null);

  console.log('App:', mapArray, ',size:,', size, snakeArray, row, column);

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
    console.log('size:', size, newSize);
    if (size !== newSize) {
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
    console.log('did mount');
  })

  useEffect(() => {
    console.log('useEffect SnakeArray change', JSON.stringify(snakeArray), direction, snack);

    let data = {
      snake: snakeArray,
      snack: snack,
      direction: direction
    }
    if (direction !== null)
      api.insert(data);
  }, [snakeArray])

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
        <Control handleButtonPress={handleButtonPress} distance={distance}/>
      </div>
    </>
  );
}

const ROW = 20;
const COLUMN = 30;
const SNACK = NewSnack(ROW, COLUMN);
const SNAKEARRAY = [[Math.floor(ROW/2), Math.floor(COLUMN/2)]];
const MAPARRAY = Init(ROW, COLUMN, SNAKEARRAY, SNACK);
const DISTANCE = Distance(SNAKEARRAY[0], SNACK);
const model = api.getModel();

// Set default props
App.defaultProps = {
  row: ROW,
  column: COLUMN,
  snack: SNACK,
  snakeArray: SNAKEARRAY,
  mapArray: MAPARRAY,
  distance: DISTANCE
};

export default App;
