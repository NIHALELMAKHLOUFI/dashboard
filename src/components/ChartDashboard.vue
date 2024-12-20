<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4 text-center">Dashboard - Produits</h1>

    <!-- Section des graphiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Graphique 1 : Prix des produits -->
      <div class="bg-white p-6 shadow-lg rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Prix des Produits</h2>
        <!-- Graphique avec une taille minimale de 300px -->
        <div class="chart-container" style="height: 300px;">
          <BarChart :chart-data="priceData" :chart-options="chartOptions" />
        </div>
      </div>

      <!-- Graphique 2 : Note des produits -->
      <div class="bg-white p-6 shadow-lg rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Notes Moyennes</h2>
        <!-- Graphique avec une taille minimale de 300px -->
        <div class="chart-container" style="height: 300px;">
          <LineChart :chart-data="ratingData" :chart-options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Chart as ChartJS, registerables } from "chart.js";
import { BarChart, LineChart } from "vue-chart-3";
import { getProducts } from "../services/api";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(...registerables);

export default defineComponent({
  name: "ChartDashboard",
  components: { BarChart, LineChart },
  setup() {
    const priceData = ref(null);
    const ratingData = ref(null);
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    onMounted(async () => {
      const products = await getProducts();

      // Graphique 1 : Prix des produits
      priceData.value = {
        labels: products.map((product) => product.title),
        datasets: [
          {
            label: "Prix (€)",
            data: products.map((product) => product.price),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      // Graphique 2 : Notes moyennes des produits
      ratingData.value = {
        labels: products.map((product) => product.title),
        datasets: [
          {
            label: "Note Moyenne",
            data: products.map((product) => product.rating),
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    });

    return { priceData, ratingData, chartOptions };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.chart-container {
  /* S'assure que les graphiques ont une hauteur définie */
  height: 300px;
}
</style>
