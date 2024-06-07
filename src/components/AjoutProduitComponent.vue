<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          required
          v-model="produits.nom"
          name="nom"
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
      <button @click="saveProduit" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduit">Add</button>
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
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    saveProduit() {
      if (this.validateForm()) {
        var data = {
          nom: this.produits.nom,
          description: this.produits.description,
          prix: this.produits.prix,
        }

        ProduitService.postProduit(data)
          .then((response) => {
            this.produits.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            this.toast.success("Produit ajouté avec succès !");
          })
          .catch((e) => {
            console.log(e);
          });

      } else{
        this.toast.error("Veuillez remplir tous les champs !");
      }
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
    newProduit() {
      this.submitted = false;
      this.produits = {
        nom: "",
        description: "",
        prix: "",
      };
    },
  },
};
</script>

<style scoped>
.submit-form {
  max-width: 600px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.text-danger {
  color: red;
}
</style>
