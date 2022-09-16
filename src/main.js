import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.css";
import "@/styles/bootstrap.scss";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(fas, far, fab);

/* import specific icons */
// import { faTrash, faLink, faListUl, faRandom, faUndo, faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons';

/* add specific icons to the library */
// library.add( faTrash, faLink, faListUl, faRandom, faUndo, faStar, faEnvelope );


// create app
const app = createApp(App);
// let appMounted = false;

// app use 
app.use(router);

// app components
app.component('font-awesome-icon', FontAwesomeIcon);

// mount app
app.mount("#app");


