export interface WindowProps<T> {

    /**
     * the child component to show on body
     */
    content: T;

    /**
     * name that represents the app that is being displayed
     */
    title: string;

    /**
     * goes on header of window, beside the title, it is a valid picture file name located on `public`
     */
    icon: string;
}

export interface WindowStore {
    /**
     * position of element on axis X of window
     */
    x: number;

    /**
     * position of element on axis Y of element
     */
    y: number;

    /**
     * if the element is on state of drag&drop is used to prevent possible
     * undefined behaviours
     */
    dragging: boolean;

    /**
     * if window is hidden app on barmenu
     */
    minimized: boolean;

    /**
     * flag to choose between maximum size of window or default
     */
    maximized: boolean;

    /**
     * to know when the component must delete itself
     */
    closed: boolean;
}
