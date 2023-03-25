import { $, component$ } from "@builder.io/qwik";
import DesktopApp from "../desktop-app/desktop-app";
import { App } from "~/models/app";
import Terminal from "../terminal/terminal";
import { generateId } from "~/services/mutations";

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
              key={generateId()}
              showTitle={true}
            />
          ))}
        </>
    )
});
