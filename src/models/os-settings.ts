/**
 * data of OS on runtime.
 * might contain as well the state of the app at runtime to be resumed
 */
export interface OSSettings {
    /**
     * color of windows borders, background and color of fonts 
     */
    theme: 'light' | 'dark';

    /**
     * default font to show on system
     */
    font: string;

    /**
     * wallpaper to show on background
     */
    wallpaper: string;

    /**
     * the app being used
     */
    currentApp: string;

    /**
     * `touch` is preferred for mobile devices
     * `manual` is preferred for desktop devices
     * but should work correctly with both
     */
    mode: 'touch' | 'manual';
}
