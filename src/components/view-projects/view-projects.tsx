import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { generateId, startProcess } from "~/services/mutations";
import { disk } from "~/disk";
import styles from './view-projects.scss?inline';
import IconAction from "../icon-action/icon-action";
import { CurrentSettings, RunningAppsDirectory } from "~/root";

export default component$(() => {

  useStylesScoped$(styles);

  const dataLocation = 'projects';

  const settings = useContext(CurrentSettings);

  const context = useContext(RunningAppsDirectory);

  return (
      <div class="collection">
        {Object.values(disk[dataLocation]).map(({ app }) => (
          <IconAction 
            title={app.name}
            name={app.icon.name}
            trigger={settings.mode === 'manual' ? 'click' : 'dblclick'}
            key={generateId()}
            action={$(() => {
              startProcess(context.apps, 'projects', app.name, settings);
            })}
          />
        ))}
      </div>
  );
});
