<template>
  <main>
    <!-- Formulaire inscription -->
    <form v-on:submit.prevent="signup">
      <!-- Lien : Déjà un compte -->
      <fieldset id="sign_up">
        <legend>
          Déja un compte ?
          <router-link v-bind:to="'/login'" exact>Se connecter</router-link>
        </legend>
        <!-- Name -->
        <div>
          <label for="email-address">Nom</label>
          <input
            type="Name"
            name="Name"
            id="name"
            v-model="name"
            autocomplete="name"
          />
        </div>
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
          <label for="password">Mot de passe </label>
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
        <a href="#0">Mot de passe oublié ? </a>
      </div>
      <div>
        <input v-bind:class="classObject" type="submit" value="S'inscrire" />
      </div>
    </form>
  </main>
</template>

<script>
import gql from "graphql-tag";
import { USER_ID, AUTH_TOKEN } from "../constants";

// Mutation : S'inscrire
const SIGNUP_USER = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
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
  // Created
  created() {
    console.log(USER_ID, AUTH_TOKEN);
  },

  // Data
  data: () => ({
    email: "",
    password: "",
    name: ""
  }),

  methods: {
    // Méthode : s'inscrire
    signup() {
      const email = this.email;
      const password = this.password;
      const name = this.name;

      // Mutation : S'inscrire
      this.$apollo
        .mutate({
          mutation: SIGNUP_USER,
          variables: {
            email,
            password,
            name
          }
        })
        .then(response => {
          // Response
          console.log(response);
          const user = response.data.signup.user;
          const token = response.data.signup.token;
          // Stocker les données de l'utilisateur
          this.saveUserData(user, token);
          // Redirection vers l'écran Blog
          this.$router.push({ path: "Blog" });
        })
        .catch(error => {
          // Error
          alert(`Erreur: ${error}`);
          console.error(error);
        });
    },

    // Méthode : Stocker les données de l'utilisateur
    saveUserData(user, token) {
      localStorage.setItem(`${USER_ID}`, user);
      localStorage.setItem(`${AUTH_TOKEN}`, token);
      this.$root.$data.token = localStorage.getItem(`${AUTH_TOKEN}`);
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

<style></style>
