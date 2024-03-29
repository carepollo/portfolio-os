import { 
  $,
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
import { disk } from './disk';
import { Directory } from './models/directory';
import { OSSettings } from './models/os-settings';
import { Machine } from './models/machine';
import { ModalData } from './models/modal-data';


type ContextProcessesDirectory = {apps: Directory<Process>};

export const RunningAppsDirectory = createContextId<ContextProcessesDirectory>('runningApps');
export const CurrentSettings = createContextId<OSSettings>('osSettings');
export const SystemContext = createContextId<Machine>('system');
export const GlobalModalContext = createContextId<ModalData>('modalState');

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
    screenHeight: 0,
    screenWidth: 0,
  });
  
  const settings = useStore<OSSettings>({
    theme: 'light',
    font: 'ubuntu',
    wallpaper: 'vecteezy',
    currentApp: '',
    mode: 'manual',
  });

  const modal = useStore<ModalData>({
    title: '',
    message: $(() => <p></p>),
    show: false,
  });

  const processes = useStore<ContextProcessesDirectory>({apps: {}}, {deep: true});

  useContextProvider(CurrentSettings, settings);
  useContextProvider(RunningAppsDirectory, processes);
  useContextProvider(SystemContext, bootingup);
  useContextProvider(GlobalModalContext, modal);

  const storageState = 'portfolioos_state';
  const storageSettings = 'portfolioos_settings';

  useVisibleTask$(() => {
    const loadStoredData = (possibleState: string, possibleSettings: string) => {
      const storedState: Directory<Process> = JSON.parse(possibleState);
      const storedSettings: OSSettings = JSON.parse(possibleSettings);
      const { theme, font, wallpaper, currentApp } = storedSettings;

      for (const key of Object.keys(storedState)) {
        const { location, app, state, id, x, y, minimized, maximized, active } = storedState[key];
        processes.apps[key] = {
          id,
          x,
          y,
          minimized,
          maximized,
          closed: false,
          dragging: false,
          active,
          app: disk[location][app.name].app, // inner component cannot be recovered.
          state,
          location,
        };
      }

      settings.theme = theme;
      settings.font = font;
      settings.wallpaper = wallpaper;
      settings.currentApp = currentApp;
    };


    try {
      const possibleState = localStorage.getItem(storageState);
      const possibleSettings = localStorage.getItem(storageSettings);

      if (possibleSettings && possibleState) {
        loadStoredData(possibleState, possibleSettings);
      }
    } catch (error) {
      localStorage.removeItem(storageState);
      localStorage.removeItem(storageSettings);
      processes.apps = {};
    }

    settings.mode = window.innerWidth > 700 ? 'manual' : 'touch';
    bootingup.screenHeight = window.innerHeight;
    bootingup.screenWidth = window.innerWidth;
    bootingup.loaded = true;

    window.addEventListener('resize', async () => {
      bootingup.screenHeight = window.innerHeight;
      bootingup.screenWidth = window.innerWidth;
    });
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
