<template>
    <div>
    <form
      class="mt-3"
      @submit.prevent="register"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card bg-light">
              <div class="card-body">
                <h3 class="font-weight-light mb-3">Register</h3>
                <div class="form-row">
                  <div
                    v-if="error.code"
                    class="col-12 alert alert-danger px-3"
                  >
                    {{ error.code }} {{error.message}}
                  </div>
                  <section class="col-sm-12 form-group">
                    <label
                      class="form-control-label sr-only"
                      for="displayName"
                    >Display Name</label>
                    <input
                      class="form-control"
                      type="text"
                      id="displayName"
                      placeholder="Display Name"
                      name="displayName"
                      required
                      v-model="displayName"
                    />
                  </section>
                </div>
                <section class="form-group">
                  <label
                    class="form-control-label sr-only"
                    for="email"
                  >Email</label>
                  <input
                    class="form-control"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    v-model="email"
                  />
                </section>
                <div class="form-row">
                  <section class="col-sm-6 form-group">
                    <input
                      class="form-control"
                      type="password"
                      placeholder="Password"
                      v-model="passOne"
                    />
                  </section>
                  <section class="col-sm-6 form-group">
                    <input
                      class="form-control"
                      type="password"
                      required
                      placeholder="Repeat Password"
                      v-model="passTwo"
                    />
                  </section>
                </div>
                <div class="form-group text-right mb-0">
                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <p class="text-center mt-2">
      or
      <router-link to="/login">login</router-link>
    </p>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default {
    name: "Register",
    components: {
    // HelloWorld,
    },
    data(){
        return{
            displayName:"",
            email:"",
            passOne:"",
            passTwo:"",
            error:{
                code:"",
                message:""
            }
        }
    },
    methods:{
        register(){

            const auth = getAuth();
           
            // sign out loged in user
            signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
                this.error.code = error;
            });

            // create new user profile
            if(this.passOne === this.passTwo){

                
                createUserWithEmailAndPassword(auth, this.email, this.passOne)
                    .then((userCredential) => {
                        // Signed in 
                        this.$store.commit("storeUserCredential", userCredential); 
                        this.$router.push("meetings");
                    })
                    .catch((error) => {
                        this.error.code = error.code;
                        this.error.message = error.message;
                        // ..
                    });             

            }

        }

    }
}
</script>

<style>

</style>