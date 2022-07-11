<template>
  <q-layout view="lHh LpR lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
        <q-toolbar-title>IBlue Consulting</q-toolbar-title>
        <q-avatar>
          <img src="../assets/logo.svg" alt="logo branca da iblue" />
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="
        background-image: url(https://www.iblueconsulting.com.br/wp-content/uploads/2021/05/imagem1.png) !important;
      "
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px); padding: 10px">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-toolbar-title>Nome Da Funcionario</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height: 100%">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/managementView"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="supervisor_account" />
                </q-item-section>
                <q-item-section> Visão da Gestão </q-item-section>
              </q-item>
              <q-item
                active-class="tab-active"
                to="/simulationView"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="calculate" />
                </q-item-section>
                <q-item-section> Simulação </q-item-section>
              </q-item>
             <q-item
                active-class="tab-active"
                v-on:click="logout()"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section> Logout </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page class="flex flex-start">
        <div class="table-container">
          <div class="title-container">
            <h2>Visão Gestão</h2>
          </div>
          <GlobalTableComponent />
          <SectorialTableComponent />
        </div>
        <div class="button">
          <div class="register-goals-container">
            <q-btn
              class="register-goals-button"
              label="Cadastrar Metas Setoriais"
              @click="showDialog = !showDialog"
              icon="play_arrow"
            />
          </div>
        </div>
        <q-dialog
          class="dialog-goal"
          v-model="showDialog"
          title="Metas"
          @ok="displayData"
        >
          <q-card class="dialog-goal">
            <q-card-section>
              <div class="text-h6">Metas</div>
            </q-card-section>
            <form class="goal-form" v-on:submit.prevent="registerGoal">
              <div class="goal-input">
                <q-input
                  filled
                  v-model="form.goalName"
                  type="text"
                  label="Nome da Meta"
                />
              </div>
              <div class="goal-input">
                <div class="goal-input">
                  <q-input
                    filled
                    v-model="form.min"
                    type="text"
                    label="Mínimo"
                  />
                </div>
                <div class="goal-input">
                  <q-input
                    filled
                    v-model="form.goal"
                    type="text"
                    label="Alvo"
                  />
                </div>
                <div class="goal-input">
                  <q-input
                    filled
                    v-model="form.max"
                    type="text"
                    label="Máximo"
                  />
                </div>
              </div>
              <q-card-actions class="button-actions">
                <q-btn flat label="Ok" color="primary" type="submit" v-close-popup />
                <q-btn flat label="Fechar" color="negative" v-close-popup />
              </q-card-actions>
            </form>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import Toastify from 'toastify-js';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { createSectorialGoal } from 'src/services/goals-service/crud-goals-service';
import GlobalTableComponent from '../components/GlobalTableComponent/GlobalTableComponent.vue';
import SectorialTableComponent from '../components/SectorialTableComponent/SectorialTableComponent.vue';

export default defineComponent({
  name: 'IndividualViewPage',
  components: {
    GlobalTableComponent,
    SectorialTableComponent,
  },
  data() {
    return {
      left: false,
      showDialog: false,
      form: {
        goalName: null,
        min: null,
        goal: null,
        max: null,
      },
    };
  },
  setup() {
    return {
      model: ref(null),
      options: ['Metas Globais', 'Metas Setoriais'],
    };
  },
  methods: {
    logoutNotify() {
      this.$q.notify({
        message: 'Logged out',
      });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    async registerGoal() {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const data = {
          NomeMeta: this.form.goalName,
          Min: this.form.min,
          Alvo: this.form.goal,
          Maximo: this.form.max,
          Email: decoded.email,
          SetorId: decoded.setorId.toString(),
        };
        const response = await createSectorialGoal(data);
        Toastify({
          text: `${response.data.statusCode}: 'Meta cadastrada com sucesso'`,
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
        window.location.reload();
      } catch (error) {
        Toastify({
          text: `${error.response.data.statusCode}: 'Erro ao cadastrar meta'`,
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
.list {
  width: 100%;
  padding: 1.5rem 5rem;
}
.table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 5rem;
}
.title-container {
  position: sticky;
  text-align: center;
}
.table {
  width: 100%;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.button-actions {
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-goals-container {
  display: flex;
  padding: 2rem 0;
  width: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.dialog-goal {
  width: 40%;
}
.register-goals-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  width: 80%;
  background-color: #04047a;
  border-radius: 10px;
  font-size: 18px;
}
.goal-form {
  width: 100%;
}
.goal-input {
  width: 100%;
}
.row-q-mb-md {
  width: 100%;
  display: flex;
  text-align: center;
  align-content: center;
}
.dialog-goals {
  width: 100%;
}
.goal-select {
  width: 100%;
  padding: 0 1rem;
}
.q-drawer {
  background-size: cover !important;
}
.drawer_normal {
  background-color: rgba(0, 0, 0, 0.75);
}
.navigation-item {
  border-radius: 5px;
}
.tab-active {
  background-color: rgb(37, 58, 104);
}
body {
  background: #ffffff !important;
}
</style>
