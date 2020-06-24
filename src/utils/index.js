import decode from "jwt-decode";

// Vérifier la présence du TOKEN
export function checkAuth() {
  if (localStorage.getItem("token") !== null) return true;
  else return false;
}

// Récupère la date d'expiration du Token
export function getTokenExpirationDate(token) {
  const decoded = decode(token);
  // Si le token est expiré
  if (!decoded.exp) return null;
  // Récupère la date (0 est la clé permettant d'avoir la date en EPOCH)
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

// Retourne vrai si le token est expiré
export function isTokenExpired(token) {
  // Récupère la date d'expiration
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  // Si le token est expiré retourne faux
  if (date === null) return false;
  // Sinon retourne vrai si le token n'est pas expiré
  return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
}
