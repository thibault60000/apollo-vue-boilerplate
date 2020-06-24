const { getUserId } = require("../../utils");

const post = {
  // Créer un article en brouillon
  async createDraft(parent, { title, text }, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
          isPublished: false,
          author: {
            connect: { id: userId }
          }
        }
      },
      info
    );
  },

  // Publier un article brouillon vers un article publié
  async publish(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId }
    });
    if (!postExists) {
      throw new Error(`Vous n'êtes pas l'auteur de l'article`);
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { isPublished: true }
      },
      info
    );
  },

  // Supprimer un article
  async deletePost(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId }
    });
    if (!postExists) {
      throw new Error(`Vous n'êtes pas l'auteur de l'article`);
    }

    return ctx.db.mutation.deletePost({ where: { id } });
  }
};

module.exports = { post };
