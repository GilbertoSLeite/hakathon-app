const routes = [
  { path: '/', component: () => import('pages/LoginPage.vue') },
  { path: '/individualView', component: () => import('src/pages/IndividualViewPage.vue') },
  { path: '/managementView', component: () => import('src/pages/ManagementViewPage.vue') },
  { path: '/simulationView', component: () => import('src/pages/SimulationViewPage.vue') },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
