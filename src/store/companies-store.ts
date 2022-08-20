import { Module } from "vuex";

export const companiesStore: Module<any, any> = {
    namespaced: true,
    state: {
        companies: [
            {
                name: "Argos",
            },
            {
                name: "Evans Cycles",
            },
            {
                name: "Fruugo",
            },
            {
                name: "Government Digital Service",
            },
            {
                name: "Hobbycraft",
            },
            {
                name: "Incommunities Housing Association",
            },
            {
                name: "London City Airport",
            },
            {
                name: "networx Recruitment",
            },
            {
                name: "Stonegate Pub Company",
            },
            {
                name: "United Learning",
            }
        ],
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        companies(state: any) {
            return state.companies;
        },
    }
}