import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { generateId } from "~/services/mutations";
import { disk } from "~/disk";
import styles from './view-projects.scss?inline';

export default component$(() => {

  useStylesScoped$(styles);

  const dataLocation = 'projects';

    return (
        <div class="collection">
          {Object.values(disk[dataLocation]).map(({ app }) => (
            <>
            </>
          ))}
        </div>
    )
});
