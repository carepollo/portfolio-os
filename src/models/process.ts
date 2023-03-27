import { App } from "./app";

/**
 * wrapper of an app with data to use when is being executed
 */
export interface Process<T = unknown> {

    /**
     * position of window in x axis
     */
    x: number;

    /**
     * position of window in y axis
     */
    y: number;

    /**
     * minimization state of the window
     */
    minimized: boolean;

    /**
     * maximization state of the window
     */
    maximized: boolean;

    /**
     * state to differentite the dragging state of the static
     */
    dragging: boolean;
    
    /**
     * closed or not, kept just in case in needed
     */
    closed: boolean;

    /**
     * unique identificator of process
     */
    id: string;

    /**
     * static data of app
     */
    app: App;

    /**
     * data used by app, is specific and different per each case
     */
    state: T;

    /**
     * to determine on which app is the user right now so it can be overlayed over the others
     */
    active: boolean;

    /**
     * where is stored the origin app on the disk
     */
    location: string;
}
