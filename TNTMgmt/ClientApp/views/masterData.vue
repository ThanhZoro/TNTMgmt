<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.' + id)}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings." + id)}}</h5>
          <p class="content-group-lg">{{$t("settings.Des" + id)}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <div class="pt-20" v-if="id == '1' || !id">
              <MasterDataContainer :dataType="1" :haveColor="true" />
            </div>
            <div class="pt-20" v-if="id == '2'">
              <MasterDataContainer :dataType="2" :haveColor="false" />
            </div>
            <div class="pt-20" v-if="id == '3'">
              <MasterDataContainer :dataType="3" :haveColor="false" />
            </div>
            <div v-if="id == 'other'">
              <div class="pt-20" style="border-bottom: 1px lightgray dashed !important;">
                <LeadRuleContainer />
              </div>
              <div class="pt-20">
                <MasterDataContainer :dataType="4" :haveColor="false" />
              </div>
              <div class="pt-20">
                <MasterDataContainer :dataType="5" :haveColor="false" />
              </div>
              <div class="pt-20">
                <MasterDataContainer :dataType="6" :haveColor="false" />
              </div>
              <div class="pt-20">
                <MasterDataContainer :dataType="7" :haveColor="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MasterDataContainer from '@/modules/masterData';
  import SettingsContainer from '@/modules/settings';
  import LeadRuleContainer from '@/modules/leadRule';
  import { mapActions, mapState, mapGetters } from "vuex";
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'MasterData',
    computed: {
      ...mapState({
        id: state => state.route.params.id
      })
    },
    components: {
      MasterDataContainer,
      SettingsContainer,
      LeadRuleContainer,
      "title-bar": TitleBar,
    },
  };
</script>
