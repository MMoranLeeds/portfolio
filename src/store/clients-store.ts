import { Module } from "vuex";

export const clientsStore: Module<any, any> = {
    namespaced: true,
    state: {
        clients: [
            {
                name: "Argos",
            },
            {
                name: "Evans Cycles",
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
                name: "Stovax Gazco",
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
        clients(state: any) {
            return state.clients;
        },
    }
}