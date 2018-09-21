<template>
  <div class="content mt-20">
    <div class="row">
      <div class="panel panel-flat">
        <div class="panel-heading"></div>
        <div class="container-fluid">
          <div class="col-md-4">
            <h6 class="panel-title"><b>{{$t('leadFollowStatus')}}</b></h6>
            <pieReport :chart-data="leadStatus" />
          </div>
          <div class="col-md-4">
            <h6 class="panel-title"><b>{{$t('leadFollowSource')}}</b></h6>
            <pieReport :chart-data="leadSource"/>
          </div>
          <div class="col-md-4">
            <h6 class="panel-title"><b>{{$t('leadFollowChannel')}}</b></h6>
            <pieReport :chart-data="leadChannel"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import pieReport from './_components/pieReport.vue';
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  export default {
    data() {
      return {};
    },
    components: {
      pieReport
    },
    computed: {
      ...mapGetters({
        leadStatus: "$_homePage/leadStatus",
        leadSource: "$_homePage/leadSource",
        leadChannel: "$_homePage/leadChannel",
      }),
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_homePage";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", "");
      await _this.$store.dispatch("$_homePage/getLeadReport", "");
    },
    methods: {

    }
  };
</script>
