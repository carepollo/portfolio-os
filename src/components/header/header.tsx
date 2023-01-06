import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.scss?inline';
import BarmenuIcon from '../barmenu-icon/barmenu-app';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <BarmenuIcon icon={{icon:'github.svg'}} title='GitHub' />
      <BarmenuIcon icon={{icon:'discord.svg'}} title='Message' />
      <BarmenuIcon icon={{icon:'mail.svg'}} title='Email' />
    </header>
  );
});
