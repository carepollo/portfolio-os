import { component$ } from "@builder.io/qwik"
import Chip from "../chip/chip";
import { Common } from "~/utilities/common";

export default component$(() => {
    return (
        <>
            <h1>EsoLang</h1>
            <div>
                <h4>What is it?</h4>
                <p>
                    It is a compiled functional programming language inspired 
                    in JavaScript syntax.
                </p>
                <h4>How was it built?</h4>
                <div style={{'text-align': 'justify'}}>
                    <b>Syntactic Analysis (Tokenization)</b>
                    <div></div>
                    <b>Lexical Analysis (Parsing)</b>
                    <div></div>
                    <b>Compilation (read of instructions)</b>
                    <div></div>
                </div>
                <h4>What does it solve?</h4>
                <p>
                    A proof of concept to learn how compilers and interpreters work. As a Software
                    Engineer the <i>how</i> it works is the basis for everything.
                </p>
                <h4>Screenshots</h4>
                <video src="/demostration_esolang.mp4"/>
                <h4>Skills applied</h4>
                <div>
                    {['Data Structures', 'Algorithms'].map(input => (
                        <Chip theme={'normal'} text={input} key={Common.generateId()} />
                    ))}
                </div>
            </div>
        </>
    )
});
