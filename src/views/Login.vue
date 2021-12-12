<template>
  <div class="sign-in-section">
    <div class="title">
      <img src="../assets/imgs/logo.png" alt="" />
      <h4>{{ isAdminLogin ? "後台登入" : "登入 Alphitter" }}</h4>
    </div>
    <form @submit.prevent.stop="handleSubmit" class="sign-in-form">
      <div class="input account-input">
        <label for="account">帳號</label>
        <input v-model="account" type="account" id="account" />
      </div>
      <div class="input password-input">
        <label for="password">密碼</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button
        :disabled="isProcessing"
        :class="{ 'disabled-style': isProcessing }"
        class="sign-in-button"
        type="submit"
      >
        {{ isProcessing ? "不要一直按，會壞掉啦" : "登入" }}
      </button>
      <div class="other-links">
        <router-link v-if="!isAdminLogin" to="/register"
          >註冊 Alphitter</router-link
        >
        <span v-if="!isAdminLogin" class="dot">．</span>
        <router-link :to="isAdminLogin ? '/login' : '/admin/login'">
          {{ isAdminLogin ? "前台登入" : "後台登入" }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import adminAPI from "../apis/admin";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      account: "",
      password: "",
      //用來辨別是否為後台登入頁面
      isAdminLogin: this.$route.path === "/admin/login",
      // 擋使用者重複按登入按鈕
      isProcessing: false,
    };
  },
  watch: {
    //用來辨別是否為後台登入頁面
    $route() {
      this.isAdminLogin = this.$route.path === "/admin/login";
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteLeave(to, from, next) {
    this.account = "";
    this.password = "";
    next();
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          return Toast.fire({
            icon: "warning",
            title: "請輸入帳號或密碼",
          });
        }
        /************     
        因為後台登入和前台登入都在同一個頁面，所以要做一個判斷式判斷現在登入的使用者是否為後台管理者
        ************/
        this.isProcessing = true;
        let { data } = this.isAdminLogin
          ? await adminAPI.adminLogin({
              account: this.account,
              password: this.password,
            })
          : await authorizationAPI.logIn({
              account: this.account,
              password: this.password,
            });
        // 如果登入失敗
        if (data.status !== "success") {
          this.isProcessing = false;
          throw new Error(data.message);
        }
        // 如果登入成功
        Toast.fire({
          icon: "success",
          title: "登入成功",
        });
        // Vuex mutation setCurrentUser
        this.$store.commit("setCurrentUser", data.user);
        // 存取 token 並轉到 MainPage
        localStorage.setItem("simpleTwitter-token", data.token);
        /************     
          因為後台登入和前台登入都在同一個頁面，所以要做一個判斷式判斷現在登入的使用者是否為後台管理者
          ************/
        if (this.isAdminLogin === false) {
          this.$router.push("/");
        } else if (this.isAdminLogin === true) {
          this.$router.push("/admin/users");
        }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: `無法登入，請稍後再試。錯誤原因：${error}`,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
$orange: #ff6600;

.disabled-style {
  background: linear-gradient(to right, blue, $orange) !important;
}

.sign-in-section {
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    margin-bottom: 40px;
    img {
      width: 40px;
      height: 40px;
    }
    h4 {
      font-size: 23px;
      margin-top: 25px;
    }
  }
  .sign-in-form {
    .input {
      display: flex;
      flex-direction: column;
      background: #f5f8fa;
      width: 540px;
      height: 52px;
      border-radius: 8px;
      &.account-input {
        margin-bottom: 32px;
      }
      &.password-input {
        margin-bottom: 42px;
      }
      label {
        flex: 1;
        padding: 2px 0 0 5px;
        color: #657786;
        font-size: 15px;
        font-weight: 500;
      }
      input {
        border: none;
        border-bottom: 1px solid #657786;
        outline: none;
        background: #f5f8fa;
        font-size: 20px;
        color: #657786;
        letter-spacing: 2px;
      }
    }
    .sign-in-button {
      width: 540px;
      height: 46px;
      border-radius: 16px;
      background: $orange;
      color: white;
      font-size: 18px;
      font-weight: 700;
      outline: none;
      border: none;
      cursor: pointer;
      margin-bottom: 20px;
    }
  }

  .other-links {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .dot {
      color: #0099ff;
    }
    a {
      display: inline-block;
      text-decoration: none;
      border-bottom: 1px solid#0099ff;
      padding: 0;
      color: #0099ff;
      font-weight: 700;
      font-size: 18px;
    }
  }
}
</style>
