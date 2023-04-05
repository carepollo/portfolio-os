import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings, GlobalModalContext } from "~/root";
import { Common } from "~/utilities/common";
import styles from './modal.scss?inline';
import { invertTheme } from "~/services/mutations";

/**
 * custom equivalent of native `alert` function
 */
export default component$(() => {

    useStylesScoped$(styles);

    const settings = useContext(CurrentSettings);

    const props = useContext(GlobalModalContext);
    
    
    return (
        <>
            {props.show ?  (
                <div 
                    class="overlay"
                    style={{
                        'background-color': Common.colorPalette[settings.theme].headerBackground,
                        'color': Common.colorPalette[settings.theme].textColor,
                    }}
                >
                    <div 
                        class="box" 
                        style={{
                            'background': Common.colorPalette[settings.theme].windowBackground,
                            'border': `2px solid ${Common.colorPalette[settings.theme].windowBorder}`,  
                            'box-shadow': `3px 3px 10px 0px ${Common.colorPalette[invertTheme(settings.theme)].windowBorder}`,
                        }}
                    >
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                        <button onClick$={() => props.show = false}>
                            OK
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
});
