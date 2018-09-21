<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.configConnectEDM')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.configConnectEDM")}}</h5>
          <p class="content-group-lg">{{$t("settings.configConnectEDMDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <ConfigConnectEDMContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ConfigConnectEDMContainer from '@/modules/configConnectEDM';
  import SettingsContainer from '@/modules/settings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'configConnectEDM',
    components: {
      "title-bar": TitleBar,
      ConfigConnectEDMContainer,
      SettingsContainer
    },
  };
</script>
