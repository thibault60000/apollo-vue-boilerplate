const jwt = require("jsonwebtoken");

// Récupère l'Identifiant du User
function getUserId(ctx) {
  // Récupère le token dans la requête (headers)
  const Authorization = ctx.request.get("Authorization");
  // Si on a un token, decode le JWT pour avoir l'ID du User
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new AuthError();
}

// Erreur 'Non autorisé'
class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

module.exports = {
  getUserId,
  AuthError
};
