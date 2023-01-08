import { component$, useStylesScoped$ } from "@builder.io/qwik"
import { IconProps } from "~/models/icon.props";
import styles from './icon.scss?inline';

export default component$((props: IconProps) => {
  useStylesScoped$(styles);

  let size = props.size + 'px';
  if (!props.size) {
    size = '70px';
  }
  
  return (
    <>
      <img 
        src={props.name} 
        alt="icon" 
        style={{
          width: size,
          height: size,
        }} 
      />
    </>
  )
});
