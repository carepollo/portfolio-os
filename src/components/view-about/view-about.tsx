import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

export default component$(() => {    
    return (
        <div style={{'text-align': 'justify', 'padding': '15px'}}>
            <h3>About me</h3>
            <div>
                <p>
                    I am a software engineering student from Colombia. I constantly look 
                    for new technologies to learn and improve my professional toolset.
                </p>
                <p>
                    My journey in tech started with a course on 2019 about fullstack web development. 
                    My need to always go further than the given requirements led me to work remotely 
                    for a start-up, a local governmental institution and mid-size companies where I had 
                    the opportunity to add value through digital products that fits the company's needs.
                </p>
                <p>
                    Currently I am looking to work as a backend engineer. In my free time I am 
                    contributing to FOSS projects to learn more about the field and make myself a 
                    better fit and a better professional.   
                </p>
            </div>
            <h3>More about me</h3>
            <div>
                <Icon name="mail" size={20} />
                <Icon name="github" size={20} />
                {/* <Icon name="linkedin" size={20} /> */}
                {/* <Icon name="telegram" size={20} /> */}
            </div>
        </div>
    );
});
