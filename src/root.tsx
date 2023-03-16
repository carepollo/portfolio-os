import { $, component$, createContextId, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import globalStyles from './global.scss?inline';
import { OSApps } from './models/os-apps';
import ViewIntroduction from './components/view-introduction/view-introduction';
import ViewContact from './components/view-contact/view-contact';
import ViewGithub from './components/view-github/view-github';
import { App } from './models/app';
import { Common } from './utilities/common';
import ViewProjects from './components/view-projects/view-projects';

export const OpenedAppsContext = createContextId<OSApps>('openedApps');

export const apps: App[] = [
  {
    id: Common.generateId(),
    name: 'Introduction',
    icon: {
      name: 'folder.svg',
    },
    content: $(() => <ViewIntroduction />),
    minimized: false,
  },
  {
    id: Common.generateId(),
    name: 'Projects',
    icon: {
      name: 'folder.svg',
    },
    content: $(() => <ViewProjects />),
    minimized: false,
  },
  {
    id: Common.generateId(),
    icon: {
      name: 'github.svg',
    },
    name: 'GitHub',
    content: $(() => <ViewGithub />),
    minimized: false,
  },
  {
    id: Common.generateId(),
    icon: {
      name: 'mail.svg',
    },
    name: 'Contact',
    content: $(() => <ViewContact />),
    minimized: false,
  },
];


export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);
  
  const executed = useStore<OSApps>({
    apps: [
      apps[0],
    ],
  });

  useContextProvider(OpenedAppsContext, executed);


  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <main class="mainframe">
          <RouterOutlet />
          <ServiceWorkerRegister />
        </main>
      </body>
    </QwikCityProvider>
  );
});
