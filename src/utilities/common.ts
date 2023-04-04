import { Directory } from "~/models/directory";
import { SystemPalette } from "~/models/system-palette";

/**
 * sort of equivalent to `environment` object in Angular projects.
 */
export class Common {

    /**
     * determine if the app is running in production mode
     */
    public static readonly production = !import.meta.env.DEV;

    /**
     * the url root location of server/api where to point the requests and server actions
     * 
     * **second value is temporary, shall be modified**
     */
    public static readonly serverPath = 'http://34.125.239.168'

    /**
     * the url root location of the self app
     */
    public static readonly clientPath = !Common.production ? 'http://localhost:5173' : 'https://portfolio-os-carepollo.vercel.app'

    /**
     * when opening a new app or after minimizing, the position that must recover
     * on the x axis
     */
    public static readonly defaultWindowPositionX: number = 0;
    
    /**
     * when opening a new app or after minimizing, the position that must recover
     * on the y axis
     */
    public static readonly defaultWindowPositionY: number = 38;

    /**
     * the colors and where they are used across the entire app
     */
    public static readonly colorPalette: Directory<SystemPalette> = {
        'light': {
            windowBorder: '#E1DFE1',
            windowBackground: 'white',
            textColor: 'black',
            appbarBackground: '#FFFFFF4D',
            headerBackground: '#FFFFFF99',
        },
        'dark': {
            windowBorder: '#161618',
            windowBackground: '#212124',
            textColor: 'white',
            appbarBackground: '#0000004D',
            headerBackground: '#00000099',
        },
    };

    public static readonly positions = {
        window: {
            x: 0,
            y: 38,
        },
        screen: {
            x: 0,
            y: 38,
        },
    }
}
