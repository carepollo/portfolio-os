import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import styles from './side-bar.scss?inline';
import IconAction from "../icon-action/icon-action";
import { Common } from "~/utilities/common";
import { invertTheme, setActiveWindow } from "~/services/mutations";

export default component$(() => {
    
    useStylesScoped$(styles);

    const executingApps = useContext(RunningAppsDirectory);

    const settings = useContext(CurrentSettings);

    return (
        <div 
            class="appbar"
            style={{
                'background-color': Common.colorPalette[settings.theme].appbarBackground,
            }}
        >
            <div class="opened">
                {Object.values(executingApps.apps).map(({app, id}) => (
                    <IconAction 
                        title={app.name}
                        name={app.icon.name}
                        trigger="click"
                        action={$(() => {
                            //do not minimize when is already unminimized, only repeat action
                            executingApps.apps[id].minimized = false;
                            const changedActive = setActiveWindow(executingApps.apps, id);
                            executingApps.apps = changedActive;
                            settings.currentApp = executingApps.apps[id].app.name;
                        })}
                        key={id}
                    />
                ))}
            </div>

            <div 
                class="separator" 
                style={{
                    border: `1px solid ${Common.colorPalette[invertTheme(settings.theme)].windowBackground}`,
                }}
            >
            </div>

            <div class="pinneds">
                <IconAction 
                    name="menu" 
                    trigger="click" 
                    title="Display desktop" 
                    action={$(() => {
                        const keys = Object.keys(executingApps.apps);

                        for (const key of keys) {
                            executingApps.apps[key].minimized = true;
                            executingApps.apps[key].active = false;
                        }
                    })}
                />
            </div>
        </div>
    );
});
