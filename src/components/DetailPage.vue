<template>
  <!-- Page details d'un poste -->
  <div class="detail">
    <!-- Chargement -->
    <template v-if="loading > 0">
      <div>
        <div>Chargement...</div>
      </div>
    </template>

    <!-- Details -->
    <template v-else>
      <article>
        <a href="#0">
          <div>
            <div>
              <!-- Title -->
              <h1>{{ post.title }}</h1>
              <!-- Contenu -->
              <p>
                {{ post.text }}
              </p>
              <!-- Auteur -->
              <p>Par {{ post.author.name }}</p>
            </div>
          </div>
        </a>
        <!-- Si le poste est publié -->
        <template v-if="post.isPublished">
          <div>
            <!-- Bouton de suppression -->
            <a @click="deletePost">
              Delete
            </a>
          </div>
        </template>
        <!-- Si le poste n'est pas publié -->
        <template v-else>
          <div>
            <!-- Bouton de Publication -->
            <a @click="publishDraft">
              Publish
            </a>
          </div>
        </template>
      </article>
    </template>
  </div>
</template>
<script>
import gql from "graphql-tag";

// Query : GET Post
const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
      isPublished
      author {
        name
      }
    }
  }
`;

// Mutation : Publish Post
const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

// Mutation : Delete Post
const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default {
  // Data
  data: () => ({
    post: {},
    loading: 0
  }),

  // Apollo
  apollo: {
    // Post Query
    post: {
      query: POST_QUERY,
      loadingKey: "loading",
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },

  // Méthodes
  methods: {
    // Supprimer un Post
    deletePost() {
      // Appel à la mutation suppression de Post
      this.$apollo
        .mutate({
          mutation: DELETE_MUTATION,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(data => {
          console.log(data);
          this.$router.push({ path: "Feed" });
        })
        .catch(error => {
          console.error(error);
        });
    },

    // Publier un Post
    publishDraft() {
      const postId = this.$route.params.id;
      // Appel à la mutation publier un Post
      this.$apollo
        .mutate({
          mutation: PUBLISH_MUTATION,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(data => {
          console.log(data);
          this.$router.push({ path: "Drafts" });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style></style>
