export interface IconProps {

    /**
     * a name of .svg file that must be under the `/public/icons` folder
     */
    name: string;

    /**
     * width and height of the icon in pixels, have a default value of 75
     */
    size?: number;

    /**
     * text to put on the title html property
     */
    title?: string;
}
