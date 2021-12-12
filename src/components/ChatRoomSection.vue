<template>
  <div class="chat-room-section">
    <div class="online-users">
      <div class="title">
        上線使用者<span class="online-user-count"
          >({{ onlineUsers.length }})</span
        >
      </div>
      <div class="user-list">
        <div v-for="user of onlineUsers" :key="user.id" class="user-item">
          <img
            :src="user.User.avatar | emptyImage"
            class="avatar"
            alt="avatar"
          />
          <div class="name">{{ user.User.name }}</div>
          <div class="account">@{{ user.User.account }}</div>
        </div>
      </div>
    </div>
    <div class="chat-room">
      <div class="title">公開聊天室</div>
      <div class="chat-display-section">
        <div
          v-for="textObj in textObjs"
          :key="textObj.id"
          class="dialogue"
          :class="textObj.User2Id === currentUser.id ? 'currentuser' : 'others'"
        >
          <img
            v-if="textObj.User2Id !== currentUser.id"
            :src="textObj.User2.avatar | emptyImage"
            class="avatar"
            alt="avatar"
          />
          <div class="desc">
            <div class="input">{{ textObj.message }}</div>
            <div class="time">{{ textObj.createdAt | fromNow }}</div>
          </div>
        </div>
      </div>
      <form @submit.stop.prevent="afterSendText" class="input-form">
        <input v-model="text" class="input" type="text" />
        <button class="submit-button" type="submit">>></button>
      </form>
    </div>
  </div>
</template>


<script>
import usersAPI from "../apis/users";
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  props: {
    textObjs: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    onlineUsers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      users: [],
      text: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mixins: [emptyImageFilter, fromNowFilter],
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      let { data } = await usersAPI.getTopUsers();
      this.users = data;
    },
    // 把資料傳給 ChatRoomPage.vue
    afterSendText() {
      this.$emit("after-sent-text", this.text);
      this.text = "";
    },
  },
};
</script>

<style scoped lang="scss">
.chat-room-section {
  border: 1px solid #e6ecf0;
  display: flex;
  height: 100vh;
  .online-users {
    width: 390px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e6ecf0;
    .title {
      border-bottom: 1px solid #e6ecf0;
      padding: 15px;
      font-size: 18px;
      font-weight: 700;
      font-family: monospace;
    }
    .user-list {
      display: flex;
      flex-direction: column;
      .user-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6ecf0;
        padding: 15px;
        .avatar {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
        }
        .name {
          margin-left: 5px;
          margin-right: 5px;
          font-weight: 700;
          font-size: 15px;
          //刪節號
          width: fit-content;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .account {
          color: #657786;
          font-size: 15px;
        }
      }
    }
  }
  .chat-room {
    display: flex;
    flex-direction: column;
    flex: 1;
    .title {
      border-bottom: 1px solid #e6ecf0;
      padding: 15px;
      font-size: 18px;
      font-weight: 700;
      font-family: monospace;
    }
    .chat-display-section {
      padding: 15px;
      flex: 1;
      height: 100%;
      overflow: scroll;
      .dialogue {
        display: flex;
        margin-bottom: 15px;
        .time {
          color: #657786;
          font-size: 13px;
        }
      }
      .other {
        .avatar {
          margin-right: 10px;
        }
        .desc {
          text-align: left;
        }
        .input {
          background: #e6ecf0;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 15px;
          letter-spacing: 1px;
        }
      }
      .currentuser {
        display: flex;
        flex-direction: column;
        .desc {
          align-self: flex-end;
          text-align: right;
          .input {
            background: #ff6600;
            color: white;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 15px;
            letter-spacing: 1px;
          }
        }
      }

      .avatar {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .input-form {
      display: flex;
      padding: 15px 15px 10px 15px;
      border-top: 1px solid #e6ecf0;
      .input {
        flex: 1;
        outline: none;
        border: none;
        background: #e6ecf0;
        font-size: 15px;
        border-radius: 8px;
        padding: 10px;
        letter-spacing: 1.5px;
      }
      .submit-button {
        background: white;
        border: none;
      }
    }
  }
}
</style>