import { $, component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-contact.scss?inline';
import { PersonalNotification } from "~/models/personal-notification";
import { notifyMessage } from "~/services/notifications";

export const triggerSend = (val: PersonalNotification) => {
    return notifyMessage(val);
}

export default component$(() => {
    useStylesScoped$(styles);

    const state = useStore<PersonalNotification>({
        title: '',
        message: '',
        contact: '',
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
            <form>
                <div class="inputForm">
                    <label>
                        <b>Title</b>
                    </label>
                    <input
                        onChange$={e => state.title = e.target.value}
                        maxLength={50}
                        placeholder="50 chars max"
                    />
                </div>
                <div class="inputForm">
                    <label>
                        <b>Email</b>
                    </label>
                    <input
                        onChange$={e => state.contact = e.target.value}
                        placeholder="Your email so I can get back to you"
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
                    const { title, message, contact } = state;
                    if (title !== '' && contact !== '' && message !== '') {
                        submit({title, message, contact});
                        alert('Message sent');
                    } else {
                        alert('You have not filled all fields');
                    }
                }}>
                    Send
                </button>
            </form>
        </>
    );
});
