(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9328a868"],{"0796":function(e,t,s){"use strict";s("83bc")},"293a":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"chat-main"},[s("UserSidebar"),s("div",{staticClass:"chat-container"},[s("Chatroom")],1)],1)},r=[],n=s("5530"),i=s("a004"),c=s("2f62"),o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"chat-room"},[s("div",{staticClass:"chat-users"},[s("div",{staticClass:"title"},[e._v(" 上線使用者 ("+e._s(e.onlineUsers?e.onlineUsers.length:0)+") ")]),e.onlineUsers.length>0?s("div",{staticClass:"list-group"},e._l(e.onlineUsers,(function(t){return s("div",{key:""+(t.id+Math.random()),staticClass:"list-group-item"},[s("div",{staticClass:"avatar",style:{background:"url("+(t.User?t.User.avatar:"")+") no-repeat center/cover"},on:{click:function(s){e.$router.push("/user/other/"+t.id).catch((function(){}))}}}),s("div",{staticClass:"info"},[s("div",{staticClass:"name",on:{click:function(s){e.$router.push("/user/other/"+t.id).catch((function(){}))}}},[e._v(" "+e._s(t.User?t.User.name:"")+" ")]),s("div",{staticClass:"account",on:{click:function(s){e.$router.push("/user/other/"+t.id).catch((function(){}))}}},[e._v(" "+e._s(t.User?t.User.account:"")+" ")])])])})),0):e._e()]),s("MessengeBoard",{on:{someoneComein:e.updateOnelineUsers}})],1)},u=[],l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.$refs?s("div",{staticClass:"messenge-board"},[e._m(0),s("div",{ref:"boardWrapper",staticClass:"board-wrapper",on:{click:e.scrollToBottom}},[s("div",{staticClass:"messages"},e._l(e.messages,(function(t,a){return s("div",{key:"msg-"+a},["userComein"===t.type&&e.currentUser.id!==t.UserId?s("div",{staticClass:"broacast-message-wrapper"},[s("div",{staticClass:"broacast-message"},[e._v(e._s(t.message))])]):e._e(),"userComein"!==t.type&&e.currentUser.id!==t.UserId?s("div",{staticClass:"other message"},[s("div",{staticClass:"avatar",style:{background:"url("+(t.User?t.User.avatar:t.avatar)+") no-repeat center/cover"}}),s("div",{staticClass:"wrapper"},[s("div",{staticClass:"text"},[e._v(e._s(t.message))]),s("div",{staticClass:"time"},[e._v(e._s(e._f("fromNow")(t.createdAt)))])])]):e._e(),"userComein"!==t.type&&e.currentUser.id===t.UserId?s("div",{staticClass:"self message"},[s("div",{staticClass:"text"},[e._v(e._s(t.message))]),s("div",{staticClass:"time"},[e._v(e._s(e._f("fromNow")(t.createdAt)))])]):e._e()])})),0)]),s("form",{on:{submit:function(t){return t.preventDefault(),e.sendMessage.apply(null,arguments)},click:e.scrollToBottom}},[s("div",{staticClass:"text-wrapper"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"text",attrs:{placeholder:"輸入訊息...",onfocus:"this.placeholder = ''",onblur:"this.placeholder = '輸入訊息...'"},domProps:{value:e.message},on:{input:function(t){t.target.composing||(e.message=t.target.value)}}}),s("div",{staticClass:"icon-wrapper",attrs:{type:"submit"},on:{click:e.sendMessage}},[s("div",{staticClass:"icon send"})])])])]):e._e()},d=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"top-wrapper"},[s("div",{staticClass:"public-text"},[e._v("公開聊天室")])])}],m=(s("498a"),s("2fa3")),v={data:function(){return{message:"",messages:[],userComeinObject:{}}},mounted:function(){this.$socket.emit("chatting",Object(n["a"])(Object(n["a"])({},this.currentUser),{},{createdAt:new Date}))},methods:{sendMessage:function(e){if(e.preventDefault(),""!==this.message.trim()){this.$socket.emit("send message",{UserId:this.currentUser.id,avatar:this.currentUser.avatar,message:this.message,createdAt:new Date,type:"chat",User:this.currentUser}),this.message="";var t=this.$refs.boardWrapper;t&&(t.scrollTop=t.scrollHeight,t.animate({scrollTop:t.scrollHeight}))}else m["a"].fire({icon:"error",title:"請輸入訊息"})}}},f=v,p=(s("0796"),s("2877")),h=Object(p["a"])(f,l,d,!1,null,null,null),g=h.exports,C={components:{MessengeBoard:g},data:function(){return{onlineNumber:0,onlineUsers:[]}}},_=C,U=(s("86fa"),Object(p["a"])(_,o,u,!1,null,null,null)),b=U.exports,w={components:{Chatroom:b,UserSidebar:i["a"]},computed:Object(n["a"])({},Object(c["b"])(["currentUser","isAuthenticated"]))},k=w,x=(s("9c66"),Object(p["a"])(k,a,r,!1,null,null,null));t["default"]=x.exports},"498a":function(e,t,s){"use strict";var a=s("23e7"),r=s("58a8").trim,n=s("c8d2");a({target:"String",proto:!0,forced:n("trim")},{trim:function(){return r(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,s){var a=s("e330"),r=s("1d80"),n=s("577e"),i=s("5899"),c=a("".replace),o="["+i+"]",u=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),d=function(e){return function(t){var s=n(r(t));return 1&e&&(s=c(s,u,"")),2&e&&(s=c(s,l,"")),s}};e.exports={start:d(1),end:d(2),trim:d(3)}},"71af":function(e,t,s){},8264:function(e,t,s){},"83bc":function(e,t,s){},"86fa":function(e,t,s){"use strict";s("71af")},"9c66":function(e,t,s){"use strict";s("8264")},c8d2:function(e,t,s){var a=s("5e77").PROPER,r=s("d039"),n=s("5899"),i="​᠎";e.exports=function(e){return r((function(){return!!n[e]()||i[e]()!==i||a&&n[e].name!==e}))}}}]);
//# sourceMappingURL=chunk-9328a868.40c0f0e4.js.map