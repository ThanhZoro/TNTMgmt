<template>
  <div>
    <title-bar :langTitle="`${$t('screen.leadList')} / ${$t('moreInfo')} `"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div>
        <div class="panel-heading mb-10">
          <h5 class="panel-title">
            {{$t('settings.other')}}
            <router-link to="/lead" class="btn btn-default pull-right">
              {{$t('back')}}
            </router-link>
          </h5>
        </div>
      </div>
      <!-- /bordered panel body table -->

      <div class="panel-body">
        <MenuLeadContainer />
        <div class="panel col-lg-9">
          <div class="panel body panel-no-border">
            <div class="panel-body">
              <LeadInfoContainer type="moreInfo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LeadInfoContainer from '@/modules/leadInfo';
  import MenuLeadContainer from '@/modules/menuLead';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'LeadMoreInfo',
    components: {
      LeadInfoContainer,
      MenuLeadContainer,
      "title-bar": TitleBar,
    },
  };
</script>
