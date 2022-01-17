import React , {useEffect, useState} from 'react';
import './styles/styles.css';
import Playground, {Init, NewSnack} from './pages/playground.js';
import snake from './components/snake';
import Control from './pages/control';

const App = (props) => {
  const {row, column} = props;
  const [size, setSize] = useState(2);
  const [snack, setSnack] = useState(props.snack);
  const [snakeArray, setSnakeArray] = useState(props.snakeArray);
  const [mapArray, setMapArray] = useState(props.mapArray);

  console.log('App:', mapArray, ',size:,', size, snakeArray, row, column);

  const handleButtonPress = (direction) => {
    let newSnake = [...snakeArray];
    let newMap = [...mapArray];
    let newSize = size;
    let newSnack = snack;

    let head = snake.move(newSnake, newMap, direction, row, column);
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
    setSize(newSize);
    setSnakeArray(newSnake);
    setMapArray(newMap);
  }

  const handleKeyPress = (e) => {
    let direction = '';
    switch (e.keyCode) {
        case 37:
            direction = 'LEFT';
            break;
        case 38:
            direction = 'UP';
            break;
        case 39:
            direction = 'RIGHT';
            break;
        case 40:
            direction = 'DOWN';
            break;
        default:
            console.log('keypress:', e.keyCode);
            return;
    }
    handleButtonPress(direction);
  }

  useEffect(() => {
    const keyDown = document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener(keyDown);
    };
  }, []);

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
        <Control handleButtonPress={handleButtonPress}/>
      </div>
    </>
  );
}

const ROW = 20;
const COLUMN = 30;
const SNACK = NewSnack(ROW, COLUMN);
const SNAKEARRAY = [[Math.floor(ROW/2), Math.floor(COLUMN/2)]];
const MAPARRAY = Init(ROW, COLUMN, SNAKEARRAY, SNACK);
// Set default props
App.defaultProps = {
  row: ROW,
  column: COLUMN,
  snack: SNACK,
  snakeArray: SNAKEARRAY,
  mapArray: MAPARRAY
};

export default App;
