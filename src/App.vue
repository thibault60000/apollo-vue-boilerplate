<template>
  <div id="app">
    <nav>
      <!-- Liens principaux -->
      <router-link v-bind:to="'/'" exact title="Feed">Blog</router-link>
      <router-link v-bind:to="'/'" exact title="Feed">Feed</router-link>
      <router-link v-bind:to="'/drafts'" exact title="Drafts"
        >Drafts</router-link
      >

      <!-- Actions lorsqu'on est connecté -->
      <template v-if="isLoggedin">
        <!-- Se déconnecter -->
        <a @click="logout" exact title="Drafts">Se déconnecter</a>
        <!-- Créer un Post en DRAFT -->
        <router-link v-bind:to="'/create'" exact title="Drafts">
          + Créer un Draft</router-link
        >
      </template>

      <!-- Action lorsqu'on est pas connecté -->
      <template v-else>
        <!-- S'inscrire -->
        <router-link v-bind:to="'/signup'" exact title="Drafts"
          >S'inscrire</router-link
        >
        <!-- Se connecter -->
        <router-link v-bind:to="'/login'" exact title="Drafts"
          >Se connecter</router-link
        >
      </template>
    </nav>
  </div>
</template>

<script>
import { USER_ID, AUTH_TOKEN } from "./constants";

export default {
  // Nom du composant
  name: "app",

  // Data
  data: () => ({
    // Est ce que l'on est connecté
    isLoggedin: localStorage.getItem(`${AUTH_TOKEN}`) ? true : false
  }),

  computed: {
    userId() {
      return this.$root.$data.userId;
    },
    token() {
      return this.$root.$data.token;
    }
  },
  methods: {
    // Méthode de clear des données utilisateur et déconnexion
    logout() {
      localStorage.removeItem(`${USER_ID}`);
      localStorage.removeItem(`${AUTH_TOKEN}`);
      this.$root.$data.userId = localStorage.getItem(`${USER_ID}`);
      this.$root.$data.token = localStorage.getItem(`${AUTH_TOKEN}`);
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
/* Reset CSS */
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", "Arial", sans-serif;
  background: rgba(0, 0, 0, 0.05);
}

body,
input,
button {
  font-family: Helvetica, sans-serif;
  font-size: 16pt;
}

ul li {
  list-style: none;
}

.app {
  text-align: center;
  display: flex;
  justify-content: center;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
