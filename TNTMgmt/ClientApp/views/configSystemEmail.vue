<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.configSystemEmail')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.configSystemEmail")}}</h5>
          <p class="content-group-lg">{{$t("settings.configSystemEmailDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <ConfigSystemEmailContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ConfigSystemEmailContainer from '@/modules/configSystemEmail';
  import SettingsContainer from '@/modules/settings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'configSystemEmail',
    components: {
      "title-bar": TitleBar,
      ConfigSystemEmailContainer,
      SettingsContainer
    },
  };
</script>
