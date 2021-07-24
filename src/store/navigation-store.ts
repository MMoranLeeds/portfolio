import { Module } from "vuex";

export const navigationStore: Module<any, any> = {
    namespaced: true,
    state: {
        navigation: [
            {
                name: "GitHub",
                icon: "github",
                url: "https://github.com/MMoranLeeds/portfolio",
                ariaLabel: "View the source code for this project on GitHub"
            },
            {
                name: "CV Download",
                icon: "download",
                url: "https://drive.google.com/file/d/1tIYpMAuxt_2-Ur_WroUtyn7UYQduYSXX/view?usp=sharing",
                ariaLabel: "Download a copy of my CV"
            },
            {
                name: "Email",
                icon: "email",
                url: "mailto:matthewdm@live.co.uk?subject=I%20just%20wanted%20to%20drop%20you%20a%20quick%20email&body=Hi%20Matthew,%0D%0A%0D%0A",
                ariaLabel: "Get in touch by email"
            },
            {
                name: "LinkedIn",
                icon: "linkedin",
                url: "https://www.linkedin.com/in/matthewmoran5/",
                ariaLabel: "View my LinkedIn account"
            }
        ]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        navigation(state: any) {
            return state.navigation;
        },
    }
}