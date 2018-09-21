<template>
  <div>
    <title-bar :langTitle="`${$t('so.header')} / ${$t('generalInfo')} `"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div>
        <div class="panel-heading mb-10">
          <h5 class="panel-title">
            {{$t('so.infoBill')}}
            <router-link to="/so/header" class="btn btn-default pull-right">
              {{$t('back')}}
            </router-link>
          </h5>
        </div>
      </div>
      <!-- /bordered panel body table -->

      <div class="panel-body">
        <MenuSOContainer />
        <div class="panel col-lg-9">
          <div class="panel body panel-no-border">
            <div class="panel-body">
              <EditSOHeaderContainer type="salesmanInfo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditSOHeaderContainer from '@/modules/editSOHeader';
  import MenuSOContainer from '@/modules/menuSO';
  import TitleBar from "components/common/titleBar";

  export default {
    name: 'editSOHeader',
    components: {
      EditSOHeaderContainer,
      MenuSOContainer,
      "title-bar": TitleBar,
    },
  };
</script>

