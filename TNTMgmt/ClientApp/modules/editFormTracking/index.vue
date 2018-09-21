<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('formTrackingPage.updateFormTracking') : $t('formTrackingPage.createFormTracking')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('formTrackingPage.updateFormTracking') : $t('formTrackingPage.createFormTracking')}}</h5>
        <div class="heading-elements">
          <button @click="back()" class="btn btn-default">
            {{$t('back')}}
          </button>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">

                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('formTrackingPage.name')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" v-validate="'required'" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('goalId') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('conversion.title')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.goalId"
                               filterable
                               clearable
                               remote
                               :placeholder="''"
                               style="width:100%"
                               v-validate="'required'"
                               name="goalId"
                               reserve-keyword>
                      <el-option v-for="item in currentConversion"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div :class="`form-group ${errors.has('status') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadList.customerCare')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.status"
                               filterable
                               clearable
                               remote
                               :remote-method="filterStatus"
                               :placeholder="''"
                               style="width:100%"
                               v-validate="'required'"
                               name="status"
                               reserve-keyword>
                      <el-option v-for="item in status"
                                 :key="item.id"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('source')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.source"
                               filterable
                               clearable
                               remote
                               :remote-method="filterSource"
                               :placeholder="''"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in source"
                                 :key="item.id"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('channel')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.channel"
                               filterable
                               clearable
                               remote
                               :remote-method="filterChannel"
                               :placeholder="''"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in channel"
                                 :key="item.id"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2 blue--text font-size-16">{{$t('formTrackingPage.allocatedTo')}}</label>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('staffInCharge')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.staffInCharge"
                               filterable
                               clearable
                               remote
                               :placeholder="''"
                               :remote-method="filterUsers"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in users"
                                 :key="item.id"
                                 :label="item.fullName+' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div :class="`form-group ${errors.has('mailTo') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('formTrackingPage.mailTo')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="mailTo" class="form-control" v-model="formData.mailTo" v-validate="'email'">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadList.activity')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.isActive">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <button @click="back()" class="btn btn-default">
            {{$t('back')}}
          </button>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
        <!-- /bordered panel body table -->
      </div>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      "title-bar": TitleBar
    },
    data() {
      return {
        formData: {
          name: "",
          status: "",
          goalId: "",
          source: "",
          channel: "",
          staffInCharge: "",
          mailTo: "",
          trackingId: this.$route.params.gaId,
          isActive: true,
        },
        loading: false
      };
    },
    computed: {
      ...mapGetters({
        source: '$_editFormTracking/listSource',
        channel: '$_editFormTracking/listChannel',
        status: '$_editFormTracking/listStatus',
        users: "$_editFormTracking/listUser"
      }),
      ...mapState({
        currentFormTracking: state => state.$_editFormTracking.currentFormTracking,
        searchSource: state => state.$_editFormTracking.source,
        searchStatus: state => state.$_editFormTracking.status,
        searchChannel: state => state.$_editFormTracking.channel,
        searchUser: state => state.$_editFormTracking.users,
        currentConversion: state => _.filter(state.$_editFormTracking.currentConversion, (v) => { return v.id }),
      })
    },
    methods: {
      filterSource: function (query) { this.searchSource.description = query; },
      filterChannel: function (query) { this.searchChannel.description = query; },
      filterStatus: function (query) { this.searchStatus.description = query; },
      filterUsers: function (query) { this.searchUser.description = query; },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              let response = await _this.$store.dispatch('$_editFormTracking/editFormTracking', _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.back();
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      back: function () {
        this.$router.go(-1);
      },
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editFormTracking";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$route.params.id ? _this.$t('formTrackingPage.updateFormTracking') : _this.$t('formTrackingPage.createFormTracking'));
      await _this.$store.dispatch('$_editFormTracking/getConversion', _this.$route.params.gaId);
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editFormTracking/getForm', _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentFormTracking);
      }
    },
  };
</script>
