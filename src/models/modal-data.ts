import { QRL } from "@builder.io/qwik";
import { JSX } from "@builder.io/qwik/jsx-runtime";

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
    message: QRL<() => JSX.Element>;

    /**
     * to display/hide the component
     */
    show: boolean;
}
