<template>
  <div class="col-lg-3" style="padding-left: 0px !important">
    <div class="panel">
      <ul class="list-group panel-no-border" style="padding: 0 !important">
        <li>
          <router-link to="/settings" class="list-group-item" active-class="active" exact>
            <span>{{$t('screen.updateCompany')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/lead" class="list-group-item" active-class="active">
            <span>{{$t('settings.other')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/master-data/1" class="list-group-item" active-class="active">
            <span>{{$t('settings.1')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/master-data/2" class="list-group-item" active-class="active">
            <span>{{$t('settings.2')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/master-data/3" class="list-group-item" active-class="active">
            <span>{{$t('settings.3')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/config-survey" class="list-group-item" active-class="active">
            <span>{{$t('settings.configSurvey')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/config-sync-data" class="list-group-item" active-class="active">
            <span>{{$t('settings.configSyncData')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/config-connect-sms" class="list-group-item" active-class="active">
            <span>{{$t('settings.configConnectSMSTitle')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/config-connect-edm" class="list-group-item" active-class="active">
            <span>{{$t('settings.configConnectEDMTitle')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/config-connect-voip" class="list-group-item" active-class="active">
            <span>{{$t('settings.configConnectVoIPTitle')}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings/config-system-email" class="list-group-item" active-class="active">
            <span>{{$t('settings.configSystemEmail')}}</span>
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
      const STORE_KEY = "$_settings";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", "");
    },
    methods: {

    }
  };
</script>
