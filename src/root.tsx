import { 
  component$, 
  createContextId, 
  useContextProvider, 
  useStore, 
  useStyles$, 
  useVisibleTask$,
} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.scss?inline';
import { Process } from './models/process';
import { Common } from './utilities/common';
import { apps, states } from './installed';
import { Directory } from './models/directory';
import { OSSettings } from './models/os-settings';
import { generateId } from './services/mutations';
import { Machine } from './models/machine';


type ContextProcessesDirectory = {apps: Directory<Process>};

export const RunningAppsDirectory = createContextId<ContextProcessesDirectory>('runningApps');
export const CurrentSettings = createContextId<OSSettings>('osSettings');
export const SystemContext = createContextId<Machine>('system');

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const bootingup = useStore<Machine>({
    loaded: false,
    deviceType: 'desktop',
  });
  
  const settings = useStore<OSSettings>({
    theme: 'light',
    font: 'ubuntu',
    wallpaper: 'vecteezy',
    currentApp: '',
  });

  const processes = useStore<ContextProcessesDirectory>({apps: {}}, {deep: true});

  useContextProvider(CurrentSettings, settings);

  useContextProvider(RunningAppsDirectory, processes);

  useContextProvider(SystemContext, bootingup);

  const storageState = 'portfolioos_state';
  const storageSettings = 'portfolioos_settings';

  useVisibleTask$(() => {
    const possibleState = localStorage.getItem(storageState);
    const possibleSettings = localStorage.getItem(storageSettings);

    if (possibleState && possibleSettings) {
      const storedState: Directory<Process> = JSON.parse(possibleState);
      const storedSettings: OSSettings = JSON.parse(possibleSettings);
      const { theme, font, wallpaper, currentApp } = storedSettings;

      for (const key of Object.keys(storedState)) {
        const { id, x, y, minimized, maximized, closed, dragging, app, active, state } = storedState[key];
        processes.apps[key] = {
          id,
          x,
          y,
          minimized,
          maximized,
          closed,
          dragging,
          active,
          app: apps[app.name],
          // if it is a terminal app, use default state, use stored state otherwise
          state: app.name === 'esolang' ? states[app.name] : state,
        };
      }

      settings.theme = theme;
      settings.font = font;
      settings.wallpaper = wallpaper;
      settings.currentApp = currentApp;
    }
    else {
      const id = generateId();
      const introduction: Process = {
        id,
        app: apps['Introduction'],
        state: {},
        x: 50,
        y: 50,
        minimized: false,
        maximized: false,
        dragging: false,
        closed: false,
        active: true,
      };
      processes.apps[id] = introduction;
      settings.currentApp = introduction.app.name;
    }

    bootingup.deviceType = window.innerWidth > 624 ? 'desktop' : 'mobile';
    bootingup.loaded = true;
  });

  useVisibleTask$(({ track }) => {
    track(() => {
      if (bootingup.loaded) {
        localStorage.setItem(storageState, JSON.stringify(processes.apps));
      }
      return processes;
    });
    track(() => {
      if (bootingup.loaded) {
        localStorage.setItem(storageSettings, JSON.stringify(settings));
      }
      return settings;
    });
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
