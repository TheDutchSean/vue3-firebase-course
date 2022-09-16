<template>
  <div class="mt-3">
    <div class="text-secondary text-center">
      <div class="text-center" v-if="user">
        Welcome back 
        <span class="font-weight-bold text-info"> {{ user.displayName }}</span>,
        <a href="#" role="button" class="text-primary" @mouseup="$emit('logout')" >logout</a>
      </div>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 text-primary mb-2">Meeting Log</h4>
          <p class="lead">
            This simple app creates meetings, allows people to check in, and
            picks random users to award giveaways. It's a good example of a
            Single Page Application which includes connection to a database and
            routing. It's a practical way to learn
            <a href="https://vuejs.org/">Vue.js</a>
            with
            <a href="https://firebase.google.com">Firebase</a>.
          </p>
          <router-link
            class="btn btn-outline-primary me-2"
            to="/register"
            v-if="!user"
          >Register</router-link>
          <router-link
            class="btn btn-outline-primary me-2"
            to="/login"
            v-if="!user"
          >Log In</router-link>
          <router-link
            class="btn btn-primary"
            to="/meetings"
            v-if="user"
          >Meetings</router-link>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Home",
  data: function(){
    return {
      user: null,
    }
  },
  components: {},
  computed:{},
  mounted() {

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            this.user = user;
        } else {
            // User is signed out
        }
    });
  // end mounted lifecycle
  },
  methods:{ }
};
</script>
