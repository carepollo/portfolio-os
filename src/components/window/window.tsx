import { $, component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import style from './window.scss?inline';
import { WindowProps, WindowStore } from "~/models/window.configs";
import Icon from '~/components/icon/icon';

export default component$((props: WindowProps<unknown>) => {
    useStylesScoped$(style);
    const store = useStore<WindowStore>({
        x: 100,
        y: 300,
        dragging: false,
        minimized: false,
        maximized: false,
        closed: false,
    });
    
    const drag = $(() => {
        if (store.maximized) {
            store.maximized = false;
        }
        
        store.dragging = true;
    });

    const minimize = $(() => store.minimized = !store.minimized);

    const resize = $(() => {
        store.x = 0;
        store.y = 0;
        store.maximized = !store.maximized;
    });

    const close = $(() => store.closed = true);

    const drop = $(() => store.dragging = false );

    return (
        <>
            <div 
                class="window" 
                style={{
                    width: store.maximized ? '99%' : '550px',
                    max_height: store.maximized ? '90%' : '400px',
                    top: `${store.y}px`,
                    left: `${store.x}px`,
                }}
            >
                <div class="header"
                    onMouseDown$={drag}
                    onMouseMove$={(event) => {
                        if(store.dragging) {
                            store.x = store.x + event.movementX;
                            store.y = store.y + event.movementY;
                        }
                    }}
                    onMouseUp$={() => drop()}
                    onMouseLeave$={() => drop()}
                >
                    <div class="title">
                        <Icon icon={props.icon} size={20} />
                        <span>
                            {props.title}
                        </span>
                    </div>
                    <div class="actions">
                        <button class="button minimize" onClick$={minimize}>
                            _
                        </button>
                        <button class="button resize" onClick$={resize}>
                            &#9744;
                        </button>
                        <button class="button close" onClick$={close}>
                            X
                        </button>
                    </div>
                </div>
                <div class="body">
                    
                    <p>
                        <b>
                            Why do we use it?
                        </b>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>
            </div>

            {store.closed ? null : store.closed}
        </>
    )
});
