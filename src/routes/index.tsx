import { component$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Window from '~/components/window/window';
import { ExecutedAppsContext } from '~/root';

/**
 * this is to configure the metadata of the head tag of the current route,
 * should be on every route to be described
 */
export const head: DocumentHead = {
  title: 'Portfolio',
  meta: [
    {
      name: 'Home',
      content: 'Personal site to show stuff about ChickenFace',
    },
  ],
};

export default component$(() => {
  
  const executingApps = useContext(ExecutedAppsContext);

  return (
    <>
      {executingApps.apps.map(app => (
        <Window name={app.name} icon={app.icon} content={app.content} key={app.id} />
      ))}
    </>
  );
});
