import snake from "../components/snake";
import Square from "../components/square";

const Init = (row, column, snakeArray, snack) => {
    console.log('Init', row, column, snack);
    let map = new Array(parseInt(row))
    for (let i=0; i<row; i++)
        map[i] = new Array(parseInt(column));

    for (let i=0; i<map.length; i++)
        for (let j=0; j<map[i].length; j++) 
            map[i][j] = '';

    map[snakeArray[0][0]][snakeArray[0][1]] = 'snake';
    map[snack[0]][snack[1]] = 'snack';
    return map;
}
const NewSnack = (row, column, oldMap) => {
    let x = Math.floor(Math.random() * row);
    let y = Math.floor(Math.random() * column);
    // if (oldSnack !== undefined && x === oldSnack[0] && y === oldSnack[1])
    console.log('NewSnack:', x,y,oldMap);
    if (oldMap !== undefined && oldMap[x][y]!== '')
        return NewSnack(row, column, oldMap);   
    return [x, y];
}

const Playground = (props) => {
    console.log('Playground:', props.mapArray)
    return (
            <div id="playground" className="playground">
                {
                    props.mapArray.map((row, row_index) => 
                        row.map((column, column_index) =>
                            <Square 
                                key={row_index + column_index} 
                                id={row_index + column_index} 
                                size={row.length} 
                                snake={column}/>
                        ) 
                    ) 
                }
            </div>
        )
}

export default Playground;
export {Init, NewSnack};