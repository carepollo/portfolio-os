import { $, component$, createContext, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { Link, QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import globalStyles from './global.scss?inline';
import { OSApps } from './models/os-apps';
import ViewIntroduction from './components/view-introduction/view-introduction';
import ViewContact from './components/view-contact/view-contact';
import { App } from './models/app';
import { Common } from './utilities/common';

export const OpenedAppsContext = createContext<OSApps>('openedApps');
export const ExecutedAppsContext = createContext<OSApps>('executedApps');

export const apps: App[] = [
  {
    id: Common.generateId(),
    name: 'Introduction',
    icon: {
      name: 'folder.svg',
    },
    content: $(() => <ViewIntroduction />),
  },
  {
    id: Common.generateId(),
    name: 'hangman',
    icon: {
      name: 'terminal.svg',
    },
    content: $(() => <ViewIntroduction />),
  },
  {
    id: Common.generateId(),
    name: 'esolang',
    icon: {
      name: 'terminal.svg',
    },
    content: $(() => <ViewIntroduction />),
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

  const minimized = useStore<OSApps>({
    apps: [
      {
        id: Common.generateId(),
        icon: {
          name: 'github.svg',
        },
        name: 'GitHub',
        content: $(() => <Link href='https://github.com/carepollo' />),
      },
      {
        id: Common.generateId(),
        icon: {
          name: 'mail.svg',
        },
        name: 'Contact',
        content: $(() => <ViewContact />),
      },
    ],
  });

  useContextProvider(OpenedAppsContext, minimized);

  useContextProvider(ExecutedAppsContext, executed);


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
