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
      <q-page class="row no-wrap">
        <q-page class="flex flex-start">
          <q-expansion-item
            class="list"
            expand-separator
            default-opened
            header-class="bg-grey-6 text-white"
            icon="perm_identity"
            label="Nome do Colaborador"
          >
            <q-card>
              <q-card-section>
                <GlobalTableComponent />
                <SectorialTableComponent />
                <IndividualTableComponent />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <div class="container-result bg-grey-6">
            <span>Projecão do resultado</span>
            <div class="container-money">R$ 0,00</div>
          </div>
        </q-page>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import 'toastify-js/src/toastify.css';
import { defineComponent } from 'vue';
import GlobalTableComponent from '../components/GlobalTableComponent/GlobalTableComponent.vue';
import SectorialTableComponent from '../components/SectorialTableComponent/SectorialTableComponent.vue';
import IndividualTableComponent from '../components/IndividualTableComponent/IndividualTableComponent.vue';

export default defineComponent({
  name: 'SimulationViewPage',
  components: {
    GlobalTableComponent,
    SectorialTableComponent,
    IndividualTableComponent,
  },
  data() {
    return {
      left: false,
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
  },
});
</script>

<style scoped>
.list {
  width: 100%;
  padding: 1.5rem 5rem;
}

.container-result {
  height: 8vh;
  align-content: center;
  color: #fff;
  width: 90vw;
  margin-left: 4.8rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0.8rem 5rem;
}
.container-result > span {
  float: left;
  margin-left: -3.5rem;
}
.container-money {
  background-color: #04047a;
  border: #04047a 3px solid;
  float: right;
  text-align: center;
  width: 7vw;
  margin-right: -3.5rem;
}

.input-email {
  width: 15rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  background-color: #fff;
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
