import { $, component$ } from "@builder.io/qwik";
import DesktopApp from "../desktop-app/desktop-app";
import { App } from "~/models/app";
import { Common } from "~/utilities/common";
import Terminal from "../terminal/terminal";

export default component$(() => {

    const projects: App[] = [
      {
        name: 'esolang',
        icon: {
          name: 'terminal',
        },
        content: $(() => <Terminal program="esolang" />),
      },
    ];

    return (
        <>
          {projects.map(project => (
            <DesktopApp 
              name={project.name} 
              icon={project.icon} 
              content={project.content} 
              key={Common.generateId()}
              showTitle={true}
            />
          ))}
        </>
    )
});
