const Control = ({handleButtonPress, distance, trainingDone}) => {
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

    return (
        <div>
            <div >
                Arrow key control: <input autoFocus id="row" onKeyDown={handleKeyPress}/> <br/>
                Distance: {Number.parseFloat(distance).toFixed(2)} {trainingDone}
            </div>
            <div className="control">
                <div/>
                <button id="arrowUp" className="arrowButton" onClick={() => handleButtonPress('UP')}>UP</button>
                <div/>
                <button id="arrowLeft" className="arrowButton" onClick={() => handleButtonPress('LEFT')}>LEFT</button>
                <div/>
                <button id="arrowRight" className="arrowButton" onClick={() => handleButtonPress('RIGHT')}>RIGHT</button>
                <button id="save" className="arrowButton" onClick={() => handleButtonPress('SAVE')}>SAVE</button>
                <button id="arrowDown" className="arrowButton" onClick={() => handleButtonPress('DOWN')}>DOWN</button>
                <button id="saveModel" className="arrowButton" onClick={() => handleButtonPress('SAVEMODEL')}>SAVE MODEL</button>
            </div>
        </div>
    )
}

export default Control;