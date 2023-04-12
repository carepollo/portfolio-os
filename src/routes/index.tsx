import { 
  $,
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
 } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import Window from '~/components/window/window';
import { disk } from '~/disk';
import { CurrentSettings, RunningAppsDirectory } from '~/root';
import Header from '../components/header/header';
import AppBar from '~/components/app-bar/app-bar';
import styles from './index.scss?inline';
import Screen from '~/components/screen/screen';
import { generateId, setActiveWindow, startProcess } from '~/services/mutations';
import IconAction from '~/components/icon-action/icon-action';
import SideBar from '~/components/side-bar/side-bar';
import { notifyMessage } from '~/services/notifications';


export default component$(() => {

  useStylesScoped$(styles);
  
  const executingApps = useContext(RunningAppsDirectory);

  const settings = useContext(CurrentSettings);

  const desktopAppsLocation = 'desktop';

  const height = useSignal('');

  useVisibleTask$(async () => {
    const getHeight = () => (window.innerHeight - 38) + 'px';
    
    height.value = getHeight();
    window.addEventListener('resize', () => {
      height.value = getHeight();
    });

    await notifyMessage({
      title: 'New visitor',
      message: new Date().toString(),
      contact: 'In Portfolio OS',
    });
  });

  return (
    <div class="view">

      <div class="header">
        <Header />
      </div>
      <div class="body" style={{height: height.value}}>

        {settings.mode === 'touch' ? 
          <div class="sidebar" style={{height: height.value}}>
            <SideBar />
          </div> : null
        }

        <div class="desktop">

          {/* this are the icons on desktop */}
          <section class="layout">
            {Object.values(disk[desktopAppsLocation]).map(({ app }) => (
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
                key={generateId()}
              />
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
