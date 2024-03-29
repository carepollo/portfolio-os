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
import { App } from '~/models/app';


export default component$(() => {

  useStylesScoped$(styles);
  
  const executingApps = useContext(RunningAppsDirectory);

  const settings = useContext(CurrentSettings);

  const system = useContext(SystemContext);

  const desktopAppsLocation = 'desktop';

  const icons = useStore<{icons: Directory<{app: App; position: Position;}>}>({
    icons: {},
  }, {deep: true});

  const drag = $((id: string) => {
    icons.icons[id].position.dragging = true;
  });

  const move = $((id: string, x: number, y: number) => {
    const icon = icons.icons[id].position;
    if (icon.dragging) {
      icon.x += x;
      icon.y += y;
    }
  });

  const drop = $((id: string) => {
    icons.icons[id].position.dragging = false;
  });

  const printIcons = $(() => {
    const { window, screen } = Common.positions;
    const initialX = settings.mode === 'manual' ? window.x : screen.x
    let x = initialX;
    let y = window.y;
    let count = 0;
    let col = Math.round(system.screenWidth / 95);

    if (settings.mode === 'touch') {
      col = Math.floor((system.screenWidth - screen.x) / 95);
      console.log(col, system.screenWidth, screen.x);
      
    }

    Object.values(disk[desktopAppsLocation]).forEach(({ app }) => {
      icons.icons[app.name] = {
        app,
        position: {
          dragging: false,
          x,
          y,
        }
      };
      x += 95;
      count++;
      
      if (count >= col) {
        x = initialX;
        y += 93;
      }
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await printIcons();
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
            {Object.values(icons.icons).map(({ app, position }) => (
              <div 
                class="hoverable" 
                key={generateId()}
                style={{
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                }}
                onMouseDown$={() => drag(app.name)}
                onMouseMove$={(e) => move(app.name, e.movementX, e.movementY)}
                onMouseUp$={() => drop(app.name)}
                onMouseLeave$={() => drop(app.name)}
              >
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
