<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <div style="background-color: #eff2f7;padding: 15px; margin-top:10px">
          <div>
            <span class="display-block">{{$t('formTrackingPage.introduction_submit')}}</span>
            <span class="display-block">{{$t('formTrackingPage.introduction_exam')}}</span>
            <span class="display-block"><b>&lt;input name="phone" class="your_class o2o-phone" value="" type="text"></b></span>
            <br />
            <p style="font-size:15px; text-transform:uppercase">{{$t('formTrackingPage.introduction_list')}}</p>
            <div class="row">
              <div class="col-md-2" v-for="item in formFields">
                &#8226; o2o-{{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top:10px;">
      <div class="col-md-12" style=" margin-bottom: 20px;">
        <span class="mb-3 display-block" style="font-size:20px; padding:10px 0px">{{$t('formTrackingPage.list')}}</span>
        <router-link :to="`/ga/${$route.params.id}/form/edit`">
          <button class="btn btn-primary" :disabled="!disabled.edit">{{$t('createNew')}}</button>
        </router-link>
      </div>
      <div class="row" style="margin-left:1px" v-if="formTracking">
        <div class="col-md-6" v-for="item in formTracking">
          <div v-bind:class="{ 'border-left-danger': !item.isActive, 'border-left-success' : item.isActive }" class="panel" style="height: 400px !important;">
            <div class="panel-heading">
              <div class="col-md-7  mb-10">
                <p class="panel-title font-size-24">{{item.name}}<a class="heading-elements-toggle"><i class="icon-more"></i></a></p>
              </div>
              <div class="col-md-5 text-right">
                <el-tooltip :content="$t('formTrackingPage.titleDelete')" placement="top" effect="dark">
                  <button class="btn btn-default btn-icon btn-xs" @click="deleteFormTracking(item)" :disabled="!disabled.edit">
                    <i class="icon-trash-alt"></i>
                  </button>
                </el-tooltip>
                <el-tooltip :content="$t('getCode')" placement="top" effect="dark">
                  <button class="btn btn-default btn-icon btn-xs" >
                    <i class="icon-embed2"></i>
                  </button>
                </el-tooltip>
                <el-tooltip :content="$t('formTrackingPage.updateFormTracking')" placement="top" effect="dark">
                  <router-link :to="`/ga/${$route.params.id}/form/edit/${item.id}`">
                    <button class="btn btn-default btn-icon btn-xs" :disabled="!disabled.edit">
                      <i class="icon-pencil5"></i>
                    </button>
                  </router-link>
                </el-tooltip>
              </div>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-12">
                  <span>{{$t('formTrackingPage.info')}}</span>
                  <ul>
                    <li>{{$t('conversion.title')}}: {{item.goalName}}</li>
                    <li>{{$t('status')}}: {{item.nameStatus}}</li>
                    <li>{{$t('source')}}: {{item.sourceName || $t('notAvailableSource')}}</li>
                    <li>{{$t('channel')}}: {{item.channelName || $t('notAvailableChannel')}}</li>
                    <li>class : {{item.formClassName}}</li>
                  </ul>
                </div>
                <div class="col-md-12">
                  <span>{{$t('formTrackingPage.allocatedTo')}}</span>
                  <ul>
                    <li>{{$t('staffInCharge')}}: {{item.nameStaffInCharge || $t('notAvailable')}}</li>
                    <li>{{$t('formTrackingPage.mailTo')}}: {{item.mailTo || $t('notAvailable')}}</li>
                  </ul>
                </div>
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
      deleteFormTracking(data) {
        this.$emit('deleteFormTracking', data);
      }
    },
    props: {
      formTracking: {
        type: Array,
      },
      formFields: {
        type: Array,
      },
    },
  };
</script>
