import { Module } from "vuex";

export const testimonialsStore: Module<any, any> = {
    namespaced: true,
    state: {
        testimonials: [{
            title: "Richard Cooley",
            bodyContent: "I’ve had the privilege of working with Matt for going on 6 years. He joined my team fresh out of university with a great eye for design and a can-do attitude.</br></br>Over the years, Matt has consistently produced great work regardless of the task assigned. With every project he seeks to learn and implement something new so he is always improving his skill set.</br></br>In the last few years, Matt has taken to his more senior role always making time for junior members of the team so he can pass on his skills."
        },
        {
            title: "Sean Maller",
            bodyContent: "Matthew started making our web apps look better the second he started. Prior to him starting we used a bootstrap theme. Our sites worked on a PC but we weren’t building for mobile and tended to add functionality without considering usability.</br></br>Matthew came in and redeveloped existing sites to keep them familiar while improving them all. He replaced our hacked together bootstrap with flexbox, made sure the sites worked on tablets and mobiles and made all the sites consistent to both themselves and each other.</br></br>Matthew is solely responsible for the look and feel of the sites and has been commended by the business as a whole and everyone who uses them. He works quickly to a high standard and has made sure that everything looks, feels and works better.</br></br>Matt is passionate about the user experience and has great attention to detail, and it makes for better websites and happier users."
        },
        {
            title: "Nicholas Goodchild",
            bodyContent: "I have seen Matthew accomplish something close to witchcraft: he took an interface that has been in place for years and added some subtle animation and tweaks just to make it clear which aspects of it were in use and that it was processing information and every single person who has used it now swears blind that it is faster.</br></br>Think about that for a second: by leaving the UI fundamentally intact and only making minor adjustments to the UX he has made people believe our software is faster and more responsive. We can prove that it isn't but the universal perception is that we have improved it. It's not just an aesthetic improvement, it improves the user experience and raises people's opinion of the software.</br></br>Generally Matthew works incredibly quickly, making large changes that are consistent to themselves and an improvement to what has gone before without ever being confusing or losing vital information. Generally the pages load faster because of a decreased reliance on boiler plate elements and they're future proofed with responsive design baked in and everything is more accessible. He's a craftsman, a technician and may be a magician."
        }
        ]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        testimonials(state: any) {
            return state.testimonials;
        },
    }
}