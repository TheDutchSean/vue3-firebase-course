<template>
  <div class="container mt-4">
    <div
    class="row justify-content-center"
    >
      <div class="col-md-8" >
        <h1 class="font-weight-light text-center">Attendees</h1>

        <div class="card bg-light mb-4" v-if="user !== null && user.uid == userID">
          <div class="card-body text-center">
            <div class="input-group input-group-lg">
              <input
                type="text"
                placeholder="Search Attendees"
                class="form-control"
                v-model="searchQuery"
                ref="searchQuery"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-lg btn-outline-info"
                  title="Pick a random attendee"
                  @mouseup="chooseRandom"
                >
                  <font-awesome-icon icon="random"></font-awesome-icon>
                </button>
                <button
                  class="btn btn-lg btn-outline-info"
                  title="Reset Search"
                  @mouseup="resetQuery"
                >
                  <font-awesome-icon icon="undo"></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md-8 mb-2"
        v-for="attendee in filteredAttendees" :key="attendee.id"
      >
        <div class="card">
          <div class="card-body px-3 py-2 d-flex align-items-center justify-content-center">
            <div class="btn-group pe-2" v-if="user !== null && user.uid == userID">
              <button :class="[attendee.star ? 'text-danger':'btn btn-sm btn-outline-secondary']" title="Give user a Star" @mouseup="toggleStar(attendee.id)">
                <font-awesome-icon icon="star"></font-awesome-icon>
              </button>
              <a class="btn btn-sm btn-outline-secondary" title="Send user an email" :href='"mailto:"+attendee.email'>
                <font-awesome-icon icon="envelope"></font-awesome-icon>
              </a>
              <button class="btn btn-sm btn-outline-secondary" title="Delete Attendee" @mouseup="deleteAttendee(attendee.id)">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </button>
            </div>
            <div class="px-3 text-left align-self-center" >{{attendee.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, deleteDoc, collection, onSnapshot, updateDoc , getDoc } from "firebase/firestore"; 
import db from "@/db.js"

export default {
  name: "Attendees",
  props: ["user"],
  data(){
      return{
        attendees:[],
        displayAttendees: [],
        userID: this.$route.params.userID,
        meetingID: this.$route.params.meetingID,
        searchQuery: ""
      }
  },
  mounted() {

    // get attendees array from meetings
    onSnapshot(collection(db, "users", this.userID, `meetings`, this.meetingID, "attendees"), (snapShot) => {
      const snapData = [];
      snapShot.forEach( doc => {      
        snapData.push({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().displayName,
            star: doc.data().star
        });
      });
      this.attendees = snapData.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
          }
          else{
            return 1;
          }
      });
      this.displayAttendees= this.attendees;
    // end onSnapshot function
    });  
  // end mounted lifecycle
  },
  computed:{
    filteredAttendees: function() {
      const dataFilter = attendees => attendees.name.toLowerCase().match(this.searchQuery.toLowerCase()) && true;
      return this.displayAttendees.filter(dataFilter);
    }
  },
  methods:{
    async deleteAttendee(attendeeID){
      if(this.user && this.userID == this.user.uid){
        try{
          await deleteDoc(doc(db, "users", this.userID, "meetings", this.meetingID, "attendees", attendeeID));
        }
        catch(e){
          // to do on error
          console.warn(e);
        }
      }
    // end deleteAttendee methode
    },
    async toggleStar(attendeeID){

      if(this.user && this.userID == this.user.uid){
        try{

          const attendee = await getDoc(doc(db, "users", this.userID, "meetings", this.meetingID, "attendees", attendeeID));  
          let star = attendee.data().star;

          try{

            if(star){
              star = !star
            }
            else{
              star = true
            }

            await updateDoc(doc(db, "users", this.userID, "meetings", this.meetingID, "attendees", attendeeID), {
              star : star
            });
          }
          catch(e){
            console.warn(e)
          }
        } 
        catch(e){
          console.warn(e)
        }
      }
    // end toggelStar method
    },
    chooseRandom(){
      const randomAttendee = Math.floor(Math.random() * this.attendees.length);
      this.displayAttendees = [this.attendees[randomAttendee]];
    // end chooseRandom method
    },
    resetQuery(){
      this.displayAttendees = this.attendees; 
      this.searchQuery="";
      this.$refs.searchQuery.focus();
    // end resetQuery
    }
  // end methods
  }
}
</script>

<style>

</style>