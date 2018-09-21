<template>
  <div class="col-lg-3" style="padding-left: 0px;">
    <div class="panel">
      <ul class="list-group panel-no-border" style="padding: 0 !important">
        <li>
          <router-link :to="`/so/header/edit/${$route.params.id}/generalInfo`" class="list-group-item" active-class="active" exact>
            <span>{{$t('generalInfo')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/so/header/edit/${$route.params.id}/salesmanInfo`" class="list-group-item" active-class="active">
            <span>{{$t('so.salesmanInfo')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/so/header/edit/${$route.params.id}/buyerInfo`" class="list-group-item" active-class="active">
            <span>{{$t('so.buyerInfo')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/so/header/${$route.params.id}/details`" class="list-group-item" active-class="active">
            <span>{{$t('so.details')}}</span>
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
      const STORE_KEY = "$_menuSODetails";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", "");
    },
    methods: {

    }
  };
</script>
