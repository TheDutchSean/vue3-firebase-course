<template>
  <div id="app">
    <navigation :user="user" @logout="logOut"/>
    <router-view class="container" @logout="logOut" @addMeeting="addMeeting"/>
  </div>
  <!-- <button
    @mouseup="getDoc()"
  >get doc</button> -->
</template>

<script>
// imports
import navigation from "@/components/Navigation"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDocs, collection, serverTimestamp } from "firebase/firestore"; 
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

      // user id
      const UID = this.user.uid;
      
      try{
        // get user meetings docs
        const meetings = await getDocs(collection(db, "users", UID, "meetings"));
        const numberOfMeetings = meetings.docs.length + 1;

        // try to write doc
        try{
          // https://firebase.google.com/docs/firestore/manage-data/add-data
          await setDoc(doc(db, "users", UID, `meetings`, `meeting-${numberOfMeetings}`),
          {
            name: payload,
            createdDate: serverTimestamp()
      })
        }
        catch(e){
          // to do error msg
        }
      }
      catch(e){
          // to do error msg
      }
    // end addMeeting method
    },
    async getDoc(){
        console.log("getting doc"); 
        // = await getDocs(collection(db, dbCollection))

      const data = doc(db, "users", this.user.uid);
      console.log(data);

      const colletions = await getDocs(collection(db, "users", this.user.uid, "meetings"));
      console.log(colletions.docs.length)

    }
  // end methods
  }
}

</script>

<style lang="scss">

</style>
