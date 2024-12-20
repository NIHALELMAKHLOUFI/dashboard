import axios from "axios";

const API_URL = "https://dummyjson.com/products";

// Fonction pour récupérer les produits
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products; // Retourne la liste des produits
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};
