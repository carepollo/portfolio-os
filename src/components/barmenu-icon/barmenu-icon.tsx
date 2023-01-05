import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import { ExecutableIconProps } from "~/models/executable-icon.props";
import styles from './barmenu-icon.scss?inline';

export default component$((props: ExecutableIconProps) => {
    useStylesScoped$(styles);
    const tooltipDisplay = useSignal(false);
    
    return (
        <>
            <div 
                class="container" 
                onMouseOver$={() => tooltipDisplay.value = true}
                onMouseOut$={() => tooltipDisplay.value = false}
                onClick$={() => console.log('openining new tab')}
            >
                <p 
                    class="tooltip" 
                    style={{display: tooltipDisplay.value ? 'block' : 'none'}}
                >
                    {props.title}
                </p>
                <Icon icon={props.icon.icon} />
            </div>
        </>
    )
});
