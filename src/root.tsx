import { $, component$, createContext, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { Link, QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import globalStyles from './global.scss?inline';
import { OSApps } from './models/os-apps';
import ViewIntroduction from './components/view-introduction/view-introduction';
import ViewContact from './components/view-contact/view-contact';

export const OpenedAppsContext = createContext<OSApps>('openedApps');
export const ExecutedAppsContext = createContext<OSApps>('executedApps');

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
      {
        icon: {
          name: 'folder.svg',
        },
        name: 'Introduction',
        content: $(() => <ViewIntroduction />),
      },
    ],
    count: 0,
  });

  const state = useStore({
    apps: [
      {
        icon: {
          name: 'github.svg',
        },
        name: 'GitHub',
        content: $(() => <Link href='https://github.com/carepollo' />),
      },
      {
        icon: {
          name: 'mail.svg',
        },
        name: 'Contact',
        content: $(() => <ViewContact />),
      },
    ],
    count: 0,
  });

  useContextProvider(OpenedAppsContext, state);
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
