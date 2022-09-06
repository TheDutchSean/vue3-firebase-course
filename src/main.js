import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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

// console.log(fas)

/* add icons to the library */
library.add(fas, far, fab);


/* import specific icons */
// import { faTrash, faLink, faListUl, faRandom, faUndo, faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons';

/* add specific icons to the library */
// library.add( faTrash, faLink, faListUl, faRandom, faUndo, faStar, faEnvelope );



//import firebase DB
import db from "@/db.js"

//import fireBase scripts
import FireBase from "@/scripts/firebase";

// create app
const app = createApp(App);
let appMounted = false;


function mountApp(){

    // app use 
    app.use(store).use(router);

    // app components
    app.component('font-awesome-icon', FontAwesomeIcon);

    // mount app
    app.mount("#app");

    appMounted = true;
}


// this function get data from firebase and makes a global var
async function setFireBaseGlobal(collection){
    
    // declare global
    const globalKey = `$${collection}`;
    app.config.globalProperties[globalKey] = [];

    // get fireBased data
    const response = await FireBase.getData(db, collection)

    // fill global var
    for(let index in response.docs){
        app.config.globalProperties[globalKey][index] = response.docs[index].data();
    }

    //mount app
    if(appMounted == false){
        mountApp()
    }
 
    return;
}

// app globals and mount
setFireBaseGlobal("users");

