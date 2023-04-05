import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import styles from './app-bar.scss?inline';
import { Common } from "~/utilities/common";
import IconAction from "../icon-action/icon-action";
import { setActiveWindow } from "~/services/mutations";

/**
 * this bar will show the executing apps
 */
export default component$(() => {
    useStylesScoped$(styles);

    const executingApps = useContext(RunningAppsDirectory);
    const settings = useContext(CurrentSettings);
    
    return (
      <div 
        class="appbar" 
        style={{'background-color': Common.colorPalette[settings.theme].appbarBackground}}
      >
        {Object.values(executingApps.apps).map(process => (
          <IconAction 
            title={process.app.name}
            name={process.app.icon.name}
            trigger="click"
            action={$(() => {
              const minimization = executingApps.apps[process.id];
              executingApps.apps[process.id].minimized = !minimization.minimized;

              //if it is un-minimizing, set as active app 
              if (!executingApps.apps[process.id].minimized) {
                const changedActive = setActiveWindow(executingApps.apps, process.id);
                executingApps.apps = changedActive;
                settings.currentApp = executingApps.apps[process.id].app.name;
              }
            })}
            key={process.id}
          />
        ))}
      </div>
    );
});
