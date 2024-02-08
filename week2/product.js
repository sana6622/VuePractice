import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const site = "https://vue3-course-api.hexschool.io/v2/";
const api_path = "sana-teashop";

const app = createApp({
  data() {
    return {
      tempProduct: [],
      products: {},
    };
  },

  mounted() {
    //取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin()
    this.getData();
  },

  methods: {
    getData() {
      const api = `${site}api/${api_path}/admin/products/all`;
      axios.get(api).then((res) => {
        this.products = res.data.products;
      });
    },
    checkAdmin() {
      const checkApi = `${site}/api/user/check`;
      axios
        .post(checkApi)
        .then(() => {
          this.getData();
        })
        .catch((e) => {
          console.log("error", e);
          alert("尚未登入");
          window.location = 'index.html'
        });
    },
  },
});
app.mount("#app");
