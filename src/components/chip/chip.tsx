import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { ChipProps } from '~/models/chip.props';
import style from './chip.scss?inline';

export default component$((props: ChipProps) => {
    useStylesScoped$(style);

    const themes = {
        normal: {
            backgroundColor: 'grey',
            textColor: 'black',
        },
        success: {
            backgroundColor: 'green',
            textColor: 'white',
        },
        error: {
            backgroundColor: 'red',
            textColor: 'white',
        },
        warning: {
            backgroundColor: 'orange',
            textColor: 'black',
        }
    };
    const { backgroundColor, textColor} = themes[props.theme] ?? themes['normal'];

    return (
        <>
            <div class="chip" style={{'background-color': backgroundColor, 'color': textColor}}>
                {props.text}
            </div>
        </>
    )
});