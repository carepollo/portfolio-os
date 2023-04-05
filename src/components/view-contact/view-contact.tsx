import { $, component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik";
import styles from './view-contact.scss?inline';
import { PersonalNotification } from "~/models/personal-notification";
import { notifyMessage } from "~/services/notifications";
import { GlobalModalContext } from "~/root";
import { openModal } from "~/services/mutations";

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

    const validateEmail = $((email: string) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    });

    const modalContext = useContext(GlobalModalContext);

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

                <button type="button" class="submitButton" onClick$={async () => {
                    const { title, message, contact } = state;

                    const validTitle = title.length > 2;
                    const validEmail = await validateEmail(contact);
                    const validMessage = message.length > 2;

                    if (validTitle && validEmail && validMessage) {
                        submit({title, message, contact});
                        openModal(modalContext, 'Message sent');
                    } else {
                        const title = 'Form entry does not meet requirements';
                        const message = 'Title and message must have be at least 2 characters long and have a valid email addresss';
                        openModal(modalContext, title, message);
                    }
                }}>
                    Send
                </button>
            </form>
        </>
    );
});
