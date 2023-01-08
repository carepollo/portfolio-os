import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <>
            <h2>404 Not found</h2>
            <span>
                The resource you are requesting cannot be shown due to any of the following cause
            </span>
            <ul>
                <li>There has been an internal error</li>
                <li>The requested resource no longer exists</li>
                <li>You are trying to access a forbidden resource</li>
            </ul>
        </>
    )
});
