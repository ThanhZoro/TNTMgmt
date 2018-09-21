<template>
  <div>
    <title-bar :langTitle="`${$t('screen.settings')}  /  ${$t('screen.updateCompany')}`"></title-bar>
    <div class="content">
      <SettingsContainer />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t('company.companyInfo')}}</h5>
          <p class="content-group-lg">{{$t("settings.DesCompany")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <div class="pt-20" style="border-bottom: 1px lightgray dashed !important;">
              <GeneralSettingsContainer />
            </div>
            <div class="pt-20">
              <CompanyInfoContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CompanyInfoContainer from '@/modules/companyInfo';
  import SettingsContainer from '@/modules/settings';
  import GeneralSettingsContainer from '@/modules/generalSettings';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'CompanyInfo',
    components: {
      "title-bar": TitleBar,
      CompanyInfoContainer,
      SettingsContainer,
      GeneralSettingsContainer
    },
  };
</script>
