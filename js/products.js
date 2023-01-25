import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const api = {
    url: 'https://vue3-course-api.hexschool.io/v2',
    path: 'element-ice',
};
const products = {};
const productDetail = {};

const app = {
    data() {
        return {
            api,
            products,
            productDetail,
        }
    },
    methods: {
        // 使用者權限確認
        checkUser() {
            axios.post(`${this.api.url}/api/user/check`)
            .then((res) => {
                this.getProdList();
            }).catch((err) =>{
                const { message } = err.data;
                alert(`無管理權限，${message}！`);
                window.location = './index.html';
            })
        },
        // 執行登出
        logout(){
            console.log('ok123');
            axios.post(`${this.api.url}/logout`)
            .then((res) => {
                alert('已登出！');
                window.location = './index.html';
            }).catch((err) =>{
                console.log(err);
            })
        },
        // 取得產品列表資料
        getProdList() {
            axios.get(`${this.api.url}/api/${this.api.path}/admin/products`)
            .then((res) => {
                const { products } = res.data;
                this.products = products;
            }).catch((err) => {
                alert('產品清單取得異常');
            })
        },
        // 顯示指定的產品明細資料
        showDetail(item) {
            this.productDetail = JSON.parse(JSON.stringify(item));
        },
        // 清除產品資料
        clearProduct() {
            this.productDetail = {};
        }
    },
    mounted() {
        // 取出 cookie
        // const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const cookieValue = document.cookie
        .split('; ').find((row) => row.startsWith('loginToken='))?.split('=')[1];

        axios.defaults.headers.common['Authorization'] = cookieValue;

        this.checkUser();
    }
};
createApp(app).mount('#app');