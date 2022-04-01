import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexPersistState = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({
        theme: state.theme,
        user: state.user,
        jwt: state.jwt,
        readedAtc: state.readedAtc,
        uploadKey: state.uploadKey,
    }),
});

const store = createStore({
    state() {
        return {
            jwt: null,
            user: {},
            theme: "light",
            readedAtc: [],
            uploadKey: null,
        };
    },
    mutations: {
        setJwt(state, data) {
            state.jwt = data;
        },
        setUser(state, data) {
            data.gender = String(data.gender);
            data.yunxiao = data.yunxiao;
            state.user = data;
        },
        logout(state) {
            state.jwt = null;
            state.user = {};
        },
        changeTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        addReadedAtc(state, id) {
            state.readedAtc.push(id);
        },
        setUploadKey(state, data) {
            data.expire = Date.now() + 1700 * 1000;
            state.uploadKey = data;
        },
    },
    getters: {
        loggedIn: state => state.jwt !== null,
    },
    plugins: [vuexPersistState.plugin],
});

export { store };
