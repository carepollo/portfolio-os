export class Common {

    /**
     * determine if the app is running in production mode
     */
    public static production = !import.meta.env.DEV;

    /**
     * generate a random ID, it is a dump implementation of `randomUUID`
     * @returns two random numbers and a '-' caracter
     */
    public static generateId(): string {
        const part1 = Math.floor(Math.random() * 100000);
        const part2 = Math.floor(Math.random() * 100000);
        return `${part1}-${part2}`;
    }

}
