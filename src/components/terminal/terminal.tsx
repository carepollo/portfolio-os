import { 
    NoSerialize,
    component$,
    noSerialize,
    useVisibleTask$,
    useStore,
    useStylesScoped$,
} from "@builder.io/qwik";
import styles from './terminal.scss?inline';
import { Socket, io } from "socket.io-client";
import { Common } from "~/utilities/common";
import { TerminalState } from "~/models/terminal-state";

export default component$((props: {program: string}) => {
    useStylesScoped$(styles);
    
    const state = useStore<TerminalState>({
        output: '',
        input: '',
        program: props.program,
    });

    const socketState = useStore<{socket: NoSerialize<Socket>}>({
        socket: undefined,
    });

    useVisibleTask$(() => {
        const socket = io(Common.serverPath);
        
        socket.on('initialize', (response: string) => state.output += response);
        socket.on('command', (response: string) => state.output += response);

        socket.on('connect', () => {
            const initMessage = `Connected: ${socket.connected} with id ${socket.id}`;
            console.warn(initMessage);
            socket.emit('initialize', props.program);
        });

        socketState.socket = noSerialize(socket);
    });

    return (
        <div class="terminal">
            <textarea class="input output" id="output" readOnly value={state.output}/>
            <input
                placeholder="$ Type command"
                class="input prompt" 
                value={state.input} 
                onKeyDown$={(e) => {
                    const blacklisted = ['Shift', 'Control', 'Alt', 'ArrowLeft', 'ArrowRight'];
                    const pulsed = e.key;
                    const found = blacklisted.find((x) => x === pulsed);

                    if (pulsed === 'Enter') {
                        socketState.socket?.emit('command', state.input);
                        state.input = '';

                        const output = document.getElementById('output');
                        if (output) {
                            output.scrollTop = output.scrollHeight;
                        }
                    }
                    else if (pulsed === 'Backspace') {
                        state.input = state.input.slice(0, -1);
                    }
                    else if (!found) {
                        state.input += e.key;
                    }
                }} 
            />
        </div>
    );
});
