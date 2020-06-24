<template>
  <!-- Fil d'acualité-->
  <div class="feed">
    <!-- Chargement en cours -->
    <template v-if="loading > 0">
      <div>
        <div>Chargement...</div>
      </div>
    </template>

    <!-- Afficher le fil d'acualité -->
    <template v-else>
      <h1>Acualités</h1>
      <!-- Afficher les posts -->
      <ul>
        <li v-for="post in feed" :key="post.id">
          <post :post="post" class="post" />
        </li>
      </ul>
    </template>
  </div>
</template>

<style></style>

<script>
import gql from "graphql-tag";
import Post from "./Post.vue";

// Query : Feed
const FEED_QUERY = gql`
  query feed {
    feed {
      id
      text
      title
      isPublished
      author {
        name
      }
    }
  }
`;

export default {
  // Data
  data: () => ({
    feed: {},
    loading: 0
  }),

  // Apollo
  apollo: {
    // Query Feed
    feed: {
      query: FEED_QUERY,
      loadingKey: "loading"
    }
  },

  // Composants
  components: {
    post: Post
  }
};
</script>
