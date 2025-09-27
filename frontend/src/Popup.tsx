
import type { PopupProps } from "../../Types/GameTypes"



export default function Popup(props: PopupProps) {

    function passData() {
        const gameName = (document.getElementById("input-field")! as HTMLInputElement).value
        props.passDataToApp(gameName)

    }
    return (

        <div>
            <input id="input-field" type="text" name="Start a new game" placeholder="Enter game name" required></input>
            <button onClick={passData}>Enter</button>

        </div>



    )
}