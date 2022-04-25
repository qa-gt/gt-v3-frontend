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
        writingAtc: state.writingAtc,
        imageCache: state.imageCache,
        cards: state.cards,
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
            writingAtc: {},
            imageCache: {},
            cards: [],
        };
    },
    mutations: {
        setJwt(state, data) {
            state.jwt = data;
        },
        setUser(state, data) {
            data.gender = String(data.gender);
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
        setWritingAtc(state, data) {
            state.writingAtc = data;
        },
        delWritingAtc(state) {
            state.writingAtc = {};
        },
        addImageCache(state, data) {
            state.imageCache[data.key] = data.url;
        },
        saveCards(state, data) {
            let cards = data;
            state.cards = [];
            for (let i = 0; i < cards.length; i++) {
                cards[i].show = 0;
                state.cards.push(cards[i]);
            }
        },
    },
    getters: {
        loggedIn: state => state.jwt !== null,
    },
    plugins: [vuexPersistState.plugin],
});

export { store };
