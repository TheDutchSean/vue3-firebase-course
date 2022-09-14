<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div
        class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
        v-for="attendee in attendees" :key="attendee.joinDate"
      >
        <div class="card">
          <div class="card-body px-3 py-2 d-flex align-items-center justify-content-center">
            <div>{{attendee.displayName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, /*collection, */ onSnapshot } from "firebase/firestore"; 
import db from "@/db.js"

export default {
  name: "Attendees",
  components: {
  // HelloWorld,
  },
  props: [],
  data(){
      return{
        attendees:[],
        userID: this.$route.params.userID,
        meetingID: this.$route.params.meetingID
      }
  },
  mounted() {

              // get user meetings docs
          // https://firebase.google.com/docs/firestore/query-data/listen
          onSnapshot(doc(db, "users", this.userID, `meetings`, this.meetingID), (snapShot) => {
            console.log(snapShot.data().attendees);
            // const snapData = snapShot.data().attendees;
            // snapShot.forEach( doc => {      
            //   snapData.push({
            //     id: doc.id,
            //     name: doc.data().name
            //   });
            // });
            this.attendees = snapShot.data().attendees.sort((a, b) => {
               if (a.displayName.toLowerCase() < b.displayName.toLowerCase()){
                return -1;
               }
               else{
                return 1;
               }
            });
          console.log(this.attendees)
          });
          
  },
  methods:{

  // end methods
  }
}
</script>

<style>

</style>