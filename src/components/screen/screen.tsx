import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import { Common } from "~/utilities/common";
import styles from './screen.scss?inline';

export default component$((props: {id: string}) => {

    useStylesScoped$(styles);

    const appSet = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    const close = $(() => {
        appSet.apps[props.id].closed = true;
        delete appSet.apps[props.id];        
    });

    const startY = useSignal<number | null>(null);

    return (
        <div 
            style={{
                'background-color': Common.colorPalette[settings.theme].windowBackground,
                'z-index': appSet.apps[props.id].active ? 3 : 2,
                'top': `${Common.positions.screen.y}px`,
                'left': `${Common.positions.screen.x}px`,
            }}
            onTouchStart$={(event) => {
                startY.value = event.touches[0].clientY;
            }}
            onTouchMove$={(event) => {
                if (!startY) {
                    return;
                }
            
                const endY = event.touches[0].clientY;
                const distance = startY.value! - endY;
            
                if (distance > 0 && distance > window.innerHeight * 0.2) {
                    close().then(() => startY.value = null);
                }
            }}
            onTouchEnd$={() => {
                startY.value = null;
            }}
        >
            {appSet.apps[props.id].app.content()}
        </div>
    )
});
