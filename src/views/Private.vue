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
  .private-container {
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    border-left: 1px solid $divider;
    padding: 0;
  }
}
</style>
