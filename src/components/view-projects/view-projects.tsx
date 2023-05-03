import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-projects.scss?inline';
import { disk } from "~/disk";
import IconAction from "../icon-action/icon-action";
import { CurrentSettings, RunningAppsDirectory } from "~/root";
import { generateId, startProcess } from "~/services/mutations";

export default component$(() => {

  useStylesScoped$(styles);

  const processes = useContext(RunningAppsDirectory);

  const projects = Object.values(disk['projects']);

  const settings = useContext(CurrentSettings);

  return (
      <div class="collection">
        <p>no projects here at the moment lol</p>
        {projects.map(({ app }) => (
          <IconAction 
            name={app.icon.name}
            title={app.name}
            trigger={settings.mode === 'manual' ? 'dblclick' : 'click'}
            action={$(() => {
              startProcess(processes.apps, 'projects', app.name, settings);
            })}
            key={generateId()}
          />
        ))}
      </div>
  );
});
