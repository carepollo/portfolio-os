import { component$ } from "@builder.io/qwik";
import Chip from "../chip/chip";
import DatingSystemSSD from './datingsystem-ssd.mdx';

export default component$(() => {

    const techs = ['go', 'redis', 'dgraph', 'mongoDB', 'socket.io', 'fiber', 'jwt'];

    const skills =  ['RESTful API', 'Caching', 'Design Patterns', 'DS&A'];

    return (
        <div>
            <h2>Multimodal Dating Matchmaker Systems Design Document</h2>

            <h3>Overview</h3>
            <div>
                <p>
                    This is a monolithic RESTful API of the back-end of a dating app that supports 
                    search and matchmaking through various methods. Designed to serve many kinds of 
                    front-end applications, to be highly customizable yet simple to use while also 
                    providing a rich set of features to the clients.
                </p>
                
                <span>Technologies used:</span>
                {techs.map(tech => <Chip text={tech} />)}
                
                <br />
                <span>Skills applied:</span>
                {skills.map(skill => <Chip text={skill} />)}
            </div>

            <DatingSystemSSD />
        </div>
    );
});
