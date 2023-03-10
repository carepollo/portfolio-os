import { Slot, component$ } from '@builder.io/qwik';
import Header from '../components/header/header';
import DesktopIcon from '~/components/desktop-app/desktop-app';
import { apps } from '~/root';

export default component$(() => {
  return (
    <>
      <Slot />
      <section class="layout">
        {apps.map(app => (
          <DesktopIcon 
            id={app.id}
            icon={app.icon} 
            name={app.name} 
            content={app.content} 
            key={app.id} 
            minimized={app.minimized} 
          />
        ))}
      </section>
      <Header />
    </>
  );
});
