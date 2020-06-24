const { getUserId } = require("../utils");

const Query = {
  // Retourne les articles publiés
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info);
  },

  // Retourne les articles en brouillon
  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx);
    const where = {
      isPublished: false,
      author: {
        id
      }
    };
    return ctx.db.query.posts({ where }, info);
  },

  // Créer un article
  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info);
  },

  // Retourne le User connecté
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  }
};

module.exports = { Query };
