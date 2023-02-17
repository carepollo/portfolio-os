import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './barmenu-app.scss?inline';
import { App } from "~/models/app";
import { OpenedAppsContext } from "~/root";

export default component$((props: App) => {
    useStylesScoped$(styles);
    
    const tooltipDisplay = useSignal(false);
    const state = useContext(OpenedAppsContext);

    const openApp = $(() => {
        const copy = [...state.apps];
        const value = Object.assign({}, props);
        copy.forEach(app => {
            if (app.id === value.id) {
                app.minimized = false;
            }
        });
        
        state.apps = [...copy];
    });
    
    return (
        <>
            <div 
                class="container" 
                onMouseOver$={() => tooltipDisplay.value = true}
                onMouseOut$={() => tooltipDisplay.value = false}
                onClick$={openApp}
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
