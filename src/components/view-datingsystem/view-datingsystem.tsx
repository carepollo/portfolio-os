import { component$ } from "@builder.io/qwik";
import Chip from "../chip/chip";

export default component$(() => {

    const techs = ['go', 'redis', 'dgraph', 'mongoDB', 'socket.io', 'fiber', 'graphql'];

    const skills =  ['RESTful API', 'Caching', 'Design Patterns', 'Data Structures and Algorithms'];

    return (
        <div>
            <h2>Multimodal Dating Matchmaker Systems Design Document</h2>

            <h3>Overview</h3>
            <div>
                <p>
                    This is a monolithic RESTful API of the back-end a dating application that supports 
                    search and matchmaking through various methods. Designed to serve many kinds of 
                    front-end applications, to be highly customizable yet simple to use while also providing 
                    a rich set of features to the clients.
                </p>
                
                <span>Technologies used:</span>
                {techs.map(tech => <Chip text={tech} />)}
                
                <br />
                <span>Skills applied:</span>
                {skills.map(skill => <Chip text={skill} />)}
            </div>


            <h3>Introduction</h3>
            <div>
                The scope of this project is divided in 5 modules
                <ul>
                    <li>
                        Authentication
                        <ul>
                            <li>A user can create account with email, google or facebook</li>
                            <li>A user can authenticate itself to the system by email, google, facebook (depending on the creation method)</li>
                        </ul>
                    </li>
                    <li>
                        Searher
                        <ul>
                            <li>The system will search profiles by location range</li>
                            <li>The system will search profiles by similarity</li>
                            <li>The system will search profiles by meaning</li>
                        </ul>
                    </li>
                    <li>
                        Dating Spectrum Settings
                        <ul>
                            <li>The user can set filter of positional limit when searching users</li>
                            <li>The user can set filter by age</li>
                            <li>The user can set filter of likes/dislikes</li>
                            <li>The user can set filter of what you are looking for (type of relationship)</li>
                            <li>The user can set filter of your gender of interest</li>
                            <li>The user can set filter of other user tags</li>
                        </ul>
                    </li>
                    <li>
                        Chat
                        <ul>                            
                            <li>A user can chat, send messages, video, and audio to another user.</li>
                            <li>A user can make a video-call to another user.</li>
                        </ul>
                    </li>
                    <li>
                        Matchmaker
                        <ul>
                            <li>A user can match through like/dislike of another user's profile.</li>
                            <li>A user can send only one message to another, and the other user accepts/rejects it.</li>
                            <li>The system matches users by algorithm (similarity or clustering).</li>
                        </ul>
                    </li>
                    <li>
                        Profile
                        <ul>
                            <li>A user can add a name or pseudonym.</li>
                            <li>A user can add demographics (education, religion, age, location, weight, height, occupation).</li>
                            <li>A user can add their likes/dislikes.</li>
                            <li>A user can choose which demographics they want to be displayed to.</li>
                        </ul>
                    </li>
                    <li>
                        Security
                        <ul>
                            <li>The system should have a way to verify accounts to prevent malicious accounts.</li>                            
                        </ul>
                    </li>
                    <li>
                        Payment
                        <ul>
                            <li>A registered user has a limited number of matches and requested profiles if it's a free account.</li>
                            <li>A user can make payments with Monero, PayPal, credit card, and G-Pay.</li>
                        </ul>
                    </li>
                    <li>
                        Stats
                        <ul>
                            <li>A user can see which demographics they have given like/dislike to on a timeline.</li>
                            <li>A user can see which data from their profile other users have viewed, and how long they stayed on their profile on a timeline.</li>
                        </ul>
                    </li>
                </ul>
                Besides the listed features above, the software should also be able to keep maximum 1000 concurrent user 
                and is expected to be deployed in cloud services like Azure, CGP or AWS.
            </div>

            <h3>Architechture</h3>
            <div>
                why choose REST over GRAPHQL
            </div>

            <h3>Design</h3>

            <h3>Testing</h3>

            <h3>Deployment</h3>

            <h3>Conclusion</h3>
            
        </div>
    );
});
