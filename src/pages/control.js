const Control = ({handleButtonPress}) => {
    return (
        <>
            Row : <input id="row"/> <br/>
            Column : <input id="column"/>
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
        </>
    )
}

export default Control;