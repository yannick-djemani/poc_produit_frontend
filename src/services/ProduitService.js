import apiClient from "../http-common";

export default {
  getProduits() {
    return apiClient.get('/Produit');
  },

  getProduit(id) {
    return apiClient.get(`/Produit/${id}`);
  },

  postProduit(produit) {
    return apiClient.post('/Produit', produit);
  },

  putProduit(id, produit) {
    return apiClient.put(`/Produit/${id}`, produit);
  },

  deleteProduit(id) {
    return apiClient.delete(`/Produit/${id}`);
  }
};