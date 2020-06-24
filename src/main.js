// Vue
import Vue from "vue";
import App from "./App.vue";

// Apollo
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { getMainDefinition } from "apollo-utilities";

// Vue Apollo
import VueApollo from "vue-apollo";

// Router
import router from "./router";

// Constantes
import { USER_ID, AUTH_TOKEN } from "./constants";

// Vue production tip config
Vue.config.productionTip = false;

// Déclaration de l'URL du Backend
const httpLink = new HttpLink({ uri: `http://localhost:4000/` });

// Déclaration du MiddleWare qui pousse le Token du User dans chaque requête
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(`${AUTH_TOKEN}`);
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  return forward(operation);
});

// HTTPLink de l'authentification
const httpLinkAuth = middlewareLink.concat(httpLink);
console.group("--- MIDDLEWARES ---");
console.log("Middleware", middlewareLink);
console.log("HttpLink", httpLink);
console.log("Concaténation des 2");
console.groupEnd();

// WebSocketLink pour les Subscriptions et WebSockets
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(`${AUTH_TOKEN}`)}`
    }
  }
});

// Choix du Link selon l'opération faite
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkAuth
);

// Création du Client APollo
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Installation du Plugin vue-apollo
Vue.use(VueApollo);

// Initialize le Provider Apollo avec le Client Apollo
const apolloProvider = new VueApollo({
  defaultClient: client
});

// Récupération du token du User après une authentification
let token = localStorage.getItem(`${AUTH_TOKEN}`);
console.log("Token", token);

// Parcourir les routes avant chaque changement de route
router.beforeEach((to, from, next) => {
  router.options.routes.forEach(route => {
    // Est ce que la route actuelle nécessite une sécurité
    if (to.matched[0].path === route.path && route.secure) {
      // Vérifie si l'utilisateur n'est pas connecté
      if (!token || token === "" || token === null) {
        // Redirige sur la page login
        return next("/login");
      }
    }
    // Est ce que la route actuelle ne nécessite aucune sécurité
    if (to.matched[0].path === route.path && route.unAuth) {
      // Vérifie si l'utilisateur n'est pas connecté
      if (token) {
        // Redirige vers l'accueil
        return next("/");
      }
    }
  });
  // Etre redirigé normalement
  next();
});

// Déclare l'instance de Vue.JS avec
new Vue({
  el: "#app",
  provide: apolloProvider.provide(),
  router,
  data: {
    token
  },
  render: h => h(App)
}).$mount("#app");
