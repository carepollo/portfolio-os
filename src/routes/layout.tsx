import { Slot, component$, useContext } from '@builder.io/qwik';
import Bootloading from '~/components/bootloading/bootloading';
import { SystemContext } from '~/root';

export default component$(() => {

  const machine = useContext(SystemContext);

  return (
    <>
      {machine.loaded ? ( <Slot /> ) : (<Bootloading />)}      
    </>
  );
});
