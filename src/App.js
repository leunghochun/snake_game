import React , {useEffect, useState} from 'react';
import './styles/styles.css';
import Playground from './pages/playground.js';
import Control from './pages/control.js';

const App = (props) => {
  const {row, column} = props;
  const [snake, setSnake] = useState([Math.floor(row/2), Math.floor(column/2)]);
  const [map, setMap] = useState(new Array(parseInt(row)));
  // const [position, setPosition] = React.useState([Math.floor(row/2), Math.floor(column/2)]);

  console.log(snake);
  for (let i=0; i<row; i++)
    map[i] = new Array(parseInt(column));

  for (let i=0; i<map.length; i++)
    for (let j=0; j<map[i].length; j++) {
      map[i][j] = '';
    }
  
  const handleKeyPress = (e) => {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            break;
        case 38:
            console.log('up');
            break;
        case 39:
            console.log('right');
            break;
        case 40:
            console.log('down');
            break;
        default:
            console.log('keypress:', e.keyCode);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);
  // const moveSnake = (direction) => {
  //   let head = this.state.snake[0];
  //   switch (direction) {
  //     case 'UP':
  //       break;
  //     case 'DOWN':
  //       break;
  //     case 'LEFT':
  //       break;
  //     case 'RIGHT':
  //       break;
  //   }
  // }

  const updateMap = (x, y, value, direction) => {
    map[x][y] = value;
    // if (direction === undefined) {
    //   map[x][y] = value;
    //   // setSnake([x, y]);
    // } else {
    // }
  }

  updateMap(snake[0], snake[1], 'snake', 'LEFT');

  return (
    <>
      <div className='layout'>
        <Playground className="main" row={row} column={column} map={map}/>
        <Control className="control" onUpdateMap={updateMap}/>
      </div>
    </>
  );
}

// Set default props
App.defaultProps = {
  row: '20',
  column: '30'
};

export default App;
