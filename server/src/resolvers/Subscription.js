const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.post({}, info);
    }
  }
};

/* Attention : Il s'agit ici du même "Subscription" qu'au dessus,
 * mais qui ne se déclenche que pour les articles
 * qui ont été publiés.
 * Cette fonctionnalité n'est pas encore disponible à cause d'un soucis lié à Prisma
 * */

/* const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.post(
        {
          where: {
            node: {
              isPublished: true
            }
          }
        },
        info
      );
    }
  }
};
 */
module.exports = { Subscription };
