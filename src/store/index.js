import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state() {
        return {
            loggedIn: false,
            jwt: null,
            user: {},
            theme: "light",
            isMobile: (navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            ) && true) || false,
        }
    },
    mutations: {
        setJwt(state, data) {
            state.loggedIn = true;
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
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        paths: ['theme', 'user', 'loggedIn', 'jwt'],
    })],
})

export { store };
