<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <h1
          class="font-weight-light text-center"
        >Add a Meeting</h1>

        <div class="card bg-light">
          <div class="card-body text-center">
            <form class="formgroup">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  name="meetingName"
                  placeholder="Meeting name"
                  aria-describedby="buttonAdd"
                  v-model="meetingName"
                  ref="meetingName"
                />
                <div class="input-group-append">
                  <button
                    type="submit"
                    class="btn btn-sm btn-info"
                    id="buttonAdd"
                    @click.prevent="handleAdd"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// https://firebase.google.com/docs/auth/web/manage-users
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name: "Meetings",
    components: {
    // HelloWorld,
    },
    prop: ["user"],
    data(){
        return{
           meetingName : null
        }
    },
    mounted() {
    // const auth = getAuth();

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/firebase.User
    //         this.user = user.displayName;
    //         // ...
    //     } else {
    //         // User is signed out
    //         this.$router.push("login");
    //     }
    // });
    //     console.log(this.$store.getters.getUserCredential);
  // end mounted lifecycle
  },
  methods:{
    handleAdd(){
        
        this.$emit("addMeeting", this.meetingName);
        this.meetingName = null;
        this.$refs.meetingName.focus();
    }
  }
}
</script>

<style>

</style>