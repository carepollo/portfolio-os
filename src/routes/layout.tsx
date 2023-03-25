import { Slot, component$, useContext } from '@builder.io/qwik';
import Bootloading from '~/components/bootloading/bootloading';
import { Booting } from '~/root';

export default component$(() => {

  const booting = useContext(Booting);

  return (
    <>
      {booting.rerun ? ( <Slot /> ) : (<Bootloading />)}      
    </>
  );
});
