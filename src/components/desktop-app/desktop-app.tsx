import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './desktop-app.scss?inline';
import { App } from "~/models/app";
import { CurrentSettings, RunningAppsDirectory, SystemContext } from "~/root";
import { Common } from "~/utilities/common";
import { disk } from "~/disk";
import { Process } from "~/models/process";
import { generateId, setActiveWindow } from "~/services/mutations";

export default component$((props: App & {showTitle: boolean, location: string}) => {
    useStylesScoped$(styles);

    const executingApps = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    const system = useContext(SystemContext);

    const isBeingOpened = useSignal(false);

    const openApp = $(() => {
        isBeingOpened.value = true;
        const id = generateId();
        const { app, state } = disk[props.location][props.name];
        const opened: Process = {
            id,
            app,
            state,
            x: Common.defaultWindowPositionX,
            y: Common.defaultWindowPositionY,
            minimized: false,
            maximized: false,
            dragging: false,
            closed: false,
            active: false,
            location: props.location,
        };
        executingApps.apps[id] = opened;
        const updatedWindowContext = setActiveWindow(executingApps.apps, id);
        executingApps.apps = updatedWindowContext;
        settings.currentApp = executingApps.apps[id].app.name;    
    });

    const openWindow = $(async () => {
        if (system.deviceType === 'desktop') {
            await openApp();
        }
    });

    const openScreen = $(async () => {
        if (system.deviceType !== 'mobile') {
            return;
        }

        const opened = Object.values(executingApps.apps).find(opened => opened.app.name === props.name);
        if (opened) {
            setActiveWindow(executingApps.apps, opened.id);
            return;
        }

        await openApp();
    });

    return (
        <>
            <div
                onDblClick$={openWindow}
                onClick$={openScreen}
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
