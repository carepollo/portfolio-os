import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import style from './view-introduction.scss?inline';
import { CurrentSettings } from "~/root";

export default component$(() => {
    useStylesScoped$(style);

    const settings = useContext(CurrentSettings);

    return (
        <main class="content">
            <h2>
                Welcome to Portfolio OS
            </h2>
            <div class="article">
                {settings.mode === 'manual' ?  (
                    <>
                        <p>
                            You will have a bottom bar like this <img class="inlineimg" src="/pictures/barapp.png"/> where minimized apps will appear, click them once to open them up.
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
                    </>
                ) : (
                    <>
                        <p>
                            The bar at the side will show the apps that you are executing.
                        </p>
                        <p>
                            Hold click over an icon on the sidebar to close it.
                        </p>
                    </>
                )}
            </div>
        </main>
    )
});
