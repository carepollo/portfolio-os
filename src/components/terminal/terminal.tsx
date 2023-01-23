import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import styles from './terminal.scss?inline';

export default component$(() => {
    useStylesScoped$(styles);

    const state = useStore({
        output: 'This project is called lol',
        input: 'hello world',
    });

    return (
        <div class="terminal">
            <textarea class="input output" id="output" readOnly value={state.output}/>
            <input
                class="input prompt" 
                value={state.input} 
                onKeyDown$={(e) => {
                    if (e.key === 'Enter') {
                        state.output += `\n${state.input}`;
                        state.input = '';
                        const output = document.getElementById('output');
                        if (output) {
                            output.scrollTop = output.scrollHeight;
                        }
                    } else {
                        state.input += e.key;
                    }
                }} 
            />
        </div>
    );
});
