import { component$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Window from '~/components/window/window';
import { OpenedAppsContext } from '~/root';

export default component$(() => {
  
  const executingApps = useContext(OpenedAppsContext);

  return (
    <>
      {executingApps.apps.map(app => !app.minimized ?(
        <Window 
          id={app.id}
          name={app.name} 
          icon={app.icon} 
          content={app.content} 
          key={app.id} 
          minimized={app.minimized}
        />
      ): null)}
    </>
  );
});

/**
 * this is to configure the metadata of the head tag of the current route,
 * should be on every route to be described
 */
export const head: DocumentHead = {
  title: 'PortfolioOS',
};
