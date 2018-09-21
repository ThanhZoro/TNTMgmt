<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.configConnectSMS')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.configConnectSMS")}}</h5>
          <p class="content-group-lg">{{$t("settings.configConnectSMSDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <ConfigConnectSMSContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ConfigConnectSMSContainer from '@/modules/configConnectSMS';
  import SettingsContainer from '@/modules/settings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'configConnectSMS',
    components: {
      "title-bar": TitleBar,
      ConfigConnectSMSContainer,
      SettingsContainer
    },
  };
</script>
