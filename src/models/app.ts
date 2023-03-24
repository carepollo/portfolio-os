import { JSX } from "@builder.io/qwik/jsx-runtime";
import { IconProps } from "./icon.props";
import { QRL } from "@builder.io/qwik";

/**
 * representation of any program on the app
 */
export interface App {
    /**
     * unique icon to represent the app
     */
    icon: IconProps,

    /**
     * the unique title of software
     */
    name: string;

    /**
     * child component with the actual software content
     * @example
     * const app: App {
     *  icon: {},
     *  name: '',
     *  content: $(() => <ChildComponent />), //wrap child component with qwik function
     * };
     */
    content: QRL<() => JSX.Element>;
}
