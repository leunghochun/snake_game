import React from 'react';

const Square = (props) => {
    // console.log('Square');
    let size = 100 / props.size ;
    let style = {
        width: size + '%',
        height: size + 'vh',
    }
    return <div id={props.id} className={`rectangle ${props.snake}`} style={style} />;
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.snake === nextProps.snake;
};

export default React.memo(Square, areEqual);