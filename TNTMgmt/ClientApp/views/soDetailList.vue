<template>
  <div>
    <title-bar :langTitle="`${$t('so.header')} / ${$t('so.details')} `"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div>
        <div class="panel-heading mb-10">
          <h5 class="panel-title">
            {{$t('so.details')}}
            <router-link to="/so/header" class="btn btn-default pull-right">
              {{$t('back')}}
            </router-link>
          </h5>
        </div>
      </div>
      <!-- /bordered panel body table -->

      <div class="panel-body">
        <MenuSOContainer />
        <div class="panel col-lg-9" style="padding: 0px;">
          <div class="panel body panel-no-border">
            <div class="panel-body" style="padding: 0px;">
              <SODetailListContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SODetailListContainer from '@/modules/soDetailList';
  import MenuSOContainer from '@/modules/menuSO';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'soDetailList',
    components: {
      SODetailListContainer,
      MenuSOContainer,
      "title-bar": TitleBar,
    },
  };
</script>
