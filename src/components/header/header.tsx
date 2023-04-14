import { $, component$, useContext, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './header.scss?inline';
import Icon from '../icon/icon';
import { CurrentSettings } from '~/root';
import { Common } from '~/utilities/common';
import { formatTime } from '~/services/mutations';

/**
 * the header on site that says stuff
 */
export default component$(() => {

  useStylesScoped$(styles);

  const settings = useContext(CurrentSettings);

  const time = useSignal<string>(formatTime(new Date()));

  useVisibleTask$(() => {
    setInterval(() => {
      const result = formatTime(new Date());
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
