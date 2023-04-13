import { $, component$, useContext } from "@builder.io/qwik";
import IconAnchor from "../icon-anchor/icon-anchor";
import IconAction from "../icon-action/icon-action";
import { startProcess } from "~/services/mutations";
import { CurrentSettings, RunningAppsDirectory } from "~/root";

export default component$(() => {

    const openedApps = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    const openApp = $(() => {
        startProcess(openedApps.apps, 'desktop', 'Contact Me', settings);
    });


    return (
        <div style={{'text-align': 'justify', 'padding': '0px 15px'}}>
            <h3>About me</h3>
            <div>
                <p>
                    I am a software engineering student from Colombia. I constantly look 
                    for new technologies to learn and improve my professional toolset.
                </p>
                <p>
                    My journey in tech started with a course on 2019 about fullstack web development. 
                    My need to always go further than the given requirements led me to work remotely 
                    for a start-up, a local governmental institution and mid-size companies where I had 
                    the opportunity to add value through digital products that fits the company's needs.
                </p>
                <p>
                    Currently I am looking to work as a backend engineer. In my free time I am 
                    contributing to FOSS projects to learn more about the field and make myself a 
                    better fit and a better professional.   
                </p>
            </div>
            <div style={{display: 'flex'}}>
                <IconAction name="mail" size={30} action={openApp} title="Contact Me" trigger="click" />
                <IconAnchor name="github" size={30} site="https://github.com/carepollo" />
                <IconAnchor name="linkedin" size={30} site="https://linkedin.com" />
                <IconAnchor name="telegram" size={30} site="https://telegram.org" />
            </div>
        </div>
    );
});
