import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-notexist.scss?inline';

export default component$(() => {
    useStylesScoped$(styles);

    return (
        <div class="deathscreen">
            <div class="message">
                <h2>404 Not found</h2>
                <span>
                    The resource you are requesting cannot be shown due to any of the following causes
                </span>
                <ul>
                    <li>There has been an internal fatal error</li>
                    <li>The requested resource no longer exists</li>
                    <li>You are not authorized to access the requested resource</li>
                </ul>
            </div>
        </div>
    )
});
