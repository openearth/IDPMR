export default {
  namespaced: true,
  state: {
    currentUser: null,
  },
  mutations: {
    SET_CURRENT_USER(state, { currentUser }) {
      state.currentUser = currentUser;
    },
  },
  actions: {
    setCurrentUser({ commit }, { currentUser }) {
      commit("SET_CURRENT_USER", { currentUser });
    },
    removeCurrentUser({ commit }) {
      commit("SET_CURRENT_USER", { currentUser: null });
    },
  },
};
