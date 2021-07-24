import { Module } from "vuex";

export const uiStore: Module<any, any> = {
    namespaced: true,
    state: {
        isIe11: false,
    },
    mutations: {
        checkIsIe11(state: any) {
            const ua = window.navigator.userAgent;
            if (ua.indexOf("Trident/7.0") > -1) {
                state.isIe11 = true;
            }
        },
    },
    actions: {
        async checkIsIe11(context: any) {
            await context.commit("checkIsIe11");
        },
    },
    getters: {
        isIe11(state: any) {
            return state.isIe11;
        },
    }
}