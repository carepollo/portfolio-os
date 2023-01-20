import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <>
            <h2>Welcome to PortfolioOS</h2>
            <span>Opus Machina</span>
            <div>
                <article>
                    <section>
                    </section>
                    <section>
                        <h5>
                            How to use this portfolio
                            <img src="/public/favicon.svg" />
                        </h5>
                        <div>
                            You will have a bottom bar (which we will call app bar) with the following icons <img/>,
                            clicking once on any of them will open up a new window, each window is a new app/process.
                            <br />
                            The following options <img/> on top of the window that pops up serves respectively to:
                            <ul>
                                <li>
                                    Minimize: this will make the window no longer visible and instead will appear
                                    on the bottom bar app, there is where all minimized apps will be stored.
                                </li>
                                <li>
                                    Maximize: will make the window to occupy the whole viewport of your browser.
                                </li>
                                <li>
                                    Close: this stops completely the process you are running.
                                </li>
                            </ul>
                            <br />
                            On the viewport there is also more icons, click twice on any of them to start execution of
                            a new app, just like the apps on app bar.
                            <br />
                            Each app that you will see on this site (except for Contact Me, GitHub and Introduction) are
                            side projects that I have developed, they are from various nature, being said, feel free to
                            explore.
                        </div>
                    </section>
                    <section>
                        <h5>About Me</h5>
                        Here is a list with some of my skills obtained.
                        <ul>
                            <li>OOP</li>
                            <li>Design patterns</li>
                            <li>Data Structures and Algorithms</li>
                        </ul>
                        <br />
                        I like the Free Software Movement and the Transhumanist Movement. I contribute to certain FOSS projects
                        whenever I have some free time.
                    </section>
                </article>
            </div>
        </>
    )
});
