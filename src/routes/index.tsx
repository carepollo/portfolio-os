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
import { generateId, startProcess } from '~/services/mutations';
import IconAction from '~/components/icon-action/icon-action';
import SideBar from '~/components/side-bar/side-bar';


export default component$(() => {

  useStylesScoped$(styles);
  
  const executingApps = useContext(RunningAppsDirectory);

  const settings = useContext(CurrentSettings);

  const desktopAppsLocation = 'desktop';

  const height = useSignal('');

  useVisibleTask$(async () => {
    // set calculated value of height and watch for changes to recalculate
    const getHeight = () => (window.innerHeight - 38) + 'px';
    
    height.value = getHeight();
    window.addEventListener('resize', () => {
      height.value = getHeight();
    });

    // await notifyMessage({
    //   title: 'New visitor',
    //   message: 'In Portfolio OS',
    //   contact: '',
    // });
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
                action={$(() => {
                  startProcess(executingApps.apps, 'desktop', app.name, settings); //TODO in touch mode prevent app to be opened twice
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
