import { Directory } from "~/models/directory";
import { Process } from "~/models/process";

/**
 * function that takes all windows and reset its active status to false, 
 * then set a process by the given ID status to true, it doens't affect
 * directly any context or settings of the OS.
 * @param settings the qwik context of os settings
 * @param datasource the qwik context of executed apps
 * @param id the id of the process to be set to active
 * @returns modified directory of executing processes with the active window set
 */
export const setActiveWindow = (datasource: Directory<Process>, id: string) => {
    const afterClicked: Directory<Process> = {};
    const keys = Object.keys(datasource);
    const processes = Object.values(datasource);

    for (let i = 0; i < keys.length; i++) {
        const element = processes[i];
        const id = keys[i];
        
        element.active = false;
        afterClicked[id] = element;
    }
    
    afterClicked[id].active = true;
    return afterClicked;
};

/**
 * generate a random ID, it is an alternative implementation of `randomUUID`, because
 * the built-in functions doesn't work on qwik runtime.
 * @returns two random numbers and a '-' caracter
 * @example
 * 
 * const id = generateId(); // returns 'xxxxxx-xxxxxx'
 */
export const generateId = (): string =>  {
    const part1 = Math.floor(Math.random() * 10000000);
    const part2 = Math.floor(Math.random() * 10000000);
    return `${part1}-${part2}`;
}
