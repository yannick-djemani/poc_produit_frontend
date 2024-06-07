<template>
    <div class="product-edit-container">
      <div class="product-details">
        <h3>Détails du Produit</h3>
        <p><strong>Nom:</strong> {{ produits.nom }}</p>
        <p><strong>Description:</strong> {{ produits.description }}</p>
        <p><strong>Prix:</strong> {{ produits.prix }} €</p>
      </div>
      
      <div class="product-form">
        <h3>Modifier Produit</h3>
        <div v-if="!submitted">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input
              type="text"
              class="form-control"
              id="nom"
              required
              v-model="produits.nom"
              name="title"
            />
            <span v-if="errors.nom" class="text-danger">{{ errors.nom }}</span>
          </div>
    
          <div class="form-group">
            <label for="description">Description</label>
            <input
              class="form-control"
              id="description"
              required
              v-model="produits.description"
              name="description"
            />
          </div>
          <div class="form-group">
            <label for="prix">Prix</label>
            <input
              class="form-control"
              type="number"
              id="prix"
              required
              v-model="produits.prix"
              name="prix"
            />
            <span v-if="errors.prix" class="text-danger">{{ errors.prix }}</span>
          </div>
          <button @click="updateProduit" class="btn btn-success">Modifier</button>
          <!-- Annuler -->
          <router-link :to="{ name: 'produits' }" class="btn btn-danger">Annuler</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useToast } from "vue-toastification";
  import ProduitService from "../services/ProduitService";
 
  export default {
    data() {
      return {
        produits: {
          nom: "",
          description: "",
          prix: "",
        },
        submitted: false,
        errors: {}
      };
    },
    methods: {
      loadProduit() {
        const id = this.$route.params.id;
        ProduitService.getProduit(id)
          .then(response => {
            this.produits = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      validateForm() {
        this.errors = {};
        if (!this.produits.nom) {
          this.errors.nom = "Le nom est requis.";
        }
        if (!this.produits.prix) {
          this.errors.prix = "Le prix est requis.";
        }
        return Object.keys(this.errors).length === 0;
     },
     updateProduit() {
      if (this.validateForm()) {
        const toast = useToast();
        ProduitService.putProduit(this.produits.id, this.produits)
          .then(response => {
            console.log(response.data);
            toast.success("Le produit a été modifié avec succès !");
            this.$router.push('/produits');
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        const toast = useToast();
        toast.error("Veuillez remplir tous les champs !");
  }
},
    },
    mounted() {
      this.loadProduit();
    }
  };
  </script>
  
  <style scoped>
  .product-edit-container {
    display: flex;
    justify-content: space-between;
  }
  
  .product-details, .product-form {
    width: 45%;
  }
  </style>
  