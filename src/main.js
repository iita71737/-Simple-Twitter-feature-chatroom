import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faUser, faHome, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import io from "socket.io-client";
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('https://fast-fortress-15170.herokuapp.com');

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: {
    autoConnect: true,
    forceNew: true,
  }
}));

library.add(faCog, faUser, faHome, faComment, faHeart, fasHeart)

Vue.component('font-awesome-icon', FontAwesomeIcon)

//---------------socket.io---------------
const socket = io('https://fast-fortress-15170.herokuapp.com')
Vue.prototype.$socket = socket
// 發送一個 "sendMessage" 事件
socket.emit("sendMessage", {
  name: "test-socket",
  message: "client emit to backend"
})
// 監聽來自 server 的 "allMessage" 事件
socket.on("allMessage", function (message) {
  console.log('Message from server ===>', message)
})
//----------socket.io-----------

Vue.config.productionTip = false
// event bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')