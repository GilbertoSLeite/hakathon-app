<template>
  <div class="q-pa-md">
    <q-table
      class="bg-blue-7 text-white"
      :rows="baseRows"
      :columns="columns"
      row-key="name"
      binary-state-sort
      no-data-label="Nenhum registro encontrado."
      :loading="isLoading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body="props">
        <q-tr class="bg-light-blue-1 text-black" :props="props">
          <q-td key="nome" :props="props">
            {{ props.row.nome }}
            <q-popup-edit v-model="props.row.nome" v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="minimo" :props="props">
            {{ props.row.minimo }}
            <q-popup-edit
              v-model="props.row.minimo"
              title="Update minimo"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="alvo" :props="props">
            <div class="text-pre-wrap">{{ props.row.alvo }}</div>
            <q-popup-edit v-model="props.row.alvo" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="maximo" :props="props">
            {{ props.row.maximo }}
            <q-popup-edit
              v-model="props.row.maximo"
              title="Update maximo"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
      <!-- <q-inner-loading :showing="isLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading> -->
    </q-table>
  </div>
</template>
<script>
import { findIndividualGoals } from 'src/services/goals-service/crud-goals-service';
import { ref } from 'vue';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const columns = [
  {
    name: 'nome',
    required: true,
    label: 'Metas individuais',
    align: 'left',
    field: (row) => row.nome,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'minimo',
    align: 'center',
    label: 'Mínimo',
    field: 'minimo',
    sortable: true,
  },
  {
    name: 'alvo',
    label: 'Alvo',
    field: 'alvo',
    sortable: true,
    style: 'width: 10px',
  },
  {
    name: 'maximo',
    label: 'Máximo',
    field: 'maximo',
    sortable: true,
  },
];
const rows = [
  {
    nome: 'Nome Global',
    minimo: 'Minwqewq',
    alvo: 'Alvo',
    maximo: 'Max',
  },
  {
    nome: 'Nome',
    minimo: 'Minwqewq',
    alvo: 'Alvo',
    maximo: 'Max',
  },
  {
    nome: 'Nome',
    minimo: 'Minwqewq',
    alvo: 'Alvo',
    maximo: 'Max',
  },
];
export default {
  setup() {
    return {
      columns,
      rows: ref(rows),
      rowsBase: [],
      isLoading: ref(false),
      baseRows: ref([]),
    };
  },
  methods: {
    async listIndividualGoals() {
      /*
        aqui tem que descriptografar o token, passar o email que vem do token por parâmetro
      */
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);
      const goals = await findIndividualGoals(decoded.email);

      goals.data.body.forEach((meta) => this.baseRows.push({
        nome: meta.NomeMeta,
        minimo: meta.Minimo,
        alvo: meta.Alvo,
        maximo: meta.Maximo,
      }));

      this.isLoading = false;
    },
  },
  mounted() {
    this.listIndividualGoals();
  },
};
</script>
