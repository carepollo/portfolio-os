import { 
  component$,
  useContext,
  useStylesScoped$,
 } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import Window from '~/components/window/window';
import { disk } from '~/disk';
import { RunningAppsDirectory, SystemContext } from '~/root';
import DesktopApp from '~/components/desktop-app/desktop-app';
import Header from '../components/header/header';
import AppBar from '~/components/app-bar/app-bar';
import styles from './index.scss?inline';
import Screen from '~/components/screen/screen';
import { generateId } from '~/services/mutations';


export default component$(() => {

  useStylesScoped$(styles);
  
  const executingApps = useContext(RunningAppsDirectory);

  const system = useContext(SystemContext);

  const desktopAppsLocation = 'desktop';

  // useVisibleTask$(async () => {
  //   const token = await getVisitor();
  //   await notifyMessage({
  //     title: 'New visitor',
  //     message: 'In Portfolio OS',
  //     contact: token.ip,
  //   });
  // });

  return (
    <>
      <div class="view">
        <div class="header">
          <Header />
        </div>
        <div class="body">
            <div class="desktop">

              {/* this are the icons on desktop */}
              <section class="layout">
                {Object.values(disk[desktopAppsLocation]).map(({ app }) => (
                  <DesktopApp 
                    icon={app.icon} 
                    name={app.name} 
                    content={app.content} 
                    key={generateId()} 
                    showTitle={false}
                    location={desktopAppsLocation}
                  />
                ))}
              </section>

              {/* this are the opened windows */}
              {Object.values(executingApps.apps).map(app => !app.minimized ? (
                system.deviceType === 'desktop' ?
                  <Window id={app.id} key={app.id} /> :
                  <Screen id={app.id} key={app.id} />
              ): null)}
            </div>
            <div class="appbar">
              <AppBar />
            </div>
        </div>
      </div>
    </>
  );
});

/**
 * this is to configure the metadata of the head tag of the current route,
 * should be on every route to be described
 */
export const head: DocumentHead = {
  title: 'Portfolio OS',
};
