import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { ChipProps } from '~/models/chip.props';
import Icon from "../icon/icon";
import style from './chip.scss?inline';

export default component$((props: ChipProps) => {
    useStylesScoped$(style);

    return (
        <span class="chip">
            {props.icon ? <Icon name={props.icon.name} size={15} /> : null}
            {props.text}
        </span>
    )
});
