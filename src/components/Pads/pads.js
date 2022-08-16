import style from "./pads.module.scss";
import { useCallback, useRef } from "react";
import { useDispatch} from "react-redux";
import userClick from "../../redux/actions/userClick.js"

const funcId = [["divide", "/"], ["multiply", "x"], ["subtract", "-"], ["add", "+"], ["equals", "="], ["decimal", "."]];
const numId = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export const wait = (element) => {
    if (!element) {
        setTimeout(wait, 0, element)
    }
    else return element;
}

export default function FunctionPads() {
    const numPad = useRef({});
    const funcPad = useRef({});
    const dispatch = useDispatch();

    const handleNumClick = useCallback((e) => {
        dispatch(
            userClick(
                numPad.current[e.target.id].textContent
            )
        )

    }, [dispatch])

    const handleFuncClick = useCallback((e) => {
        dispatch(
            userClick(
                funcPad.current[e.target.id].textContent
            )
        )
    }, [dispatch])

    //useEffect(() => { console.log("hello") }, [])

    return (
        <div id={style["pads-area"]}>

            {funcId.map((id, key) => {
                return (
                    <button
                        key={key}
                        id={id[0]}
                        value ={id[1]}
                        ref={(ref) => (funcPad.current[wait(ref).id] = ref)}
                        onClick={handleFuncClick}>{id[1]}
                    </button>
                )
            })}

            {numId.map((id, index) => {
                return (
                    <button
                        key={index}
                        id={id}
                        value ={index}
                        ref={(ref) => (numPad.current[wait(ref).id] = ref)}
                        onClick={handleNumClick}>{index}
                    </button>
                )
            })}

        </div >
    )
}