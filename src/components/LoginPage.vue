<template>
  <div class="login">
    <main>
      <!-- Formulaire connexion -->
      <form v-on:submit.prevent="login">
        <!-- Vous n'avez pas de compte ? -->
        <fieldset id="sign_up">
          <legend>
            Vous n'avez pas de compte ?
            <!-- S'inscrire -->
            <router-link v-bind:to="'/login'" exact>S'inscrire</router-link>
          </legend>
          <!-- Email -->
          <div>
            <label for="email-address">Email</label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autocomplete="email"
              v-model="email"
            />
          </div>
          <!-- Mot de passe -->
          <div>
            <label for="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              autocomplete="password"
              id="password"
              v-model="password"
            />
          </div>
        </fieldset>
        <!-- Mot de passe oublié -->
        <div>
          <a href="#0">Vous avez oublié votre mot de passe ?</a>
        </div>
        <!-- Se connecter -->
        <div>
          <input
            v-bind:class="classObject"
            type="submit"
            value="Se connecter"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { USER_ID, AUTH_TOKEN } from "../constants";

// Mutation : Se connecter
const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export default {
  // Data
  data: () => ({
    email: "",
    password: ""
  }),

  // Méthodes
  methods: {
    // Méthode : Se connecter
    login() {
      const email = this.email;
      const password = this.password;

      // Mutation : Se connecter
      this.$apollo
        .mutate({
          mutation: LOGIN_USER,
          variables: {
            email,
            password
          }
        })
        .then(response => {
          // Result
          console.log(response);
          const user = response.data.login.user.user;
          const token = response.data.login.token;
          // Stocker les données de l'utilisateur
          this.saveUserData(user, token);
          // Redirection vers la page d'accueil
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          // Erreur
          alert(`Erreur : ${error}`);
          console.error(error);
        });
    },

    // Méthode : Stocker les données de l'utilisateur
    saveUserData(user, token) {
      localStorage.setItem(`${USER_ID}`, user);
      localStorage.setItem(`${AUTH_TOKEN}`, token);
      this.$root.$data.token = localStorage.getItem(`${USER_ID}`);
    }
  },

  computed: {
    canLogin: function() {
      return {
        disabled: !this.email && !this.password
      };
    },
    classObject: function() {
      return {
        dim: this.email && this.password
      };
    }
  }
};
</script>

<style>
.ba {
  border-style: solid;
  border-width: 1px;
}

.b--black {
  border-color: #000;
}

.b--transparent {
  border-color: transparent;
}

.db {
  display: block;
}

.dib {
  display: inline-block;
}

.b {
  font-weight: bold;
}

.fw6 {
  font-weight: 600;
}

.input-reset {
  -webkit-appearance: none;
  -moz-appearance: none;
}

.input-reset::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.lh-copy {
  line-height: 1.5;
}

.link {
  text-decoration: none;
  transition: color 0.15s ease-in;
}

.link:link,
.link:visited {
  transition: color 0.15s ease-in;
}

.link:hover {
  transition: color 0.15s ease-in;
}

.link:active {
  transition: color 0.15s ease-in;
}

.link:focus {
  transition: color 0.15s ease-in;
  outline: 1px dotted currentColor;
}

.w-100 {
  width: 100%;
}

.black-80 {
  color: rgba(0, 0, 0, 0.8);
}

.black {
  color: #000;
}

.bg-transparent {
  background-color: transparent;
}

.hover-white:hover {
  color: #fff;
}

.hover-white:focus {
  color: #fff;
}

.hover-bg-black:hover {
  background-color: #000;
}

.hover-bg-black:focus {
  background-color: #000;
}

.pa0 {
  padding: 0;
}

.pa2 {
  padding: 0.5rem;
}

.pa4 {
  padding: 2rem;
}

.pv2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.ph0 {
  padding-left: 0;
  padding-right: 0;
}

.ph3 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.ma0 {
  margin: 0;
}

.mt3 {
  margin-top: 1rem;
}

.mv3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.mh0 {
  margin-left: 0;
  margin-right: 0;
}

.f4 {
  font-size: 1.25rem;
}

.f6 {
  font-size: 0.875rem;
}

.measure {
  max-width: 30em;
}

.center {
  margin-right: auto;
  margin-left: auto;
}

.dim {
  opacity: 1;
  transition: opacity 0.15s ease-in;
}

.dim:hover,
.dim:focus {
  opacity: 0.5;
  transition: opacity 0.15s ease-in;
}

.dim:active {
  opacity: 0.8;
  transition: opacity 0.15s ease-out;
}

.grow {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}

.grow:hover,
.grow:focus {
  transform: scale(1.05);
}

.grow:active {
  transform: scale(0.9);
}

.pointer:hover {
  cursor: pointer;
}
</style>
