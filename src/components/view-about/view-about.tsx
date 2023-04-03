import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

export default component$(() => {    
    return (
        <>
            <h3>About me</h3>
            <div style={{'text-align': 'justify'}}>
                {/* <p>
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
                </p> */}


                <p>
                    I am a software engineering student that since 2019 have worked as fullstack 
                    web developer, working for a local governmental institution, remotely for 
                    a start-up and mid-size companies where I added value to theses companies by 
                    creating digital products that satisfy the company's needs for its final users.
                </p>
                <p>
                    I am the kind of person who cares about reusability and performance and 
                    I want to keep working remotely as a backend developer for companies that 
                    need scalable and highly performant backend systems for its businesses.
                </p>

            </div>
            <h3>More about me</h3>
            <div>
                <Icon name="mail" size={20} />
                <Icon name="github" size={20} />
                <Icon name="discord" size={20} />
                {/* <Icon name="telegram" size={20} /> */}
            </div>
        </>
    );
});
