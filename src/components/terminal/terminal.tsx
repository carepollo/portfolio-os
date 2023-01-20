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
            <input type="output" readOnly />
            <input 
                class="prompt" 
                value={state.input} 
                onChange$={(e) => state.input = e.target.value}
                onKeyDown$={(e) => console.log(e.keyCode, e.key, e.charCode)} 
            />
        </div>
    );
});
