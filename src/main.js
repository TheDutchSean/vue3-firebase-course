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
// import db from "@/db.js"

//import fireBase scripts
// import FireBase from "@/scripts/firebase";


// import functions scripts
import functions from "@/scripts/functions"


// create app
const app = createApp(App);
// let appMounted = false;

// app use 
app.use(store).use(router);

// app components
app.component('font-awesome-icon', FontAwesomeIcon);

// app scripts
app.config.globalProperties.$functions = functions;

// mount app
app.mount("#app");







// function mountApp(){

//     // app use 
//     app.use(store).use(router);

//     // app components
//     app.component('font-awesome-icon', FontAwesomeIcon);

//     // app scripts
//     app.config.globalProperties.$functions = functions;

//     // mount app
//     app.mount("#app");

//     appMounted = true;

//     return;
// }


// // this function get data from firebase and makes a global var
// async function setFireBaseGlobal(collection, createGlobal = false, globalName = "db"){
    


//     // get fireBased data
//     const response = await FireBase.getData(db, collection);

//     // create global var
//     if(createGlobal){

//         // declare global
//         const globalKey = `$${globalName}`;

//         // check response data type
//         if(typeof(response) === "object"){
//             app.config.globalProperties[globalKey] = response;
//         }
//         else{
//             app.config.globalProperties[globalKey] = [];
//             console.warn(response);
//         }    
//     }    

//     //mount app
//     if(appMounted == false){
//         mountApp()
//     }
 
//     return;
// }

// // app globals and mount
// setFireBaseGlobal("users", true);

