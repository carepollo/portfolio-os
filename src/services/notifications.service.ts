import { PersonalNotification } from "~/models/personal-notification";
import { Common } from "~/utilities/common";

/**
 * Generic function to make fetch requests, the A type is the type that server will return,
 * while B type is the type that client is sending
 * @param path the endpoint to point at on server
 * @param body the payload to send
 * @returns the result of request
 */
const notify = async <A = unknown, B = unknown>(path: string, body: B) => {
    const options: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    };

    const url = `${Common.serverPath}/${path}`;
    const result = await fetch(url, options);

    if (!result.ok) {
        throw new Error(result.statusText);
    }

    return result.json() as A;
}

export const notifyMessage = async (message: PersonalNotification) => {
    return await notify<{}, PersonalNotification>('submit', message);
}

export const notifyVisit = async (message: PersonalNotification) => {
    return await notify<PersonalNotification, PersonalNotification>('notify', message);
}

export const getVisitor = async () => {
    return await fetch('https://api.ipify.org/?format=json').then(res => res.json());
}
