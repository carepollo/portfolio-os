import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './desktop-app.scss?inline';
import { App } from "~/models/app";

export default component$((props: App) => {
    useStylesScoped$(styles);
    const isBeingOpened = useSignal(false);

    return (
        <>
            <div
                onDblClick$={() => isBeingOpened.value = true}
                onMouseLeave$={() => isBeingOpened.value = false}
                style={{filter: isBeingOpened.value ? 'sepia(1)' : 'unset'}}
            >
                <Icon name={props.icon.name} />
                <p>{props.name}</p>
            </div>
        </>
    )
});
