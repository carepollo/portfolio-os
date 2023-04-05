import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import { Common } from "~/utilities/common";
import styles from './screen.scss?inline';

export default component$((props: {id: string}) => {

    useStylesScoped$(styles);

    const appSet = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    return (
        <div style={{
            'background-color': Common.colorPalette[settings.theme].windowBackground,
            'z-index': appSet.apps[props.id].active ? 3 : 2,
            'top': `${Common.positions.screen.y}px`,
            'left': `${Common.positions.screen.x}px`,
        }}>
            {appSet.apps[props.id].app.content()}
        </div>
    )
});
