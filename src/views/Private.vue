<template>
  <div class="private-main">
    <UserSidebar />
    <div class="private-container">
      <PrivateChatroom></PrivateChatroom>
    </div>
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import PrivateChatroom from "@/components/PrivateChatroom.vue";
export default {
  components: {
    UserSidebar,
    PrivateChatroom,
  },
};
</script>

<style lang="scss">
$orange: #ff6600;
$deeporange: #f34a16;
$lightdark: #9197a3;
$divider: #e6ecf0;
.private-main {
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
