import { disk } from "~/disk";
import { Directory } from "~/models/directory";
import { ModalData } from "~/models/modal-data";
import { OSSettings } from "~/models/os-settings";
import { Process } from "~/models/process";
import { Common } from "~/utilities/common";

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

/**
 * this method creates a new process, seachers the app {@link name} in {@link location} and 
 * overwrites the given {@link context} and also updates the global {@link settings} to set
 * the current active app.
 * 
 * @example
 * const openedApps = useContext(RunningApps);
 * const settings = useContext(CurrentSettings);
 * 
 * startProcess(openedApps.apps, 'desktop', 'Contact Me', settings);
 * 
 * @param context shall pass the Qwik context that holds the opened processes
 * @param location name of the folder where should be located within the disk
 * @param name name of app to be opened
 * @param settings global settings of the OS
 */
export const startProcess = (context: Directory<Process>, location: string, name: string, settings: OSSettings): void => {
    const x = settings.mode === 'manual' ? Common.positions.window.x : Common.positions.screen.x;
    const y = settings.mode === 'manual' ? Common.positions.window.y : Common.positions.screen.y;
    const id = generateId();
    const { app, state } = disk[location][name];
    const opened: Process = {
        id,
        app,
        state,
        x,
        y,
        minimized: false,
        maximized: false,
        dragging: false,
        closed: false,
        active: false,
        location,
    };
    context[id] = opened;
    const updatedWindowContext = setActiveWindow(context, id);
    context = updatedWindowContext;
    settings.currentApp = context[id].app.name; 
}

/**
 * to obtain the equivalent value of the theme in the opposite theme
 * @param theme the theme name stored on settings 'light' or 'dark'
 * @returns the opposite theme
 * @example
 * const currentTheme = 'light';
 * invertTheme(currentTheme) // returns 'dark'
 */
export const invertTheme = (theme: string): string => {
    const themes: Directory<string> = {
        'light': 'dark',
        'dark': 'light',
    };
    const result = themes[theme];
    return result;
}

/**
 * open the modal with the given data
 * @param context qwik context of the modal, a global one at the moment
 * @param title title, main message
 * @param message long text to show
 */
export const openModal = (context: ModalData, title: string, message: string = ''): void  => {
    context.show = true;
    context.message = message;
    context.title = title;
}
