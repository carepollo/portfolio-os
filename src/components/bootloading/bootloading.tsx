import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './bootloading.scss?inline';

export default component$(() => {
    useStylesScoped$(styles);

    return (
        <div class="background">
            <div class="spinner"></div>
        </div>
    )
});
