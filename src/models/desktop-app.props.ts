import { IconProps } from "./icon.props";

export interface DesktopAppProps {
    icon: IconProps;
    title: string;
    position: {
        x: number;
        y: number;
    };
}
