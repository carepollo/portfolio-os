import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-contact.scss?inline';

export default component$(() => {
    useStylesScoped$(styles);

    return (
        <>
            <h2>Contact me</h2>
            <p>
                Using this form you will contact me for sure, no matter if my email is broken,
                or I am offline on discord or don't answer on any social media, through this I
                will know that you contacted me.
            </p>
            <form>
                <div class="inputForm">
                    <label>Asunto</label>
                    <input />
                </div>
                <div class="inputForm">
                    <label>Mensaje</label>
                    <textarea cols={30} rows={10}></textarea>
                </div>

                <button type="submit">
                    Send
                </button>
            </form>
            <span>
                It would be helpful, if you add any way to contact you in your message so I can know
                how to get you back.
            </span>
        </>
    );
});
