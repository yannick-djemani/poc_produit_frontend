
<template>
    <div>
        <h1>Liste des produits</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="produit in produits" :key="produit.id">
                    <!-- le champ nom et prix est requis afficher un message  -->
                    <td>{{ produit.nom }}</td>
                    <td>{{ produit.description }}</td>
                    <td>{{ produit.prix }}</td>
                    
                    <td>
                        <router-link :to="{ name: 'produit-details', params: { id: produit.id } }" class="btn btn-primary">Details/Modifier</router-link><span></span>   <span></span> 
                        <button @click="supprimerProduit(produit.id)" class="btn btn-danger">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import ProduitService from "../services/ProduitService";
import { useToast } from "vue-toastification";
export default {
    
    data() {
        return {
            produits: []
        };
    },
    setup() {
        const toast = useToast();
        return { toast };
    },
    created() {
        this.retrieveProduits();
    },
    methods: {
        retrieveProduits() {
            ProduitService.getProduits()
                .then(response => {
                    this.produits = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        supprimerProduit(id) {
            ProduitService.deleteProduit(id)
                .then(response => {
                    console.log(response.data);
                    this.retrieveProduits();
                    this.toast.success("Le produit a été supprimé avec succès !");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
};

</script>

