import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { DesktopAppProps } from "~/models/desktop-app.props";
import Icon from "../icon/icon";
import styles from './desktop-app.scss?inline';

export default component$((props: DesktopAppProps) => {
    useStylesScoped$(styles);
    const isBeingOpened = useSignal(false);

    return (
        <>
            <div
                onDblClick$={() => isBeingOpened.value = true}
                onMouseLeave$={() => isBeingOpened.value = false}
                style={{filter: isBeingOpened.value ? 'sepia(1)' : 'unset'}}
            >
                <Icon icon={props.icon.icon} />
                <p>{props.title}</p>
            </div>
        </>
    )
});
