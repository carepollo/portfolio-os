/**
 * position of an element in the view of client in pixels
 */
export interface Position {

    /**
     * position over the x-axis in pixels
     */
    x: number;

    /**
     * position over the y-axis in pixels
     */
    y: number;

    dragging?: boolean;
}
