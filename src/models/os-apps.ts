import { App } from "./app";

/**
 * to satisfy any collection of running or minimized apps during runtime
 */
export interface OSApps {
    /**
     * collection of apps and its state
     */
    apps: App[];

}
