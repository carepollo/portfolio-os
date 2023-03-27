import { component$ } from "@builder.io/qwik";
import DesktopApp from "../desktop-app/desktop-app";
import { generateId } from "~/services/mutations";
import { disk } from "~/disk";

export default component$(() => {

  const dataLocation = 'projects';

    return (
        <>
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
        </>
    )
});
