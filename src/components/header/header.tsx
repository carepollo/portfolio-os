import { $, component$, useContext, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './header.scss?inline';
import Icon from '../icon/icon';
import { CurrentSettings } from '~/root';
import { Common } from '~/utilities/common';

/**
 * the header on site that says stuff
 */
export default component$(() => {

  const format = $((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  });

  useStylesScoped$(styles);

  const settings = useContext(CurrentSettings);

  const time = useSignal<string>();

  useVisibleTask$(() => {
    setInterval(async () => {
      const result = await format(new Date());
      time.value = result;
    }, 500);
  });

  return (
    <header style={{'background-color': Common.colorPalette[settings.theme].headerBackground}}>
      <div>
        <Icon name={'lens'} size={25} />
        <span>{settings.currentApp}</span>
      </div>
      <span>{time.value}</span>
    </header>
  );
});
