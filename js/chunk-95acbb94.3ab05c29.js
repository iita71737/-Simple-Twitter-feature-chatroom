(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-95acbb94"],{"14d3":function(t,e,s){"use strict";s("db8f")},"81ce":function(t,e,s){},9194:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-room-container"},[s("UserSidebar",{staticClass:"sidebar-section"}),s("ChatRoomSection",{staticClass:"chat-room-section",attrs:{"text-objs":t.textObjs,"online-users":t.onlineUsers},on:{"after-sent-text":t.send}})],1)},a=[],i=s("1da1"),n=s("5530"),c=(s("96cf"),s("a004")),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-room-section"},[s("div",{staticClass:"online-users"},[s("div",{staticClass:"title"},[t._v(" 上線使用者"),s("span",{staticClass:"online-user-count"},[t._v("("+t._s(t.onlineUsers.length)+")")])]),s("div",{staticClass:"user-list"},t._l(t.onlineUsers,(function(e){return s("div",{key:e.id,staticClass:"user-item"},[s("img",{staticClass:"avatar",attrs:{src:t._f("emptyImage")(e.User.avatar),alt:"avatar"}}),s("div",{staticClass:"name"},[t._v(t._s(e.User.name))]),s("div",{staticClass:"account"},[t._v("@"+t._s(e.User.account))])])})),0)]),s("div",{staticClass:"chat-room"},[s("div",{staticClass:"title"},[t._v("公開聊天室")]),s("div",{staticClass:"chat-room-container"},[s("div",{staticClass:"chat-display-section"},t._l(t.textObjs,(function(e){return s("div",{key:e.id,staticClass:"dialogue",class:e.User2Id===t.currentUser.id?"currentuser":"others"},[e.User2Id!==t.currentUser.id?s("img",{staticClass:"avatar",attrs:{src:t._f("emptyImage")(e.User2.avatar),alt:"avatar"}}):t._e(),s("div",{staticClass:"desc"},[s("div",{staticClass:"input"},[t._v(t._s(e.message))]),s("div",{staticClass:"time"},[t._v(t._s(t._f("fromNow")(e.createdAt)))])])])})),0)]),s("form",{staticClass:"input-form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.afterSendText.apply(null,arguments)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),s("button",{staticClass:"submit-button",attrs:{type:"submit"}},[t._v(">>")])])])])},u=[],d=s("4cce"),l=s("2708"),m=s("2f62"),f={props:{textObjs:{type:Array,required:!0,default:function(){return[]}},onlineUsers:{type:Array,required:!0}},data:function(){return{users:[],text:""}},computed:Object(n["a"])({},Object(m["b"])(["currentUser"])),mixins:[l["a"],l["b"]],created:function(){this.fetchUsers()},methods:{fetchUsers:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].getTopUsers();case 2:s=e.sent,r=s.data,t.users=r;case 5:case"end":return e.stop()}}),e)})))()},afterSendText:function(){this.$emit("after-sent-text",this.text),this.text=""}}},h=f,v=(s("c966"),s("2877")),p=Object(v["a"])(h,o,u,!1,null,"755030a7",null),b=p.exports,x={components:{UserSidebar:c["a"],ChatRoomSection:b},data:function(){return{textObjs:this.historyTexts,onlineUsers:[],id:-1}},watch:{historyTexts:{immediate:!0,handler:function(){this.textObjs=this.historyTexts}}},computed:Object(n["a"])({},Object(m["b"])(["currentUser","historyTexts"])),created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].getCurrentUser();case 2:s=e.sent,r=s.data,t.id=r.id,t.$socket.emit("getCurrentUserId",r.id);case 6:case"end":return e.stop()}}),e)})))()},methods:{send:function(t){""!=t&&this.$socket.emit("emit_method",{msg:t,userId:this.currentUser.id})},beforeRouteLeave:function(t,e,s){this.$socket.emit("leave",this.id),s()},sockets:{historyTexts:function(t){this.$store.commit("SOCKET_fetchHistoryTexts",t)},onlineUsers:function(t){this.onlineUsers=t},single_thread:function(t){this.textObjs.push(t[0])}}}},C=x,_=(s("14d3"),Object(v["a"])(C,r,a,!1,null,"372d0630",null));e["default"]=_.exports},c966:function(t,e,s){"use strict";s("81ce")},db8f:function(t,e,s){}}]);
//# sourceMappingURL=chunk-95acbb94.3ab05c29.js.map