import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './desktop-app.scss?inline';
import { App } from "~/models/app";
import { ExecutedAppsContext } from "~/root";

export default component$((props: App) => {
    useStylesScoped$(styles);

    const state = useContext(ExecutedAppsContext);

    const isBeingOpened = useSignal(false);

    const openApp = $(() => {
        isBeingOpened.value = true;
        state.apps = [...state.apps, props];
    })
    return (
        <>
            <div
                onDblClick$={openApp}
                onMouseLeave$={() => isBeingOpened.value = false}
                style={{filter: isBeingOpened.value ? 'sepia(1)' : 'unset'}}
            >
                <Icon name={props.icon.name} />
                <p>{props.name}</p>
            </div>
        </>
    )
});
