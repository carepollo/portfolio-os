import { component$, useContext } from "@builder.io/qwik"
import { IconProps } from "~/models/icon.props";
import { SystemContext } from "~/root";

export default component$((props: IconProps) => {

  const system = useContext(SystemContext);

  let size = props.size + 'px';
  if (!props.size) {
    size = system.deviceType === 'desktop' ? '70px' : '50px';
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
