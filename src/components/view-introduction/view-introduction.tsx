import { component$, useStylesScoped$ } from "@builder.io/qwik";
import style from './view-introduction.scss?inline';

export default component$(() => {
    useStylesScoped$(style);

    return (
        <main class="content">
            <h2>
                Welcome to PortfolioOS
                <img src="/favicon.svg" class="logo" />
            </h2>
            <div>
                <article>
                    <section>
                    </section>
                    <section>
                        <h5>
                            How to use this portfolio
                        </h5>
                        <div>
                            You will have a bottom bar (which we will call app bar) with the following icons <img class="inlineimg" src="barapp.png"/>.
                            <br />
                            The following options <img class="inlineimg" src="/windowcontrols.png"/> on top of the window that pops up serves respectively to:
                            <ul>
                                <li>
                                    🟡 hides the app and stores it in the app bar.
                                </li>
                                <li>
                                    🟢 will make the window to occupy the whole viewport of your browser.
                                </li>
                                <li>
                                    🔴 this stops completely the process you are running.
                                </li>
                            </ul>
                            <p>
                                On the viewport there is also more icons, click twice on any of them to start execution of
                                a new app.
                            </p>
                            <p>
                                Each app that you will see on this site (except for Contact Me, GitHub and Introduction) are
                                side projects that I have developed.
                            </p>
                        </div>
                    </section>
                </article>
            </div>
        </main>
    )
});
