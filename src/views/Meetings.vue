<template>
  <div>{{$options.name}}</div>
  <p>{{user}}</p>
</template>

<script>
// https://firebase.google.com/docs/auth/web/manage-users
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name: "Meetings",
    components: {
    // HelloWorld,
    },
    data(){
        return{
           user:""
        }
    },
    mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            this.user = user.displayName;
            // ...
        } else {
            // User is signed out
            this.$router.push("login");
        }
    });
        console.log(this.$store.getters.getUserCredential);
  // end mounted lifecycle
  },
}
</script>

<style>

</style>