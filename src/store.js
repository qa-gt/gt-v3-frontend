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
            theme: 'light',
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
        },
    }
})

export { store };
