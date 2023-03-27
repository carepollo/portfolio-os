import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from './view-introduction.scss?inline';

export default component$(() => {
    useStylesScoped$(style);

    return (
        <main class="content">
            <h2>
                Welcome to Portfolio OS
            </h2>
            <div class="article">
                <p>
                    You will have a bottom bar like this <img class="inlineimg" src="/pictures/barapp.png"/> where minimized apps wil appear, click them once to open them up.
                </p>
                <ul>
                    <li>
                        <img class="inlineimg" src="/pictures/minimizebutton.png" alt="minimize icon" /> hides the app and stores it in the app bar.
                    </li>
                    <li>
                        <img class="inlineimg" src="/pictures/maximizebutton.png" alt="maximize icon" /> makes the windows occupy the whole screen
                    </li>
                    <li>
                        <img class="inlineimg" src="/pictures/closebutton.png" alt="close icon" /> this stops completely the process you are running.
                    </li>
                </ul>
            </div>
        </main>
    )
});
