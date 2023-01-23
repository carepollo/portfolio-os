import { $, component$ } from "@builder.io/qwik";
import DesktopApp from "../desktop-app/desktop-app";
import { App } from "~/models/app";
import { Common } from "~/utilities/common";
import Terminal from "../terminal/terminal";

export default component$(() => {

    const projects: App[] = [
      {
        id: Common.generateId(),
        name: 'hangman',
        icon: {
          name: 'terminal.svg',
        },
        content: $(() => <Terminal />),
        minimized: false,
      },
      {
        id: Common.generateId(),
        name: 'esolang',
        icon: {
          name: 'terminal.svg',
        },
        content: $(() => <Terminal />),
        minimized: false,
      },
    ];

    return (
        <>
          {projects.map(project => (
              <DesktopApp 
                id={project.id}
                name={project.name} 
                icon={project.icon} 
                content={project.content} 
                minimized={project.minimized}
                key={project.id}
              />
          ))}
        </>
    )
})