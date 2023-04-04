import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import { IconAnchorProps } from "~/models/icon-anchor.props";

/**
 * icon that opens new page
 */
export default component$((props: IconAnchorProps) => {
    return (
        <a href={props.site} target="_blank" rel="noopener">
            <Icon name={props.name} size={props.size} title={props.title} />
        </a>
    )
});
