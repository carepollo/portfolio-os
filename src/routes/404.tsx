import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import ViewNotexist from "~/components/view-notexist/view-notexist";

export default component$(() => {
    return (
        <ViewNotexist />
    )
});

export const head: DocumentHead = {
    title: 'Blue screen of death',
};
