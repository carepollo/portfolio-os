import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './desktop-app.scss?inline';
import { App } from "~/models/app";
import { RunningAppsDirectory } from "~/root";
import { Common } from "~/utilities/common";
import { apps } from "~/installed";
import { Process } from "~/models/process";

export default component$((props: App & {showTitle: boolean}) => {
    useStylesScoped$(styles);

    const state = useContext(RunningAppsDirectory);

    const isBeingOpened = useSignal(false);

    const openApp = $(() => {
        isBeingOpened.value = true;
        const id = Common.generateId();
        const opened: Process = {
          id,
          app: apps[props.name],
          state: {},
          x: Common.defaultWindowPositionX,
          y: Common.defaultWindowPositionY,
          minimized: false,
          maximized: false,
          dragging: false,
          closed: false,
          active: false,
        };
        state.apps[id] = opened;
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
