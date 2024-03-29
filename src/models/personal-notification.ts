/**
 * data of messages to send to discord bot
 */
export interface PersonalNotification {
    /**
     * title of mail, max 100 characters
     */
    title: string;

    /**
     * long text with body of message, no rich text allowed
     */
    message: string;

    /**
     * a way to contact the author of the notification
     */
    contact: string;
}
