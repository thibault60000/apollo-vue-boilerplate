<template>
  <!-- Contenu d'un POST avec le lien vers son détail -->
  <router-link :to="{ name: 'Detail', params: { id: post.id } }">
    <article>
      <a href="#0">
        <div>
          <!-- Titre du post -->
          <h1>{{ post.title }}</h1>
          <!-- Contenu du post -->
          <p>
            {{ post.text }}
          </p>
          <!-- Auteur du post -->
          <p>Par {{ post.author.name }}</p>
        </div>
      </a>
    </article>
  </router-link>
</template>

<script>
export default {
  props: {
    // Post (provient du parent)
    post: {
      type: Object,
      default: function() {
        return { title: "", text: "" };
      }
    }
  }
};
</script>
<style></style>
