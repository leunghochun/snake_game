import { useContext } from "react";
import { ControlContext } from "../contexts/ControlContext";

const Control = ({  handleButtonPress, 
                    upRef,
                    downRef,
                    leftRef,
                    rightRef
                }) => {
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

    const data = useContext(ControlContext);

    return (
        <div>
            <div >
                Arrow key control: <input autoFocus id="row" onKeyDown={handleKeyPress}/> <br/>
                Distance: {Number.parseFloat(data.distance).toFixed(2)} {data.trainingDone}
            </div>
            <div className="control">
                <div/>
                <button ref={upRef} id="arrowUp" className="arrowButton" onClick={() => handleButtonPress('UP')}>UP</button>
                <div/>
                <button ref={leftRef} id="arrowLeft" className="arrowButton" onClick={() => handleButtonPress('LEFT')}>LEFT</button>
                <div/>
                <button ref={rightRef} id="arrowRight" className="arrowButton" onClick={() => handleButtonPress('RIGHT')}>RIGHT</button>
                <div/>
                <button ref={downRef} id="arrowDown" className="arrowButton" onClick={() => handleButtonPress('DOWN')}>DOWN</button>
                <div/>
            </div>
            <div className="modelPanel"> 
                <button id="reload" className="arrowButton" onClick={() => handleButtonPress('RELOAD')}>RELOAD</button>
                <button id="save" className="arrowButton" onClick={() => handleButtonPress('SAVE')}>SAVE</button>
                <button id="saveModel" className="arrowButton" onClick={() => handleButtonPress('SAVEMODEL')}>SAVE MODEL</button>
            </div>
        </div>
    )
}

export default Control;