import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory, SystemContext } from "~/root";
import { Common } from "~/utilities/common";
import styles from './screen.scss?inline';
import IconAction from "../icon-action/icon-action";

export default component$((props: {id: string}) => {

    useStylesScoped$(styles);

    const appSet = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    const system = useContext(SystemContext);

    return (
        <div 
            style={{
                'background-color': Common.colorPalette[settings.theme].windowBackground,
                'z-index': appSet.apps[props.id].active ? 3 : 2,
                'top': `${Common.positions.screen.y}px`,
                'left': `${Common.positions.screen.x}px`,
                'width': `${system.screenWidth - 80}px`,
                'height': `${system.screenHeight - 38}px`,
            }}
            class="screen"
        >
            <div class="header">
                <IconAction 
                    name="close"
                    title="close"
                    size={30}
                    trigger="click"
                    action={$(() => {
                        appSet.apps[props.id].closed;
                        delete appSet.apps[props.id];
                    })}
                />
            </div>
            <div class="body">
                {appSet.apps[props.id].app.content()}
            </div>
        </div>
    )
});
