/**
 * data that a modal requires to function
 */
export interface ModalData {
    /**
     * main message
     */
    title: string;

    /**
     * message of the modal
     */
    message: string;

    /**
     * to display/hide the component
     */
    show: boolean;
}
