import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./display.module.scss";

export default function Display() {
    const { input, output, inputFull, clickWhenFull } = useSelector((state) => ({
        input: state.input,
        output: state.output,
        inputFull: state.inputFull,
        clickWhenFull: state.clickWhenFull
    }));

    const [alterInput, setAlterInput] = useState("");
    const memoClickWhenFull = useRef(clickWhenFull)

    const alertLimit = useCallback(() => {
        setAlterInput("DIGIT LIMIT MET!")
        setTimeout(() => setAlterInput(input), 500)
    }, [input])


    useEffect(() => {
        setAlterInput(input)
        if (inputFull) {
            if (memoClickWhenFull.current !== clickWhenFull) {
                memoClickWhenFull.current = clickWhenFull
                alertLimit();
            }
        }
        else {
            memoClickWhenFull.current = clickWhenFull
        }
    }, [alertLimit, clickWhenFull, input, inputFull])

    return (
        <section id={style["display-area"]}>
            <div id="display-total">{output}</div>
            <div id="display">{alterInput}</div>
        </section>
    )
}