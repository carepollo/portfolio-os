import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import styles from './app-bar.scss?inline';
import BarmenuIcon from '../barmenu-app/barmenu-app';
import { Common } from "~/utilities/common";

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
        {Object.values(executingApps.apps).map(app => (
          <BarmenuIcon 
            icon={app.app.icon} 
            name={app.app.name} 
            content={app.app.content} 
            key={app.id} 
            id={app.id}
          />
        ))}
      </div>
    );
});
