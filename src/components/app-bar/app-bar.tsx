import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import styles from './app-bar.scss?inline';
import BarmenuApp from '../barmenu-app/barmenu-app';
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
        {Object.values(executingApps.apps).map(process => (
          <BarmenuApp 
            icon={process.app.icon} 
            name={process.app.name} 
            content={process.app.content} 
            key={process.id} 
            id={process.id}
          />
        ))}
      </div>
    );
});
