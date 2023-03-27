import { component$, useStylesScoped$ } from "@builder.io/qwik";
import DesktopApp from "../desktop-app/desktop-app";
import { generateId } from "~/services/mutations";
import { disk } from "~/disk";
import styles from './view-projects.scss?inline';

export default component$(() => {

  useStylesScoped$(styles);

  const dataLocation = 'projects';

    return (
        <div class="collection">
          {Object.values(disk[dataLocation]).map(({ app }) => (
            <DesktopApp 
              name={app.name} 
              icon={app.icon} 
              content={app.content} 
              key={generateId()}
              showTitle={true}
              location={dataLocation}
            />
          ))}
        </div>
    )
});
