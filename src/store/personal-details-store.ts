import { Module } from "vuex";

export const personalDetailsStore: Module<any, any> = {
    namespaced: true,
    state: {
        name: "Matthew Moran",
        title: "Senior UI UX Designer / Front-end Developer",
        introduction: "A competent and experienced Senior UI UX Designer / Front-end Developer with over seven years extensive experience.</br> </br> Working to create immersive User Interfaces I am well versed in using industry standard design software alongside up and coming Front-end technologies. </br></br> With a focus on developing responsive accessible sites I enjoy a hands on approach; from initial concepts and prototyping through to the development stage.",
        contactNumber: "07759 952035",
        contactEmail: "matthewdm@live.co.uk",
        contactAddress: "East Morton",
        degree: "Derby University BA Hons 2:1 Graphic Design"
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        name(state: any) {
            return state.name;
        },
        title(state: any) {
            return state.title;
        },
        introduction(state: any) {
            return state.introduction;
        },
        contactNumber(state: any) {
            return state.contactNumber;
        },
        contactEmail(state: any) {
            return state.contactEmail;
        },
        contactAddress(state: any) {
            return state.contactAddress;
        },
        degree(state: any) {
            return state.degree;
        },
    }
}