export default function Popup({ passDataToApp }) {

    function passData() {
        const gameName = (document.getElementById("input-field")! as HTMLInputElement).value
        passDataToApp(gameName)

    }
    return (

        <div>
            <input id="input-field" type="text" name="Start a new game" placeholder="Enter game name" required></input>
            <button onClick={passData}>Enter</button>

        </div>



    )
}