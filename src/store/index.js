import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexPersistState = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({ theme: state.theme, user: state.user, jwt: state.jwt })
})

const store = createStore({
    state() {
        return {
            jwt: null,
            user: {},
            theme: "light",
        }
    },
    mutations: {
        setJwt(state, data) {
            state.jwt = data;
        },
        setUser(state, data) {
            data.gender = String(data.gender);
            state.user = data;
        },
        changeTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
    getters: {
        loggedIn: state => state.jwt !== null
    },
    plugins: [vuexPersistState.plugin]
})

export { store };
