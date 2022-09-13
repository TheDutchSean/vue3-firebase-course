<template>
  <div id="app">
    <navigation :user="user" @logout="logOut"/>
    <router-view class="container" @logout="logOut" @addMeeting="addMeeting"/>
  </div>
</template>

<script>
// imports
import navigation from "@/components/Navigation"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, /* collection, */ serverTimestamp } from "firebase/firestore"; 
import db from "@/db.js"


// requires

export default {
  name: "App",
  components: {
    navigation
  },
  data(){
    return{
      user: null,
      error: {
        code: null,
        message: null
      }
    }
  },
  mounted() {

    // this.user = this.$users[0].name;
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            this.user = user;
            // ...
        } else {
            // User is signed out
            // this.$router.push("login");
        }
    });
    // console.log(this.$store.getters.getUserCredential("USERCREDENTIALS"))
  // end mounted lifecycle
  },
  methods:{
    logOut(){

            const auth = getAuth();
           
            // sign out loged in user
            signOut(auth).then(() => {
            // Sign-out successful.
                this.user = null;
                this.$router.push("home");
            }).catch((error) => {
            // An error happened.
                this.error.code = error;
            });
    // end logOut method
    },
    async addMeeting(payload){
      
console.log("run function")

      // https://firebase.google.com/docs/firestore/manage-data/add-data
      await setDoc(doc(db, "users", this.user.uid),
      {
        name: payload,
        createdDate: serverTimestamp()
      })
      
      
      
      // get db
      // this.$db.collection("users").doc(this.user.uid)
      // .collection("meetings")
      // .add({
      //   name: payload,
      //   createdDate: firestore.FieldValue.serverTimestamp()
      // })


    // end addMeeting method
    }
  // end methods
  }
}

</script>

<style lang="scss">

</style>
