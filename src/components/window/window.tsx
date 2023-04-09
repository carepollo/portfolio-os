import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import style from './window.scss?inline';
import Icon from '~/components/icon/icon';
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import { Directory } from "~/models/directory";
import { Common } from "~/utilities/common";
import { Process } from "~/models/process";
import { setActiveWindow } from "~/services/mutations";

export default component$((props: {id: string}) => {
    useStylesScoped$(style);

    const settings = useContext(CurrentSettings);
    const appSet = useContext(RunningAppsDirectory);
    const closed = useSignal(false);
    
    const drag = $(() => {
        const app = appSet.apps[props.id];
        if (app.maximized) {
            app.maximized = false;
        }
        app.dragging = true;
    });

    const minimize = $(() => {
        const app = appSet.apps[props.id];
        app.minimized = true;
    });

    const maximize = $(() => {
        const app = appSet.apps[props.id];
        if (!app.maximized) {
            app.x = Common.positions.window.x;
            app.y = Common.positions.window.y;  
            app.maximized = true;
        } else {
            app.maximized = false;
        }
    });

    const close = $(() => {
        appSet.apps[props.id].closed = true;
        closed.value = true;
        
        //TODO: deprecated implementation of removal of apps, can be done through `delete context[id]`
        const replacement = Object.values(appSet.apps).filter(x => x.id !== props.id);
        const replaces: Directory<Process> = {};
        Object.keys(appSet.apps).filter(x => x !== props.id).forEach((keyId, index) => {
            replaces[keyId] = replacement[index];
        });
        appSet.apps = replaces;
    });


    // for the following two methods
    // the event launches event if the component haven't been destroyed yet
    // that is the purpose of this conditional, the other events doesn't launch without interaction
    const drop = $(() => {
        if (appSet.apps[props.id]) {
            appSet.apps[props.id].dragging = false;
        }
    });

    const dragging = $((x: number, y: number) => {
        if(appSet.apps[props.id]) {
            if(appSet.apps[props.id].dragging) {
                const newX = appSet.apps[props.id].x + x;
                const newY = appSet.apps[props.id].y + y;
                appSet.apps[props.id].x = newX;

                if (newY > 39) {
                    appSet.apps[props.id].y = newY;
                }
            }
        }
    });

    const setActive = $(() => {
        setActiveWindow(appSet.apps, props.id);
        settings.currentApp = appSet.apps[props.id].app.name;
    });

    return (        
        <>
            {closed.value ? null : (
                <div 
                    class="window" 
                    style={{
                        'width': appSet.apps[props.id].maximized ? '100vw' : '550px',
                        'height': appSet.apps[props.id].maximized ? 'calc(100vh - 140px)' : '400px',
                        'top': `${appSet.apps[props.id].y}px`,
                        'left': `${appSet.apps[props.id].x}px`,
                        'border': `3px solid ${Common.colorPalette[settings.theme].windowBorder}`,
                        'z-index': appSet.apps[props.id].active ? 3 : 2,
                    }}
                    onMouseDown$={setActive}
                >
                    <div class="header"
                        onMouseDown$={drag}
                        onMouseMove$={(event) => {
                            dragging(event.movementX, event.movementY);
                        }}
                        onMouseUp$={() => drop()}
                        onMouseLeave$={() => drop()}
                        style={{
                            'background-color': Common.colorPalette[settings.theme].windowBorder,
                        }}
                    >
                        <div class="title">
                            <Icon name={appSet.apps[props.id].app.icon.name} size={20} />
                            <span>
                                {appSet.apps[props.id].app.name}
                            </span>
                        </div>
                        <div class="actions">
                            <button class="button minimize" onClick$={minimize}></button>
                            <button class="button resize" onClick$={maximize}></button>
                            <button class="button close" onClick$={close}></button>
                        </div>
                    </div>
                    <div 
                        class="body"
                        style={{
                            'height': appSet.apps[props.id].maximized ? 'calc(100vh - 190px)' : '349px',
                            'background-color': Common.colorPalette[settings.theme].windowBackground,
                            'overflow': 'auto',
                        }}
                    >
                        {appSet.apps[props.id].app.content()}
                    </div>
                </div>
            )}
        </>
    )
});
