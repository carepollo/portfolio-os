import { Directory } from "~/models/directory";
import { SystemPalette } from "~/models/system-palette";

/**
 * sort of equivalent to `environment` object in Angular projects.
 */
export class Common {

    /**
     * determine if the app is running in production mode
     */
    public static production = !import.meta.env.DEV;

    /**
     * generate a random ID, it is an alternative implementation of `randomUUID`, because
     * the built-in functions doesn't work on qwik runtime.
     * @returns two random numbers and a '-' caracter
     * @example
     * 
     * const id = Common.generateId(); // returns 'xxxxxx-xxxxxx'
     */
    public static generateId(): string {
        const part1 = Math.floor(Math.random() * 100000);
        const part2 = Math.floor(Math.random() * 100000);
        return `${part1}-${part2}`;
    }

    /**
     * the url root location of server/api where to point the requests and server actions
     * 
     * **second value is temporary, shall be modified**
     */
    public static serverPath = 'https://seuetestings.eastus.cloudapp.azure.com'

    /**
     * the url root location of the self app
     */
    public static clientPath = !Common.production ? 'http://localhost:5173' : 'https://portfolio-carepollo.vercel.app/'

    /**
     * when opening a new app or after minimizing, the position that must recover
     * on the x axis
     */
    public static defaultWindowPositionX: number = 0;
    
    /**
     * when opening a new app or after minimizing, the position that must recover
     * on the y axis
     */
    public static defaultWindowPositionY: number = 38;

    /**
     * the colors and where they are used across the entire app
     */
    public static colorPalette: Directory<SystemPalette> = {
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

}
