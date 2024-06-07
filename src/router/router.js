import { createRouter, createWebHistory } from 'vue-router'
const routes= [
    {
        path: '/',
        alias: '/produits',
        name: 'produits',
        component: () => import('../components/ProduitListesComponent.vue')
      
    },
    {
        path: '/produits/:id',
        name: 'produit-details',
        component: () => import('../components/ProduitEditComponent.vue')
    },
    {
        path: '/add',
        name: 'add',
        component: () => import('../components/AjoutProduitComponent.vue')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;