import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './desktop-app.scss?inline';
import { App } from "~/models/app";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import { Common } from "~/utilities/common";
import { apps, states } from "~/installed";
import { Process } from "~/models/process";
import { generateId, setActiveWindow } from "~/services/mutations";

export default component$((props: App & {showTitle: boolean}) => {
    useStylesScoped$(styles);

    const state = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    const isBeingOpened = useSignal(false);

    const openApp = $(() => {
        isBeingOpened.value = true;
        const id = generateId();
        const opened: Process = {
          id,
          app: apps[props.name],
          state: states[props.name],
          x: Common.defaultWindowPositionX,
          y: Common.defaultWindowPositionY,
          minimized: false,
          maximized: false,
          dragging: false,
          closed: false,
          active: false,
        };
        state.apps[id] = opened;
        const updatedWindowContext = setActiveWindow(state.apps, id);
        state.apps = updatedWindowContext;
        settings.currentApp = state.apps[id].app.name;
    });

    return (
        <>
            <div
                onDblClick$={openApp}
                onMouseLeave$={() => isBeingOpened.value = false}
                style={{
                    filter: isBeingOpened.value ? 'sepia(1)' : 'unset',
                }}
            >
                <Icon name={props.icon.name} />
                {props.showTitle ? (<p>{props.name}</p>) : null}
            </div>
        </>
    )
});
