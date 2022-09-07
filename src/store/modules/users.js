export default {
  state: {
    USERCREDENTIALS:{}
  },
  mutations: {
    storeUserCredential: function(state, mutation){
      state.USERCREDENTIALS = mutation;
    }
  },
  actions: {},
  getters: {
    getUserCredential: function(state){
      return state.USERCREDENTIALS;
    }
  },
  modules: {},
};
