const { Query } = require("./Query");
const { Subscription } = require("./Subscription");
const { auth } = require("./Mutation/auth");
const { post } = require("./Mutation/post");
const { AuthPayload } = require("./AuthPayload");

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post
  },
  Node: {
    __resolveType() {
      return null;
    }
  },
  Subscription,
  AuthPayload
};
