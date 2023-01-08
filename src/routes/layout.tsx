import { Slot, component$ } from '@builder.io/qwik';
import Header from '../components/header/header';
import DesktopIcon from '~/components/desktop-app/desktop-app';

export default component$(() => {
  return (
    <>
      <Slot />
      <section class="layout">
        <DesktopIcon icon={{name: 'folder.svg'}} name='Introduction' />
        <DesktopIcon icon={{name: 'terminal.svg'}} name='hangman' />
        <DesktopIcon icon={{name: 'terminal.svg'}} name='esolang' />
        {/* <DesktopIcon icon={{name: 'terminal.svg'}} name='Elevator Simulation' /> */}
      </section>
      <Header />
    </>
  );
});
