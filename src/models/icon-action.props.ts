import { QRL } from "@builder.io/qwik";
import { IconProps } from "./icon.props";

export interface IconActionProps extends IconProps {
    /**
     * behavior to perform when the event is triggered
     */
    action: QRL<() => void>;

    /**
     * overwrite the title as a mandatory property
     */
    title: string;

    /**
     * allowed event triggers
     */
    trigger: 'click' | 'dblclick';
}
