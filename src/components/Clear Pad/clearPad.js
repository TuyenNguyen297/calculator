import style from "./clearPad.module.scss"
import { useDispatch } from "react-redux";
import userClick from "../../redux/actions/userClick.js"

export default function ClearPad() {
    const dispatch = useDispatch();

    return (
        <div id={style["clear-pad"]}>
            <button
                id="clear"
                onClick={() => dispatch(userClick("clear"))}>
            </button>
        </div >
    )
}