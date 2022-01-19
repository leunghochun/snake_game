const Control = ({handleButtonPress, distance}) => {
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
                Distance: {distance}
            </div>
            <div className="control">
                <div/>
                <button onClick={() => handleButtonPress('UP')}>UP</button>
                <div/>
                <button onClick={() => handleButtonPress('LEFT')}>LEFT</button>
                <div/>
                <button onClick={() => handleButtonPress('RIGHT')}>RIGHT</button>
                <div/>
                <button onClick={() => handleButtonPress('DOWN')}>DOWN</button>
                <div/>
            </div>
        </div>
    )
}

export default Control;