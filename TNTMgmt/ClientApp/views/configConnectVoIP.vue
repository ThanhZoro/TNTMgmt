<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.configConnectVoIP')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.configConnectVoIP")}}</h5>
          <p class="content-group-lg">{{$t("settings.configConnectVoIPDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <ConfigConnectVoIPContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ConfigConnectVoIPContainer from '@/modules/configConnectVoIP';
  import SettingsContainer from '@/modules/settings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'configConnectVoIP',
    components: {
      "title-bar": TitleBar,
      ConfigConnectVoIPContainer,
      SettingsContainer
    },
  };
</script>
