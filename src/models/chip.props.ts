/**
 * material-like chip, only supports text
 */
export interface ChipProps {
    /**
     * bg color and text color to use
     */
    theme: 'normal' | 'success' | 'error' | 'warning';

    /**
     * content
     */
    text: string;
}
