// import { useEffect } from "react";

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

// useEffect(() => {
//     window.addEventListener('keydown', downHandler)
//     window.addEventListener('keyup', upHandler)
//     return () => {
//       window.removeEventListener('keydown', downHandler)
//       window.removeEventListener('keyup', upHandler)
//     }
// }, [])

const Control = () => {
    return (
        <div id="control"> 
            Row : <input id="row"/> <br/>
            Column : <input id="column"/>
        </div>
    )
}

export default Control;