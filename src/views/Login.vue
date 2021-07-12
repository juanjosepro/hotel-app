<template>
  <div class="container-login">
    <form
      @submit.prevent="singUp"
      method="POST"
      action="login"
      class="login-form"
    >
      <small
        v-if="errors"
        :class="`msgError ${errors.errorMsg ? 'showMsgError' : ''}`"
        >{{ errors.errorMsg }}</small
      >
      <h1>Hotel App</h1>

      <ul class="credentials">
        <li>Email: <b>admin@gmail.com</b></li>
        <li>Password: <b>supernova08</b></li>
      </ul>

      <div class="txtb">
        <input
          v-model="form.email"
          ref="email"
          type="email"
          name="email"
          required
          autocomplete="off"
          :class="watchEmail ? 'focus' : ''"
          @click="focusEmail()"
        />
        <span data-placeholder="Email"></span>
      </div>
      <div class="txtb">
        <input
          v-model="form.password"
          ref="password"
          type="password"
          name="password"
          required
          autocomplete="off"
          :class="watchPassword ? 'focus' : ''"
          @click="focusPassword()"
        />
        <span data-placeholder="Password"></span>
      </div>

      <input type="submit" class="logbtn" value="Login" />

      <div class="bottom-text">
        Don't have account? <a href="#">Sign up</a><br /><br />
        <a class="btn btn-link" href="password.request">
          Forgot Your Password?
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    form: {
      email: "admin@gmail.com",
      password: "supernova08",
    },
    emailFocus: false,
    passwordFocus: false,
  }),
  computed: {
    ...mapState("login", ["userAuth", "auth", "errors"]),
    watchEmail() {
      return (this.emailFocus = this.form.email.length > 0 ? true : false);
    },
    watchPassword() {
      return (this.passwordFocus =
        this.form.password.length > 0 ? true : false);
    },
  },
  created() {
    this.isAuth()
  },
  methods: {
    ...mapActions("login", ["login", "getUserAuth"]),
    async singUp() {
      await this.login(this.form);
      this.isAuth()
    },
    isAuth(){
      if (this.auth) {
        if (this.userAuth.role.id === "1") {
          return this.$router.replace("/");
        }
        return this.$router.push({ name: "reception" });
      }
    },
    focusEmail() {
      this.$refs.email.focus();
    },
    focusPassword() {
      this.$refs.password.focus();
    },
  },
  mounted() {
    this.focusEmail();
  },
};
</script>

<style lang="scss" scoped src="@/sass/my-style/_login.scss" />
<style>
.credentials  li{
  list-style: none;
  text-align: center;
  font-size: 13px;
}
</style>