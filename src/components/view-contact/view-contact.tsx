import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-contact.scss?inline';

export default component$(() => {
    useStylesScoped$(styles);

    const state = useStore({
        title: '',
        message: '',
    });

    return (
        <>
            <h2>Contact me</h2>
            <span>
                It would be helpful, if you add any way to contact you in your message so I can know
                how to get you back.
            </span>
            <br />
            <form onSubmit$={e => {
                    e.preventDefault();
                    console.log(state);
                }}>
                <div class="inputForm">
                    <label>
                        <b>Title</b>
                    </label>
                    <input onChange$={e => state.title = e.target.value} />
                </div>
                <div class="inputForm">
                    <label>
                        <b>Message</b>
                    </label>
                    <textarea cols={30} rows={10} onChange$={e =>  state.message = e.target.value}></textarea>
                </div>

                <button type="submit" class="submitButton">
                    Send
                </button>
            </form>
        </>
    );
});
