import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-projects.scss?inline';

export default component$(() => {

  useStylesScoped$(styles);

  return (
      <div class="collection">
        <p>here goes projects when I have some xd</p>
      </div>
  );
});
