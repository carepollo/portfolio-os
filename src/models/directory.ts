/**
 * to generate directories
 */
export type Directory<T> = {
    /**
     * from a given string you give a value
     */
    [x: string]: T;
}
