import { $, component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-contact.scss?inline';
import { PersonalNotification } from "~/models/personal-notification";
import { notifyMessage } from "~/services/notifications.service";

export const triggerSend = (val: PersonalNotification) => {
    return notifyMessage(val);
}

export default component$(() => {
    useStylesScoped$(styles);

    const state = useStore<PersonalNotification>({
        title: '',
        message: '',
    });

    const submit = $((data: PersonalNotification) => {
        triggerSend(data).then(() => {
            state.title = '';
            state.message = '';
        });
    });

    return (
        <>
            <h2>Contact me</h2>
            <span>
                It would be helpful, if you add any way to contact you in your message so I can know
                how to get you back.
            </span>
            <br />
            <form>
                <div class="inputForm">
                    <label>
                        <b>Title</b>
                    </label>
                    <input
                        onChange$={e => state.title = e.target.value}
                        max={50}
                        placeholder="50 chars max"
                    />
                </div>
                <div class="inputForm">
                    <label>
                        <b>Message</b>
                    </label>
                    <textarea 
                        cols={30}
                        rows={10}
                        onChange$={e => state.message = e.target.value}
                        placeholder="Body of the message..."
                    ></textarea>
                </div>

                <button type="button" class="submitButton" onClick$={() => {
                    const { title, message } = state;
                    submit({title, message});
                    alert('Message sent');
                }}>
                    Send
                </button>
            </form>
        </>
    );
});
