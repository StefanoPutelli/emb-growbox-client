import { useEffect, useState } from "react";
import cloud_face from "../img/cloud_face.png";

export default function Cloud(props) {

    const [height, setHeight] = useState(1)


    //fix clouds height

    useEffect (() => {
        const cb = () => {window.addEventListener("load", () => {
            setHeight(document.getElementById("cloud").getBoundingClientRect().width / 3)
            document.getElementById("cloud").style.height = height + "px"
        })}
        const cb2 = () => {window.addEventListener("resize", () => {
            setHeight(document.getElementById("cloud").getBoundingClientRect().width / 3)
            document.getElementById("cloud").style.height = height + "px"
        })}

        return () => {
            window.removeEventListener("load", cb)
            window.removeEventListener("resize", cb2)
        }
    }, [height])

    return (
            <div id="cloud">
                <img className="block m-auto w-[30%] "src={cloud_face} alt="cloud face" />
                <div class="rain">
                    <div class="drop d1"></div>
                    <div class="drop d2"></div>
                    <div class="drop d3"></div>
                    <div class="drop d4"></div>
                    <div class="drop d5"></div>
                    <div class="drop d6"></div>
                    <div class="drop d7"></div>
                    <div class="drop d8"></div>
                    <div class="drop d9"></div>
                    <div class="drop d10"></div>
                    <div class="drop d11"></div>
                    <div class="drop d12"></div>
                    <div class="drop d13"></div>
                    <div class="drop d14"></div>
                    <div class="drop d15"></div>
                </div>
            </div>
    )
}