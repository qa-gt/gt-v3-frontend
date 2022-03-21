import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            loggedIn: sessionStorage.getItem('jwt') && true || false,
            jwt: sessionStorage.getItem('jwt'),
            user: sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')) || {},
            theme: localStorage.getItem("theme"),
            isMobile: (navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            ) && true) || false,
        }
    },
    mutations: {
        setJwt(state, data) {
            state.loggedIn = true;
            state.jwt = data;
            sessionStorage.setItem('jwt', data);
        },
        setUser(state, data) {
            data.gender = String(data.gender);
            state.user = data;
            sessionStorage.setItem('user', JSON.stringify(data));
        },
        changeTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
    }
})

export { store };
