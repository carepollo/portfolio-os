import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import { IconActionProps } from "~/models/icon-action.props";

export default component$((props: IconActionProps) => {

    const styles = {width: 'fit-content', height: 'fit-content', cursor: 'pointer'};

    const possibleTriggers = {
        'click': (
            <div onClick$={props.action} style={styles}>
                <Icon name={props.name} size={props.size} title={props.title} />
            </div>
        ),
        'dblclick': (
            <div onDblClick$={props.action} style={styles}>
                <Icon name={props.name} size={props.size} title={props.title} />
            </div>
        ),
    };

    const computed = possibleTriggers[props.trigger];
    return computed;
});
