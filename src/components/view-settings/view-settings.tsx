import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { CurrentSettings } from "~/root";
import styles from './view-settings.scss?inline';

export default component$(() => {
    useStylesScoped$(styles);

    const settings = useContext(CurrentSettings);

    return (
        <>
            <fieldset>
                <legend>Wallpaper</legend>
                <div>
                    <img 
                        class={`wallpaperoption ${settings.wallpaper === 'vecteezy' ? 'active' : ''}`} 
                        src="/pictures/vecteezy.webp" 
                        alt="wallpaper1" 
                        onClick$={() => settings.wallpaper = 'vecteezy'}
                    />
                    <img 
                        class={`wallpaperoption ${settings.wallpaper === '49' ? 'active' : ''}`} 
                        src="/pictures/49.webp" 
                        alt="wallpaper2" 
                        onClick$={() => settings.wallpaper = '49'}
                    />
                    <img 
                        class={`wallpaperoption ${settings.wallpaper === 'system76' ? 'active' : ''}`} 
                        src="/pictures/system76.webp" 
                        alt="wallpaper3" 
                        onClick$={() => settings.wallpaper = 'system76'}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Font</legend>
                <div>
                    <input 
                        type="radio" 
                        id="ubuntu" 
                        name="font" 
                        value="ubuntu"
                        checked={settings.font === 'ubuntu'}
                        onClick$={() => settings.font = 'ubuntu'}
                    />
                    <label for="ubuntu">Ubuntu</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="raleway" 
                        name="font" 
                        value="raleway"
                        checked={settings.font === 'raleway'}
                        onClick$={() => settings.font = 'raleway'}
                    />
                    <label for="raleway">Raleway</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="inconsolata" 
                        name="font" 
                        value="inconsolata"
                        checked={settings.font === 'inconsolata'}
                        onClick$={() => settings.font = 'inconsolata'}
                    />
                    <label for="inconsolata">Inconsolata</label>
                </div>
            </fieldset>

            <fieldset>
                <legend>Theme</legend>
                <div>
                    <input 
                        type="radio"
                        id="dark"
                        name="theme"
                        value="dark"
                        checked={settings.theme === 'dark'}
                        onClick$={() => settings.theme = 'dark'}
                    />
                    <label for="dark">Dark</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="light" 
                        name="theme" 
                        value="light" 
                        checked={settings.theme === 'light'}
                        onClick$={() => settings.theme = 'light'}
                    />
                    <label for="light">Light</label>
                </div>
            </fieldset>
        </>
    );
});
