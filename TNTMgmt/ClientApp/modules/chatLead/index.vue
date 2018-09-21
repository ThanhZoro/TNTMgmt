<template>
  <div >
    <Chat :listMessages="listMessages" @sendMessages="receiveMessages" @loadMoreMessages="loadMoreMessages" :userInfo ="userInfo" />
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import Vue from 'vue'
  import store from './_store';
  import Chat from './_components/chat';
  export default {
    components: {
      Chat
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.auth.userInfo.profile.sub,
        searchRequest: state => state.$_chatLead.searchRequest,
        maxSize: state => state.$_chatLead.maxSize
      }),
      ...mapGetters({
        listMessages: "$_chatLead/listMessages"
      }),
    },
    watch: {

    },
    async created() {
      var _this = this;
      const STORE_KEY = '$_chatLead';
      // eslint-disable-next-line no-underscore-dangle
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch('$_chatLead/getListMessages', { leadId: _this.$route.params.id});
      _this.$store.dispatch('$_chatLead/setNumberScroll', 1);
    },
    methods: {
      receiveMessages: async function (val) {
        var _this = this;
        if (val) await _this.$store.dispatch('$_chatLead/sendMessages', { message: val, leadId: _this.$route.params.id, userId: _this.userInfo });        
      },
      loadMoreMessages: async function () {
        var _this = this;        
        if (_this.searchRequest.numberScroll < _this.maxSize) {
          await _this.$store.dispatch('$_chatLead/setNumberScroll');
          await _this.$store.dispatch('$_chatLead/getListMessages', { leadId: _this.$route.params.id });
        }
      }
    },

  }
</script>
