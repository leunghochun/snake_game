const Square = (props) => {
    let size = 100 / props.size ;
    let style = {
        width: size + '%',
        height: size + 'vh',
    }
    return <div id={props.id} className={`rectangle ${props.snake}`} style={style} />;
};

export default Square;