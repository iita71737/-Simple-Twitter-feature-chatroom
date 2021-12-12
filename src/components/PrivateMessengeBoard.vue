<template>
  <div class="messenge-board">
    <div>
      <div class="top-wrapper">
        <div class="info">
          <div
            class="name"
            @click="$router.push(`/user/other/${userId}`).catch(() => {})"
          >
            {{ "test.name" }}
          </div>
          <div
            class="account"
            @click="$router.push(`/user/other/${userId}`).catch(() => {})"
          >
            {{ "test.account" }}
          </div>
        </div>
      </div>
      <div ref="boardWrapper" class="board-wrapper">
        <div class="messages">
          <div v-for="message in messages" :key="message.id">
            <div
              class="broacast-message-wrapper"
              v-if="currentUser.id !== message.UserId"
            >
              <div class="broacast-message">
                {{ message.createdAt | fromNow }}
              </div>
            </div>
            <div
              class="other message"
              v-if="currentUser.id !== message.SenderId"
            >
              <div
                class="avatar"
                :style="{
                  background: `url(${
                    message.User ? message.User.avatar : message.avatar
                  }) no-repeat center/cover`,
                }"
              ></div>
              <div class="wrapper">
                <div class="text">{{ message.message }}</div>
                <div class="time">{{ message.createdAt | fromNow }}</div>
              </div>
            </div>
            <div
              class="self message"
              v-if="currentUser.id === message.SenderId"
            >
              <div class="text">{{ message.message }}</div>
              <div class="time">{{ message.createdAt | fromNow }}</div>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <div class="text-wrapper">
          <input
            v-model="message"
            class="text"
            placeholder="輸入訊息..."
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '輸入訊息...'"
          />
          <div class="icon-wrapper" type="submit" @click="sendMessage">
            <div class="icon send"></div>
          </div>
        </div>
      </form>
    </div>
    <div v-show="messages.length === 0" class="no-message-noti">
      <div>你沒有任何訊息</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "@/utils/helpers";
import { mapState } from "vuex";
import { fromNowFilter } from "../utils/mixins.js";

export default {
  props: {
    messages: {
      type: Array,
    },
    targetChannel: {
      type: String,
    },
  },
  mixins: [fromNowFilter],
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    this.$socket.on("private_msg_from_backend", (data) => {
      console.log("private_msg==>", data);
      this.$emit("sendPrivateMessage", {
        SenderId: data.SenderId,
        ReceiverId: data.ReceiverId,
        message: data.message,
        createdAt: data.createdAt,
        targetChannel: data.targetChannel,
      });
    });
    this.$socket.on("unread_msg", (data) => {
      console.log("unread_msg===>", data);
      if (data.UserId === this.currentUser.id) {
        this.$bus.$emit("updateChatUsers", data);
      }
    });
  },
  beforeDestroy() {},
  watch: {},
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      if (this.message.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "請輸入訊息",
        });
        return;
      }
      this.$socket.emit("private message", {
        SenderId: this.currentUser.id,
        ReceiverId: this.$route.params.id,
        message: this.message,
        targetChannel: this.targetChannel,
      });
      this.message = "";
      const scroll = this.$refs.boardWrapper;
      if (scroll) {
        scroll.scrollTop = scroll.scrollHeight;
        scroll.animate({ scrollTop: scroll.scrollHeight });
      }
    },
  },
};
</script>

<style lang="scss">
$orange: #ff6600;
$deeporange: #f34a16;
$lightgray: #f5f8fa;
$bitdark: #657786;
$divider: #e6ecf0;
.messenge-board {
  height: 100%;
  width: 100%;
  border-left: 1px solid $divider;
  position: relative;
  .top-wrapper {
    position: absolute;
    top: 0;
    height: 55px;
    width: 100%;
    text-align: left;
    .info {
      margin: 6px 0 0 15px;
      position: relative;
      .name {
        font-weight: 900;
        font-size: 19px;
        line-height: 28px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .account {
        position: absolute;
        top: 23px;
        font-weight: 500;
        font-size: 13px;
        color: $bitdark;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .public-text {
      width: 100%;
      height: 100%;
      text-align: left;
      padding: 15px 0 0 15px;
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
    }
  }
  .board-wrapper {
    border-top: $divider 1px solid;
    position: absolute;
    top: 55px;
    width: 100%;
    height: calc(100vh - 110px);
    padding: 15px;
    overflow-y: scroll;
    .broacast-message-wrapper {
      display: flex;
      flex-direction: column;
      .broacast-message {
        width: 100%;
        margin: 10px auto;
        padding: 0 15px;
        width: auto;
        border-radius: 100px;
        vertical-align: middle;
        background: #f0f0f0;
        font-size: 15px;
        height: 22px;
        line-height: 22px;
        vertical-align: middle;
        font-weight: 700;
        color: $bitdark;
      }
    }
    .messages {
      width: 100%;
      height: 100%;
      position: relative;
      .message {
        margin: 10px 0;
        width: 100%;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
      }
      .message.other {
        display: flex;
        flex-direction: row;
        .avatar {
          margin-right: 10px;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            filter: brightness(0.9);
          }
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: left;
            max-width: 300px;
            min-height: 40px;
            background: #f0f0f0;
            padding: 0 15px;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
          }
          .time {
            margin-left: 10px;
            font-size: 13px;
            text-align: left;
            color: $bitdark;
          }
        }
      }
      .message.self {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        .text {
          max-width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: right;
          padding: 0 15px;
          min-height: 40px;
          background: $orange;
          color: #fff;
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;
          border-bottom-left-radius: 30px;
        }
        .time {
          margin-right: 10px;
          font-size: 13px;
          text-align: right;
          color: $bitdark;
        }
      }
    }
  }
  .text-wrapper {
    position: absolute;
    bottom: 0;
    border-top: $divider 1px solid;
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    .text {
      margin-left: 15px;
      padding: 15px;
      border-radius: 100px;
      border: none;
      height: 36px;
      width: 100%;
      background: $lightgray;
      &:focus {
        outline: none;
      }
      ::placeholder {
        color: $bitdark;
      }
    }
    .icon-wrapper {
      height: 36px;
      width: 72px;
      display: flex;
      align-items: center;
      .icon.send {
        margin: auto;
        width: 20px;
        height: 20px;
        mask: url(../assets/svgs/icon_send.svg) no-repeat center;
        mask-size: contain;
        background-color: $orange;
        cursor: pointer;
      }
    }
  }
  .no-message-noti {
    height: 100%;
    width: 100%;
    font-size: 22px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
