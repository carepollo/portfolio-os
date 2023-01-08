import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.scss?inline';
import BarmenuIcon from '../barmenu-app/barmenu-app';
import { OpenedAppsContext } from '~/root';

/**
 * this is the apps bars on desktop view
 */
export default component$(() => {
  useStylesScoped$(styles);

  const state = useContext(OpenedAppsContext);

  return (
    <header>
      {state.apps.map((app, index) => (
        <BarmenuIcon icon={app.icon} name={app.name} content={app.content} key={index} />
      ))}
    </header>
  );
});
