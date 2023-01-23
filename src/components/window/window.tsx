import { $, component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik";
import style from './window.scss?inline';
import Icon from '~/components/icon/icon';
import { OpenedAppsContext } from "~/root";
import { App } from "~/models/app";
import ViewNotexist from "../view-notexist/view-notexist";

export default component$((props: App) => {
    useStylesScoped$(style);

    const state = useContext(OpenedAppsContext);

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
        const copy = [...state.apps];
        const value = Object.assign({}, props);
        value.minimized = true;

        let index = 0;
        state.apps.find((value, i) => {
            index = i;
            return value.id === props.id;
        });

        copy[index] = value;
        state.apps = [...copy];
    });

    const maximize = $(() => {
        store.x = 0;
        store.y = 0;
        store.maximized = true;
    });

    const close = $(() => {
        store.closed = true;
        state.apps = [...state.apps.filter(app => app.id !== props.id)];
    });

    const drop = $(() => store.dragging = false );

    return (        
        <>
            <div 
                class="window" 
                style={{
                    width: store.maximized ? '99%' : '550px',
                    height: store.maximized ? '90%' : '400px',
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
                        <button class="button minimize" onClick$={minimize}></button>
                        <button class="button resize" onClick$={maximize}></button>
                        <button class="button close" onClick$={close}></button>
                    </div>
                </div>
                <div 
                    class="body"
                    style={{
                        height: store.maximized ? '100vh' : '400px'
                    }}
                >
                    {props.content ? props.content() : (
                        <ViewNotexist />
                    )}
                </div>
            </div>
        </>
    )
});
