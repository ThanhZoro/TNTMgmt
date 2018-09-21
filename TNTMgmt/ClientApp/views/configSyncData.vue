<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.configSyncData')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.configSyncData")}}</h5>
          <p class="content-group-lg">{{$t("settings.configSyncDataDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <ConfigSyncDataContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ConfigSyncDataContainer from '@/modules/configSyncData';
  import SettingsContainer from '@/modules/settings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'configSyncData',
    components: {
      "title-bar": TitleBar,
      ConfigSyncDataContainer,
      SettingsContainer
    },
  };
</script>
