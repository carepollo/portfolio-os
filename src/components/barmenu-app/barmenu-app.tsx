import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './barmenu-app.scss?inline';
import { App } from "~/models/app";
import { RunningAppsDirectory } from "~/root";

export default component$((props: App & {id: string}) => {
    useStylesScoped$(styles);
    
    const tooltipDisplay = useSignal(false);
    const executing = useContext(RunningAppsDirectory);

    const toggleMinimization = $(() => {
        const minimization = executing.apps[props.id];
        executing.apps[props.id].minimized = !minimization.minimized;
    });
    
    return (
        <>
            <div 
                class="container" 
                onMouseOver$={() => tooltipDisplay.value = true}
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
