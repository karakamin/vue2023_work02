import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const api = {
    url:"https://vue3-course-api.hexschool.io/v2",
    path :"element-ice",
};
const user = {
    username :"",
    password :"",
};
const app = {
    data() {
        return {
            api,
            user,
            }
    },
    methods:{
        login() {
            axios.post(`${this.api.url}/admin/signin`, this.user)
            .then((res) => {
                const{ message, expired, token } = res.data;

                // 寫入 cookies
                document.cookie = `loginToken=${token};expires=${new Date(expired)}; path=/`;
                alert(message);
                window.location = './products.html';
            }).catch((err) => {
                const { message, error: { code } } = err.data;
                code.f
                if(code === 'auth/user-not-found') {
                    alert('使用者不存在');
                } else {
                    alert(`帳號或密碼錯誤，${message}，請重新登入！`);
                }
            })
        }
    }
}
createApp(app)
    .mount('#app');
