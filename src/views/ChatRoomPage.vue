<template>
  <div class="chat-room-container">
    <UserSidebar class="sidebar-section" />
    <ChatRoomSection
      :text-objs="textObjs"
      :online-users="onlineUsers"
      @after-sent-text="send"
      class="chat-room-section"
    />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import ChatRoomSection from "../components/ChatRoomSection.vue";
import usersAPI from "../apis/users";
import { mapState } from "vuex";

export default {
  components: {
    UserSidebar,
    ChatRoomSection,
  },
  data() {
    return {
      textObjs: this.historyTexts,
      onlineUsers: [],
      id: -1,
    };
  },
  watch: {
    historyTexts: {
      immediate: true,
      handler() {
        this.textObjs = this.historyTexts;
      },
    },
  },
  computed: {
    ...mapState(["currentUser", "historyTexts"]),
  },
  async created() {
    let { data } = await usersAPI.getCurrentUser();
    console.log(data);
    this.id = data.id;
    this.$socket.emit("getCurrentUserId", data.id);
  },

  methods: {
    // 從 ChatRoomSection.vue 拿到資料後透過 socket 傳送訊息給後端
    send(text) {
      if (text == "") return;
      this.$socket.emit("emit_method", {
        msg: text,
        userId: this.currentUser.id,
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    this.$socket.emit("leave", this.id);
    next();
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    disconnect() {
      console.log("socket disconnected");
    },
    error() {
      console.log("socket error");
    },
    historyTexts(data) {
      if (!this.historyTexts || this.historyTexts.length == 0) {
        this.$store.commit("SOCKET_fetchHistoryTexts", data);
      }
    },
    onlineUsers(data) {
      console.log("onlineusers", data);
      this.onlineUsers = data;
    },
    single_thread(data) {
      // emit 資料到後端後，後端廣播回來的資料從這裡拿
      console.log("single_thread", data);
      this.textObjs.push(data[0]);
    },
  },
};
</script>

<style scoped lang="scss">
.chat-room-container {
  display: flex;
  margin: 0 auto;
  flex-flow: row nowrap;
  width: 1440px;
  max-width: 1440px;
  .chat-room-section {
    flex: 1;
    width: 26.7%;
  }
  .sidebar-section {
    width: 26.7%;
    padding-left: 95px;
  }
}
</style>
