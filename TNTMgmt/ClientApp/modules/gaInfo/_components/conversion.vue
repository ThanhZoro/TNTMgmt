<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <router-link :to="`/ga/${$route.params.id}/conversion/edit`">
          <button type="button" :disabled="!disabled.edit" class="btn btn-primary">{{$t('createNew')}}</button>
        </router-link>
        <button type="button" :disabled="!disabled.edit" class="btn btn-primary pull-right" @click="syncConversion" v-if="gaConnected"><i class="icon-database-refresh position-left"></i> {{ $t('trackingPage.syncWithGA') }}</button>
      </div>
    </div>
    <div class="row" style="margin-top: 20px;" v-if="conversion.data">
      <div class="col-md-6" v-for="item in conversion.data" v-show="item.id">
        <div class="panel panel-flat " v-bind:class="{ 'border-left-danger': !item.active, 'border-left-success' : item.active }" style="min-height: 250px" >
          <div class="panel-heading">
            <div class="panel-title">
              <div class="col-md-10 mb-10">
                <span class="font-size-24 break-word">{{item.name}}</span>
              </div>
              <div class="col-md-2 text-right">
                <el-tooltip :content="$t('conversion.updateconversion')" placement="top" effect="dark">
                  <router-link :to="`/ga/${$route.params.id}/conversion/edit/${item.id}`">
                    <button class="btn btn-default btn-icon btn-xs" :disabled="!disabled.edit">
                      <i class="icon-pencil5"></i>
                    </button>
                  </router-link>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-6 col-xs-6">
                <p>{{$t('googleAnalytics')}}</p>
                <ul>
                  <li>{{$t('conversion.categoryName')}}: {{item.category || ''}} </li>
                  <li>{{$t('conversion.actionName')}}: {{item.action || ''}} </li>
                  <li>{{$t('conversion.labelName')}}: {{item.label || ''}}</li>
                </ul>
              </div>
              <div class="col-md-6 col-xs-6 crm-goal">
                <p>{{$t('crm')}}</p>
                <ul>
                  <li>{{$t('conversion.type')}}: {{$t(item.type)}}</li>
                  <li>{{$t('conversion.value')}}: {{item.status ? item.status : ''}} </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.tracking;
      }
    },
    methods: {
      syncConversion() {
        this.$emit('syncConversion');
      }
    },
    props: ['conversion', 'gaConnected'],
  };
</script>

