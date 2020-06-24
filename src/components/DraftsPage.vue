<template>
  <!-- Posts en DRAFT -->
  <div class="drafts">
    <!-- Chargement -->
    <template v-if="loading > 0">
      <div>
        <div>Chargement...</div>
      </div>
    </template>

    <template v-else>
      <!-- Titre -->
      <div>
        <h1>Drafts</h1>
      </div>

      <!-- Liste des Posts en draft -->
      <ul>
        <li v-for="post in drafts" :key="post.id">
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
const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
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
    drafts: {},
    loading: 0
  }),

  // Apollo
  apollo: {
    // Query Draft
    drafts: {
      query: DRAFTS_QUERY,
      loadingKey: "loading"
    }
  },

  // Composants
  components: {
    post: Post
  }
};
</script>
