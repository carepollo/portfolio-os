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
    public static serverPath = !Common.production ? 'http://localhost:5000' : 'http://seuetestings.eastus.cloudapp.azure.com'

    /**
     * the url root location of the self app
     */
    public static clientPath = !Common.production ? 'http://localhost:5173' : 'https://portfolio-carepollo.vercel.app/'
}
