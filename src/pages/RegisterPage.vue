<template>
  <q-page class="flex flex-center">
    <div class="container-login bg-primary text-white">
      <h4>Página de Cadastro</h4>

      <div class="form-login">
        <input placeholder="E-mail" type="email" class="input-email" />
        <input placeholder="Senha" type="password" class="input-password" />
        <div class="form-buttons">
          <button class="register-button">Cadastrar-se</button>
        </div>
        <a><span class="link-to">Esqueceu a senha?</span></a>
        <a><span class="link-to">Já tem uma conta, entrar agora!</span></a>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.login-button {
  width: 6rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  background-color: #fff;
  color: #3b18b0;
  cursor: pointer;
}
.register-button {
  width: 7rem;
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

</style>
