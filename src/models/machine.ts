/**
 * representation of a virtual machine, the system and the OS itself
 */
export interface Machine {
    /**
     * if the OS have fully booted up
     */
    loaded: boolean;

    /**
     * mobile or desktop, refers to what type of device must simulate is based on the screen size
     */
    deviceType: 'mobile' | 'desktop';
}
