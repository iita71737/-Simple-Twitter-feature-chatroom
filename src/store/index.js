import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users.js'
import adminAPI from '../apis/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      email: '',
      image: '',
      cover: '',
      isAdmin: false,
      password: '',
      checkPassword: ''
    },
    isAuthenticated: false,
    token: '',
    followers: [],
    followings: [],
    topUsers: []
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('simpleTwitter-token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('simpleTwitter-token')
    },
    setFollowingList(state, data) {
      state.topUsers = [...data]
      state.followers = [...data],
        state.followings = [...data]
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, avatar: image, role, account, cover } = data
        commit('setCurrentUser', {
          id, name, email, image, account, cover, isAdmin: role === 'user' ? false : true
        })
        return true
      } catch (error) {
        console.error('cannot fetch user info')
      }
    },
    async fetchCurrentAdmin({ commit }) {
      try {
        const { data } = await adminAPI.getCurrentAdmin()
        const { id, name, email, avatar: image, role, account, cover } = data
        commit('setCurrentUser', {
          id, name, email, image, account, cover, isAdmin: role === 'user' ? false : true
        })
      } catch (error) {
        console.error('cannot fetch admin user info')
      }
    },
    async fetchTopUsers({ commit }) {
      try {
        const { data } = await usersAPI.getTopUsers();
        console.log(commit, data)

      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {
  }
})
