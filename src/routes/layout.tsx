import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import DesktopIcon from '~/components/desktop-icon/desktop-app';

export default component$(() => {
  return (
    <>
      <Slot />
      <section class="layout">
        <DesktopIcon icon={{icon: 'folder.svg'}} title='Introduction' position={{x: 0, y: 0}} />
        <DesktopIcon icon={{icon: 'terminal.svg'}} title='hangman' position={{x: 0, y: 0}} />
        <DesktopIcon icon={{icon: 'terminal.svg'}} title='esolang' position={{x: 0, y: 0}} />
        <DesktopIcon icon={{icon: 'terminal.svg'}} title='Elevator Simulation' position={{x: 0, y: 0}} />
      </section>
      <Header />
    </>
  );
});
