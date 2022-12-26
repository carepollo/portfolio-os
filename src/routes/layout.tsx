import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import DesktopIcon from '~/components/desktop-icon/desktop-icon';

export default component$(() => {
  return (
    <>
      <Slot />
      <section class="desktop">
        <DesktopIcon icon={{icon: 'folder.svg'}} title='My Projects' />
        <DesktopIcon icon={{icon: 'folder.svg'}} title='About Me' />
      </section>
      <Header />
    </>
  );
});
