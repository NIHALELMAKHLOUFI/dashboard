<template>
    <div v-if="weather">
      <p>{{ weather.main }}</p> <!-- example of using the 'main' property -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      weather: {
        type: Object,
        default: null
      }
    }
  }
  </script>
  