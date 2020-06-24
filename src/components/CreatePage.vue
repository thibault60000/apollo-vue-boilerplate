<template>
  <!-- Page de création de Post -->
  <div class="create">
    <div>
      <!-- Formulaire de création -->
      <form v-on:submit.prevent="create">
        <!-- Titre de Page-->

        <h1>Créer un Draft</h1>
        <!-- Titre du Post -->
        <input
          auto-focus
          v-model="title"
          placeholder="Titre"
          type="text"
          value="{title}"
        />
        <!-- Description du site -->
        <textarea cols="50" v-model="text" placeholder="Contenu" rows="8" />
        <!-- Bouton créer -->
        <input v-bind:class="classObject" type="submit" value="Créer" />{{
          " "
        }}
        <!-- Retour -->
        <a>
          Retour
        </a>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

// Mutation : Create Draft
const CREATE_POST = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`;

// Query : Get Feed
const FEED_QUERY = gql`
  query feed {
    feed {
      id
      text
      title
      isPublished
    }
  }
`;

export default {
  // Data
  data: () => ({
    title: "",
    text: ""
  }),

  // Méthodes
  methods: {
    // Méthode : Création d'un Post
    create() {
      const title = this.title;
      const text = this.text;

      // Clear les variables
      this.title = "";
      this.text = "";

      // Mutation : Créer un Post en Draft
      this.$apollo
        .mutate({
          mutation: CREATE_POST,
          variables: {
            title,
            text
          },
          /* Mettre à jour le cache avec le résultat et le vrai retour de la mutation grâce à UPDATE */
          update: (store, { data: { createDraft } }) => {
            // Lire les données du cache suite à la requête.
            const data = store.readQuery({ query: FEED_QUERY });
            // Ajouter le Post avec le résultat espéré
            data.feed.push(createDraft);
            // Ecrire les nouvelles données dans le cache
            store.writeQuery({ query: FEED_QUERY, data });
          }
        })
        .then(data => {
          // Rediriger vers l'écran de draft
          this.$router.push({ path: "Drafts" });
        })
        .catch(error => {
          alert(`Erreur : ${error}`);
          console.error(error);
        });
    }
  },

  computed: {
    canPost: function() {
      return {
        disabled: !this.text && !this.title
      };
    },
    classObject: function() {
      return {
        dim: this.text && this.title
      };
    }
  }
};
</script>

<style></style>
