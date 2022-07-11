<template>
  <q-layout view="hHh lpR fFf">
    <main class="main">
      <div class="left-container">
        <img src="../assets/logo-texto.svg" alt="logo iblue branca" />
      </div>
      <q-page-container>
        <div class="container-login bg-primary text-white">
          <h4>Página de Login</h4>
          <form v-on:submit.prevent="login">
            <div class="form-login">
              <input
                placeholder="E-mail"
                type="email"
                class="input-email"
                v-model="email"
              />
              <input
                placeholder="Senha"
                type="password"
                class="input-password"
                v-model="password"
              />
              <div class="form-buttons">
                <q-btn class="login-button" type="submit">Entrar</q-btn>
              </div>
            </div>
          </form>
        </div>
      </q-page-container>
    </main>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue';
import Toastify from 'toastify-js';
import { authUser } from '../services/auth-service/auth-service';
import 'toastify-js/src/toastify.css';
import { findSectorByLeader } from '../services/setor-service/setor-service';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const data = {
          Email: this.email,
          Password: this.password,
        };

        const response = await authUser(data);

        Toastify({
          text: `${response.data?.statusCode}: ${response.data?.body?.message}`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          },
        }).showToast();
        const validateUser = await findSectorByLeader();
        const viewScreen = validateUser
          ? this.$router.push('/managementView')
          : this.$router.push('/individualView');
        // eslint-disable-next-line no-unused-expressions
        response.data.token == null ? this.$router.push('/') : viewScreen;
      } catch (error) {
        Toastify({
          text: `${error.response?.data?.statusCode}: ${error.response?.data?.body?.message}`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(to right, #ff0000, #ff0000)',
          },
        }).showToast();
      }
    },
  },
});
</script>
<style scoped>
.container-login {
  width: 50vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
}
.form-login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
}
.form-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.login-button {
  width: 50%;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  background-color: #fff;
  color: #3b18b0;
  cursor: pointer;
}
.register-button {
  width: 9rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  background-color: #fff;
  color: #3b18b0;
  cursor: pointer;
}
.link-to {
  text-decoration: underline;
  cursor: pointer;
}
.input-email {
  width: 15rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  background-color: #fff;
}
.input-password {
  width: 15rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  background-color: #fff;
}
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left-container {
  flex-direction: column;
  width: 50vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 60%;
  height: 60%;
}
</style>Recolher
