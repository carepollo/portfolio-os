import { IconProps } from "./icon.props";

/**
 * material-like chip, only supports text
 */
export interface ChipProps {
    
    icon?: IconProps;

    /**
     * content
     */
    text: string;
}
