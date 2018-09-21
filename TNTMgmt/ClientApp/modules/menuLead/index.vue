<template>
  <div class="col-lg-3" style="padding-left: 0px;">
    <div class="panel">
      <ul class="list-group panel-no-border" style="padding: 0 !important">
        <li>
          <router-link :to="`/lead/generalInfo/${$route.params.id}`" class="list-group-item" active-class="active" exact>
            <span>{{$t('generalInfo')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/lead/moreInfo/${$route.params.id}`" class="list-group-item" active-class="active">
            <span>{{$t('moreInfo')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/lead/history/${$route.params.id}`" class="list-group-item" active-class="active">
            <span>{{$t('history.title')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/lead/contact/${$route.params.id}`" class="list-group-item" active-class="active">
            <span>{{$t('contact.title')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/lead/chat/${$route.params.id}`" class="list-group-item" active-class="active">
            <span>{{$t('messages')}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {};
    },
    computed: {},
    async created() {
      var _this = this;
      const STORE_KEY = "$_menuLead";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", "");
    },
    methods: {

    }
  };
</script>
