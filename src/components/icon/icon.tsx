import { component$, useContext } from "@builder.io/qwik"
import { IconProps } from "~/models/icon.props";
import { CurrentSettings, SystemContext } from "~/root";

export default component$((props: IconProps) => {

  const settings = useContext(CurrentSettings);

  let size = props.size + 'px';
  if (!props.size) {
    size = settings.mode === 'manual' ? '70px' : '50px';
  }
  
  return (
    <>
      <img 
        src={`/icons/${props.name}.svg`} 
        title={props.title}
        alt="icon" 
        style={{
          width: size,
          height: size,
        }} 
      />
    </>
  )
});
