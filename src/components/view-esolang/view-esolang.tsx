import { component$ } from "@builder.io/qwik";
import Chip from "../chip/chip";

export default component$(() => {
    return (
        <>
            <h3>A compiler in Go</h3>
            <p>
                <Chip text={'a'} icon={{name: 'terminal', size: 15}} />
            </p>
        </>
    );
});