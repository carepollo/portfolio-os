/**
 * representation of a virtual machine, the system and the OS itself
 */
export interface Machine {
    /**
     * if the OS have fully booted up
     */
    loaded: boolean;

    /**
     * height of the screen of device in pixels
     */
    screenHeight: number;

    /**
     * width of the screen of device in pixels
     */
    screenWidth: number;
}
