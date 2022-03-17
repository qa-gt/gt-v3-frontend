import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            loggedIn: false,
            user: {
                id: '',
                name: '',
                tags: '',
                introduction: '',
                sex: '',
                grade: '',
            },
            theme: localStorage.getItem("theme"),
            isMobile: (navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            ) && true) || false,
        }
    },
    mutations: {
        login(state, data) {
            state.loggedIn = true;
            for (let i in data) {
                state.user[i] = data[i];
            }
        },
        changeTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
    }
})

export { store };