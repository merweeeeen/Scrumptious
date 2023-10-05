<template>
    <div class="home">
      <h1>Create a role listing (as a HR)</h1>
      <!-- <p>This is the home page of my Vue.js application.</p> -->
      <p style="text-align: left;">Key in your secret below:</p>
      <v-text-field v-model="message" label="Secret" placeholder="edit me"></v-text-field>
      <p>Message is: {{ message }}</p> 
      <v-btn @click="greet">Greet</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
        return {
        message: "",
        name: "HR"
        }
    },
    methods: {
    greet() {
        // `this` inside methods points to the current active instance
        alert(`Hello ${this.name}! ${this.message}`)
        // `event` is the native DOM event
    }
  }
}
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .home {
    text-align: center;
    padding: 15px;
    max-width: max-content;
    max-height: max-content;
    margin: 0 auto;
    border: 15px solid #f4d5ff;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.2em;
  }
  </style>