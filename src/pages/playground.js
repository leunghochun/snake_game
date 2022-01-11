import Square from "../components/square";

const Playground = (props) => {

    console.log(props.map)
    const Squares = [];
    for (let i = 0; i < props.map.length; i++)
        for (let j = 0; j < props.map[i].length; j++) {
            let id = i.toString() + "_" + j.toString();
            Squares.push(<Square key={id} id={id} size={props.map[i].length} snake={props.map[i][j]}/>);
        }
    return <div id="playground" className="playground">{Squares}</div>
}

export default Playground;