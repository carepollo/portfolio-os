import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

/**
 * this is to configure the metadata of the head tag of the current route,
 * should be on every route to be described
 */
export const head: DocumentHead = {
  title: 'Portfolio',
  meta: [
    {
      name: 'Home',
      content: 'Personal site to show off who I am and what I can do',
    },
  ],
};

export default component$(() => {
  return (
    <div>
    </div>
  );
});
