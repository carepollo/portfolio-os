import { 
  $,
  component$,
  useContext,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
 } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { disk } from '~/disk';
import { CurrentSettings, RunningAppsDirectory, SystemContext } from '~/root';
import { generateId, setActiveWindow, startProcess } from '~/services/mutations';
import { notifyMessage } from '~/services/notifications';
import { Common } from '~/utilities/common';
import { Directory } from '~/models/directory';
import { Position } from '~/models/position';
import Window from '~/components/window/window';
import Header from '../components/header/header';
import AppBar from '~/components/app-bar/app-bar';
import styles from './index.scss?inline';
import Screen from '~/components/screen/screen';
import IconAction from '~/components/icon-action/icon-action';
import SideBar from '~/components/side-bar/side-bar';


export default component$(() => {

  useStylesScoped$(styles);
  
  const executingApps = useContext(RunningAppsDirectory);

  const settings = useContext(CurrentSettings);

  const system = useContext(SystemContext);

  const desktopAppsLocation = 'desktop';
  
  const appsPositions = useStore<Directory<Position>>({});

  appsPositions['a'] = {
    x: 0,
    y: 0,
  };

  useVisibleTask$(async () => {
    if (Common.production) {
      await notifyMessage({
        title: 'New visitor',
        message: new Date().toString(),
        contact: `In Portfolio OS - mode ${settings.mode}`,
      });  
    }
  });

  return (
    <div class="view">

      <div class="header">
        <Header />
      </div>
      <div class="body" style={{height: (system.screenHeight - 38) + 'px'}}>

        {settings.mode === 'touch' ? 
          <div class="sidebar" style={{height: (system.screenHeight - 38) + 'px'}}>
            <SideBar />
          </div> : null
        }

        <div class="desktop">

          {/* this are the icons on desktop */}
          <section class="layout">
            {Object.values(disk[desktopAppsLocation]).map(({ app }) => (
              <div class="hoverable" key={generateId()}>
                <IconAction 
                  name={app.icon.name} 
                  title={app.name} 
                  action={settings.mode === 'manual' ? $(() => {
                    startProcess(executingApps.apps, 'desktop', app.name, settings);
                  }) : $(() => {
                    //search if app is already executed then use that one, otherwise start new process
                    const existings = Object.values(executingApps.apps);
                    const found = existings.find(x => x.app.name === app.name);
                    if (found) {
                      setActiveWindow(executingApps.apps, found.id);
                      executingApps.apps[found.id].minimized = false;
                      settings.currentApp = executingApps.apps[found.id].app.name
                      return;
                    }

                    startProcess(executingApps.apps, 'desktop', app.name, settings);
                  })} 
                  trigger={settings.mode === 'manual' ? 'dblclick' : 'click'} 
                />
                <p>
                  {app.name}
                </p>
              </div>
            ))}
          </section>

          {/* this are the opened windows */}
          {Object.values(executingApps.apps).map(app => !app.minimized ? (
            settings.mode === 'manual' ?
              <Window id={app.id} key={app.id} /> :
              <Screen id={app.id} key={app.id} />
          ) : null)}
        </div>

      </div>

      {settings.mode === 'manual' ? 
        <div class="appbar">
          <AppBar />
        </div> : null
      }
    </div>
  );
});

/**
 * this is to configure the metadata of the head tag of the current route,
 * should be on every route to be described
 */
export const head: DocumentHead = {
  title: 'Portfolio OS',
};
