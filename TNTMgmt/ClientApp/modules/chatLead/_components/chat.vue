<template>
  <div class="row">
    <div class="col-md-12">
      <div style="height: 300px;overflow-y: scroll;" id="chat">
        <ul class="media-list chat-list content-group" v-for="(item, index) in listMessages">
          <li v-if="item.userId != userInfo" class="media">
            <div class="media-left">
              <avatar :avatarUrl="item.avatarUrl" :firstChar="item.name"></avatar>
            </div>
            <div class="media-body">
              <div class="media-content">{{item.message}}</div>
              <span class="media-annotation display-block mt-10">{{item.timeChat}} </span>
            </div>
          </li>
          <li v-else class="media reversed">
            <div class="media-body">
              <div class="media-content">{{item.message}}</div>
              <span class="media-annotation display-block mt-10">{{item.timeChat}} </span>
            </div>
            <div class="media-right">
              <avatar :avatarUrl="item.avatarUrl" :firstChar="item.name"></avatar>
            </div>
          </li>
        </ul>
      </div>
      <div class="row mt-20">
        <div class="col-xs-10 text-right">
          <input v-model="message" name="enter-message" :disabled="!disabled.edit" class="form-control content-group" :placeholder="$t('leadsPage.chatPlaceholder')" v-on:keyup.enter="sendMessages">
        </div>
        <div class="col-xs-2 text-right">
          <button @click="sendMessages" type="button" :disabled="!disabled.edit" class="btn btn-primary">{{$t('leadsPage.send')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import $ from 'jquery'
  export default {
    data() {
      return {
        message: "",
        scroll : 0,
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.lead;
      }
    },
    watch: {
      listMessages: function (val) {
        var _this = this;
        if (val) _this.scrollBottom();
      }
    },
    methods: {
      sendMessages: _.debounce(async function () {
        var _this = this;
        _this.$emit('sendMessages', _this.message);
        _this.message = "";
        _this.scroll = 0;
        _this.scrollBottom();
      }, 500),
      scrollBottom() {
        var _this = this;
        $('#chat').animate({
          scrollTop: _this.scroll == 0 ? $('#chat')[0].scrollHeight + 99999999999999999999999 : $('#chat')[0].scrollHeight - _this.scroll
        });
      },
    },
    async mounted() {
      var _this = this;
      $("#chat").scroll(function (e) {
        var scrollPos = $('#chat').scrollTop();
        if (scrollPos == 0) {
          _this.scroll = _this.scroll + 600;
          _this.$emit('loadMoreMessages', '');
        }
      });
    },
    props: ["listMessages","userInfo"]
  };
</script>
