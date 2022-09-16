<template>
  <div id="app">
    <navigation :user="user" @logout="logOut"/>
    <router-view class="container" :user="user" :meetings="meetings" :error="error" @logout="logOut" @addMeeting="addMeeting" @deleteMeeting="deleteMeeting" @checkIn="checkIn"/>
  </div>
</template>

<script>
// imports
import navigation from "@/components/Navigation"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, serverTimestamp, onSnapshot, deleteDoc } from "firebase/firestore"; 
import db from "@/db.js"

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
      },
      meetings:[],
    }
  },
  mounted() {

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;

          // get user meetings docs
          onSnapshot(collection(db, "users", this.user.uid, `meetings`), (snapShot) => {
            const snapData = [];
            snapShot.forEach( doc => {      
              snapData.push({
                id: doc.id,
                name: doc.data().name
              });
            });
            this.meetings = snapData.sort((a, b) => {
               if (a.name.toLowerCase() < b.name.toLowerCase()){
                return -1;
               }
               else{
                return 1;
               }
            });
          });
        } else {
            // User is signed out
            this.meetings = null;
        }
    });
  // end mounted lifecycle
  },
  methods:{
    logOut(){

            const auth = getAuth();
           
            // sign out loged in user
            signOut(auth).then(() => {
            // Sign-out successful.
                this.user = null;
                this.$router.push("/");
            }).catch((error) => {
            // An error happened.
                this.error.code = error;
            });
    // end logOut method
    },
    async addMeeting(payload){
         
        // try to write doc
        try{
          // generate document with auto ID in colletion meetings
          await setDoc(doc(collection(db, "users", this.user.uid, `meetings`)),
          {
            name: payload,
            createdDate: serverTimestamp()
          })
        }
        catch(error){
          this.error.code = error;
        }
     // end addMeeting method
    },
    async deleteMeeting(payload){

      try{
        await deleteDoc(doc(db, "users", this.user.uid, "meetings", payload))
      }
      catch(error){
        this.error.code = error;
      }
    // end deleteMeeting methode
    },
    async checkIn(payload){     
      try{
        await setDoc(doc(collection(db, "users", payload.userID, `meetings`, payload.meetingID, "attendees")),
          {
            displayName: payload.displayName,
            email: payload.email,
            joinDate: serverTimestamp()
          })
        this.$router.push(`/attendees/${payload.userID}/${payload.meetingID}`)
      } 
      catch(e){
        this.error.code = "Sorry, no such meeting"
      }
    // end checkIn method
    }
  // end methods
  }
}

</script>

<style lang="scss">

</style>
