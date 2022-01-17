const snake = {
    move(arr, map, direction, row, column) { 
        let x, y;
        [x, y] = arr[0];

        switch (direction) {
            case 'UP':
                x--;
                break;
            case 'DOWN':
                x++;
                break;
            case 'RIGHT':
                y++
                break;
            case 'LEFT':
                y--;
                break;
            default:
                console.log('Wrong direction');
                break;
        }

        // check boundary
        if (x<0 || y<0 || x>=row || y>column)
            // return false;
            return null;

        // check if next step is snake
        if (map[x][y] === 'snake')
            // return false;
            return null;

        // arr.unshift([x,y]);
        return [x, y];
        // return arr.pop();
    },
    growth(size, head, snack) {
        console.log('growth:', size, head, snack);
        console.log(head[0], snack[0], head[1], snack[1]) ;
        if (head[0] === snack[0] && head[1] === snack[1]) {
            console.log('ate snack');
            return size * 2;
        }
        return size;
    }
}

export default snake;