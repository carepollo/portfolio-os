import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

export default component$(() => {    
    return (
        <>
            <h3>About me</h3>
            <div style={{'text-align': 'justify'}}>
                <p>
                    I a software engineering student from Colombia that cares about reusability and
                    performance, I like to work in remote companies that focuses on technical excellence
                    in software quality and that values well defined tasks with a clear workflow.
                </p>
                <p>
                    My journey in tech started with a bootcamp on 2019 about Fullstack web development, 
                    my need to always go further than the given requirements led me to work remotely 
                    for a start-up, a local governmental institution and mid-size companies where I had 
                    the opportunity to add value through digital products that fits the company's needs.
                </p>
                <p>
                    Currently I am looking to work as a backend engineer remotely, in my free time I am 
                    contibuting to FOSS projects related to backend to learn more about the field and 
                    make myself a better fit for my ideal role.
                </p>
            </div>
            <h3>More about me</h3>
            <div>
                <Icon name="mail" size={20} />
                <Icon name="github" size={20} />
                {/* <Icon name="linkedin" size={20} /> */}
                {/* <Icon name="telegram" size={20} /> */}
            </div>
        </>
    );
});
