<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('settings.configSurvey')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.configSurvey")}}</h5>
          <p class="content-group-lg">{{$t("settings.configSurveyDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <ConfigSurveyContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ConfigSurveyContainer from '@/modules/configSurvey';
  import SettingsContainer from '@/modules/settings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'configSurvey',
    components: {
      "title-bar": TitleBar,
      ConfigSurveyContainer,
      SettingsContainer
    },
  };
</script>
