import { component$ } from "@builder.io/qwik";
import Chip from "../chip/chip";

export default component$(() => {
    return (
        <div>
            <h2>Multimodal Dating Matchmaker</h2>

            <h3>Overview</h3>
            <div>
                <p>
                    This project aims
                </p>
                
                <span>Technologies used:</span>
                <Chip text="xd" icon={{name: 'terminal'}} />
                <br />
                <span>Skills applied:</span>
                <Chip text="xd" icon={{name: 'terminal'}} />
            </div>


            <h3>Introduction</h3>

            <h3>Architechture</h3>

            <h3>Design</h3>

            <h3>Testing</h3>

            <h3>Deployment</h3>

            <h3>Conclusion</h3>
            
        </div>
    );
});
