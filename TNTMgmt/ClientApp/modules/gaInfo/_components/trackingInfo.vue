<template>
  <div class="row mb-10">
    <div class="col-xs-12 col-md-8">
      <p>{{$t('trackingPage.trackingName')}}: <span>{{currentTracking.name}}</span></p>
      <p>{{$t('trackingPage.WebsiteUrl')}}: <span>{{currentTracking.websiteUrl}}</span></p>
      <p>{{$t('trackingPage.WebPropertyId')}}: <span>{{currentTracking.webPropertyId ? currentTracking.webPropertyId : 'N/A'}}</span></p>
      <p>{{$t('leadList.customerCare')}}: <span>{{currentTracking.active ? $t('leadList.activity') : $t('block')}}</span></p>
    </div>
    <div class="col-xs-12 col-md-4 ">
      <router-link v-if="currentTracking.profileId" :to="`/ga/tracking/connect/edit/${$route.params.id}`">
        <button type="button" class="btn btn-primary pull-right" :disabled="!disabled.edit">{{$t('edit')}}</button>
      </router-link>
      <router-link v-else :to="`/ga/tracking/disconnect/edit/${$route.params.id}`">
        <button type="button" class="btn btn-primary pull-right" :disabled="!disabled.edit">{{$t('edit')}}</button>
      </router-link>
      <button type="button" @click="getCode"  class="btn btn-default pull-right" style="margin-right:5px">{{$t('getCode')}}</button>
    </div>
    <el-dialog :title="$t('codeHtml')"
               :visible.sync="showCode"
               width="600px">
      <p>{{$t('tracking.descriptionShowCode')}}</p>
      <p>{{$t('tracking.descriptionShowCodeHeadBefore')}} <b>&lt;head></b> {{$t('tracking.descriptionShowCodeHeadAfter')}}:</p>
      <center>
        <textarea class="form-control" rows="4" readonly cols="70">&lt;script>o2oDataLayer = [{o2oData:{'companyId' : '{{code.companyId}}','trackingId' : '{{code.trackingId}}','tid' : '{{code.tid}}'}}];&lt;/script>&lt;script src="//gtmjs.com/scripts/tracking.js" async>&lt;/script>
          </textarea>
      </center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCode = false">{{$t('close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    data() {
      return {
        code: {},
        showCode: false
      };
    },
    computed: {
      ...mapState({
        companyId: state => state.common.companyInfo.id
      }),
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.tracking;
      }
    },
    methods: {
      getCode: function () {
        var _this = this;
        _this.showCode = true;
        _this.code = {
          companyId: _this.companyId,
          trackingId: _this.currentTracking.id,
          tid: _this.currentTracking.webPropertyId
        }
      },
    },
    props: ['currentTracking']
  };
</script>
