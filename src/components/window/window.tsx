import { $, component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik";
import style from './window.scss?inline';
import Icon from '~/components/icon/icon';
import { ExecutedAppsContext, OpenedAppsContext } from "~/root";
import { App } from "~/models/app";
import ViewNotexist from "../view-notexist/view-notexist";

export default component$((props: App) => {
    useStylesScoped$(style);

    const _removeFromArray = $((array: unknown[], deleted: unknown) => {
        const index = array.indexOf(deleted);
        if (index !== -1) {
            array.splice(index, 1);
        }
        console.log(array);
    });

    const executedAppsState = useContext(ExecutedAppsContext);

    const openedAppsState = useContext(OpenedAppsContext);

    const store = useStore({
        x: 0,
        y: 0,
        dragging: false,
        minimized: false,
        maximized: false,
        closed: false,
    });
    
    const drag = $(() => {
        if (store.maximized) {
            store.maximized = false;
        }
        
        store.dragging = true;
    });

    const minimize = $(() => {
        store.minimized = !store.minimized;
        openedAppsState.apps.push(props);
        _removeFromArray(executedAppsState.apps, props);
    });

    const maximize = $(() => {
        store.x = 0;
        store.y = 0;
        store.maximized = true;
    });

    const close = $(() => {
        store.closed = true;
        _removeFromArray(executedAppsState.apps, props);
        _removeFromArray(openedAppsState.apps, props);
    });

    const drop = $(() => store.dragging = false );

    return (        
        <>
            {store.closed || store.minimized ? null : (

                <div 
                    class="window" 
                    style={{
                        width: store.maximized ? '99%' : '550px',
                        max_height: store.maximized ? '90%' : '400px',
                        top: `${store.y}px`,
                        left: `${store.x}px`,
                    }}
                >
                    <div class="header"
                        onMouseDown$={drag}
                        onMouseMove$={(event) => {
                            if(store.dragging) {
                                store.x = store.x + event.movementX;
                                store.y = store.y + event.movementY;
                            }
                        }}
                        onMouseUp$={() => drop()}
                        onMouseLeave$={() => drop()}
                    >
                        <div class="title">
                            <Icon name={props.icon.name} size={20} />
                            <span>
                                {props.name}
                            </span>
                        </div>
                        <div class="actions">
                            <button class="button minimize" onClick$={minimize}>
                                _
                            </button>
                            <button class="button resize" onClick$={maximize}>
                                &#9744;
                            </button>
                            <button class="button close" onClick$={close}>
                                X
                            </button>
                        </div>
                    </div>
                    <div class="body">
                        {props.content ? props.content() : (
                            <ViewNotexist />
                        )}
                    </div>
                </div>
            )}
        </>
    )
});
