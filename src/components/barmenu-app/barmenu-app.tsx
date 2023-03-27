import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './barmenu-app.scss?inline';
import { App } from "~/models/app";
import { CurrentSettings, RunningAppsDirectory, SystemContext } from "~/root";
import { setActiveWindow } from "~/services/mutations";

export default component$((props: App & {id: string}) => {
    useStylesScoped$(styles);
    
    const tooltipDisplay = useSignal(false);
    const executing = useContext(RunningAppsDirectory);
    const settings = useContext(CurrentSettings);
    const system = useContext(SystemContext);

    const toggleMinimization = $(() => {
        const minimization = executing.apps[props.id];
        executing.apps[props.id].minimized = !minimization.minimized;

        if (!executing.apps[props.id].minimized) {
            const changedActive = setActiveWindow(executing.apps, props.id);
            executing.apps = changedActive;
            settings.currentApp = executing.apps[props.id].app.name;
        }
    });
    
    return (
        <>
            <div 
                class="container" 
                onMouseOver$={() => tooltipDisplay.value = system.deviceType === 'desktop'}
                onMouseOut$={() => tooltipDisplay.value = false}
                onClick$={toggleMinimization}
            >
                <p 
                    class="tooltip" 
                    style={{display: tooltipDisplay.value ? 'block' : 'none'}}
                >
                    {props.name}
                </p>
                <Icon name={props.icon.name} />
            </div>
        </>
    )
});
