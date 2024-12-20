<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-gradient-to-b from-purple-600 to-pink-500 text-white p-6 flex flex-col shadow-lg rounded-r-2xl">
      <h2 class="text-2xl font-bold mb-8 text-center">Dashboard</h2>
      <ul class="flex flex-col space-y-4">
        <li class="flex items-center space-x-2">
          <i class="fas fa-home h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Accueil</a>
        </li>
        <li class="flex items-center space-x-2">
          <i class="fas fa-cube h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Produits</a>
        </li>
        <li class="flex items-center space-x-2">
          <i class="fas fa-chart-bar h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Graphiques</a>
        </li>
        <li class="flex items-center space-x-2">
          <i class="fas fa-shopping-cart h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Commandes</a>
        </li>
        <li class="flex items-center space-x-2">
          <i class="fas fa-users h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Clients</a>
        </li>
        <li class="flex items-center space-x-2">
          <i class="fas fa-cogs h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Paramètres</a>
        </li>
        <li class="flex items-center space-x-2">
          <i class="fas fa-sign-out-alt h-5 w-5"></i>
          <a href="#" class="text-lg hover:text-gray-300 transition-colors duration-200">Déconnexion</a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-auto">
      <!-- Header -->
      <header class="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl p-6 mb-8 rounded-lg">
        <h1 class="text-3xl font-bold text-center">Supermarket Inventory Dashboard</h1>
      </header>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Graphiques -->
        <div class="col-span-2  bg-white  text-pink-900 shadow-xl rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-4">Graphiques des Produits</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Graphique des prix -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Prix des Produits</h3>
              <BarChart :chart-data="priceData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique des notes -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Notes des Produits</h3>
              <LineChart :chart-data="ratingData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique des catégories -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Répartition par Catégorie</h3>
              <PieChart :chart-data="categoryData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique des ventes -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Ventes par Produit</h3>
              <RadarChart :chart-data="salesData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique des ventes mensuelles -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Ventes Mensuelles</h3>
              <LineChart :chart-data="monthlySalesData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique des stocks -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Niveaux de Stock</h3>
              <BarChart :chart-data="stockData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique en Doughnut -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Répartition des Stocks (Doughnut)</h3>
              <DoughnutChart :chart-data="doughnutData" :chart-options="chartOptions" />
            </div>
            <!-- Graphique en Bubble -->
            <div class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg mb-2 font-medium">Relation entre Note, Ventes et Prix (Bubble)</h3>
              <BubbleChart :chart-data="bubbleData" :chart-options="chartOptions" />
            </div>
          </div>
        </div>

        <!-- Liste des Produits -->
        <div class="bg-white shadow-xl rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-4">Liste des Produits</h2>
          <table class="table-auto w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr class="bg-blue-100">
                <th class="border px-4 py-2 text-sm text-center">Nom</th>
                <th class="border px-4 py-2 text-sm text-center">Prix (€)</th>
                <th class="border px-4 py-2 text-sm text-center">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition duration-200">
                <td class="border px-4 py-2 text-center text-sm">{{ product.title }}</td>
                <td class="border px-4 py-2 text-center text-sm">{{ product.price }}</td>
                <td class="border px-4 py-2 text-center text-sm">{{ product.rating }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Chart as ChartJS, registerables } from "chart.js";
import { BarChart, LineChart, PieChart, RadarChart, DoughnutChart, BubbleChart } from "vue-chart-3"; // Import the new chart types
import { getProducts } from "../services/api"; // Ensure this function is defined in the API service


// Register necessary Chart.js components
ChartJS.register(...registerables);

export default defineComponent({
  name: "Dashboard",
  components: { BarChart, LineChart, PieChart, RadarChart, DoughnutChart, BubbleChart },
  setup() {
    const products = ref([]);
    const priceData = ref(null);
    const ratingData = ref(null);
    const categoryData = ref(null);
    const salesData = ref(null);
    const monthlySalesData = ref(null); 
    const stockData = ref(null); 
    const doughnutData = ref(null); // For the doughnut chart
    const bubbleData = ref(null); // For the bubble chart
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    onMounted(async () => {
      try {
        // Fetch products from API
        const data = await getProducts();
        products.value = data;

        // Price Chart
        priceData.value = {
          labels: data.map((product) => product.title),
          datasets: [
            {
              label: "Prix (€)",
              data: data.map((product) => product.price),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };

        // Rating Chart
        ratingData.value = {
          labels: data.map((product) => product.title),
          datasets: [
            {
              label: "Notes Moyennes",
              data: data.map((product) => product.rating),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        };

        // Category Chart
        const categories = [...new Set(data.map((product) => product.category))];
        const categoryDataValues = categories.map((category) => {
          return data.filter((product) => product.category === category).length;
        });

        categoryData.value = {
          labels: categories,
          datasets: [
            {
              data: categoryDataValues,
              backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F5FF33"],
            },
          ],
        };

        // Sales Chart
        salesData.value = {
          labels: data.map((product) => product.title),
          datasets: [
            {
              label: "Ventes",
              data: data.map((product) => product.sales),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        // Monthly Sales Chart (dummy data)
        monthlySalesData.value = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Ventes Mensuelles",
              data: [12, 15, 8, 10, 13, 17, 14, 12, 9, 11, 14, 19],
              fill: false,
              borderColor: "rgba(255, 159, 64, 1)",
              tension: 0.1,
            },
          ],
        };

        // Stock Data (dummy data)
        stockData.value = {
          labels: data.map((product) => product.title),
          datasets: [
            {
              label: "Stock",
              data: data.map((product) => product.stock),
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        };

        // Doughnut Chart (Stock Distribution)
        doughnutData.value = {
          labels: categories,
          datasets: [
            {
              data: categoryDataValues,
              backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F5FF33"],
            },
          ],
        };

        // Bubble Chart (Sales vs. Price vs. Rating)
        bubbleData.value = {
          datasets: data.map((product) => ({
            label: product.title,
            data: [{ x: product.price, y: product.rating, r: product.sales / 10 }],
            backgroundColor: "rgba(255, 159, 64, 0.5)",
          })),
        };
      } catch (error) {
        console.error("Error loading product data:", error);
      }
    });

    return {
      products,
      priceData,
      ratingData,
      categoryData,
      salesData,
      monthlySalesData,
      stockData,
      doughnutData,
      bubbleData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
/* Add any custom styling if needed */
</style>