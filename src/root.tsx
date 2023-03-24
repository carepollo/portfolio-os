import { 
  component$, 
  createContextId, 
  useContextProvider, 
  useStore, 
  useStyles$, 
  useTask$,
} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.scss?inline';
import { Process } from './models/process';
import { Common } from './utilities/common';
import { apps } from './installed';
import { Directory } from './models/directory';
import { OSSettings } from './models/os-settings';


type ContextProcessesDirectory = {apps: Directory<Process>};

export const RunningAppsDirectory = createContextId<ContextProcessesDirectory>('runningApps');
export const CurrentSettings = createContextId<OSSettings>('osSettings');

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);
  
  const settings = useStore<OSSettings>({
    theme: 'light',
    font: 'ubuntu',
    wallpaper: 'vecteezy',
    currentApp: '',
    deviceType: 'desktop',
  });

  const processes = useStore<ContextProcessesDirectory>({apps: {}}, {deep: true});

  useContextProvider(CurrentSettings, settings);

  useContextProvider(RunningAppsDirectory, processes);

  useTask$(() => {
    const id = Common.generateId();
    const introduction: Process = {
      id,
      app: apps['Settings'],
      state: {},
      x: 50,
      y: 50,
      minimized: false,
      maximized: false,
      dragging: false,
      closed: false,
      active: false,
    };
    processes.apps[id] = introduction;
    settings.currentApp = introduction.app.name;
  });


  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <main 
          class="mainframe" 
          style={{
            'background': `url(/pictures/${settings.wallpaper}.webp)`,
            'font-family': `'${settings.font}', sans-serif`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'color': Common.colorPalette[settings.theme].textColor,
          }}
        >
          <RouterOutlet />
          <ServiceWorkerRegister />
        </main>
      </body>
    </QwikCityProvider>
  );
});
