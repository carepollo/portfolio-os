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

    const validateText = $((input: string) => {
        // const pattern = /^(?!\s*[!@#$%^&*()_+\-={}\[\]\\|:;"'<>,.?/`~]+\s*$)(?![',`"])[^\s',`"]+$/; //alternate
        const pattern = /^(?!.*['"`]).*\S.*$/;
        return pattern.test(input);
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

                    const validTitle = await validateText(title) && title.length > 6;
                    const validEmail = await validateEmail(contact);
                    const validMessage = await validateText(message) && message.length > 20;

                    if (validTitle && validEmail && validMessage) {
                        submit({title, message, contact});
                        const optMessage = $(() => <p></p>);
                        openModal(modalContext, 'Message sent', optMessage);
                    } else {
                        const title = 'Form entry does not meet requirements';
                        const message = $(() => <div>
                            <p>
                                The form must follow this constrainsts:
                            </p>
                            <ul>
                                <li>title must be at least 6 characters long</li>
                                <li>message must be at least 20 characters long</li>
                                <li>message must not contain the characters ', " or `</li>
                                <li>email address must be syntactically valid</li>
                            </ul>
                        </div>)
                        openModal(modalContext, title, message);
                    }
                }}>
                    Send
                </button>
            </form>
        </>
    );
});
