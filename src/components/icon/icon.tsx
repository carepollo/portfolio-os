import { component$ } from "@builder.io/qwik"
import { IconProps } from "~/models/icon.props";

export default component$((props: IconProps) => {

  let size = props.size + 'px';
  if (!props.size) {
    size = '70px';
  }
  
  return (
    <>
      <img 
        src={`/icons/${props.name}.svg`} 
        alt="icon" 
        style={{
          width: size,
          height: size,
        }} 
      />
    </>
  )
});
