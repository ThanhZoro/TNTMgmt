<template>
  <div class="form-horizontal mt-20">
    <fieldset class="content-group">
      <div :class="`form-group ${errors.has('mailSettings-mailType') ? 'has-error' : ''}`">
        <label class="control-label col-lg-2">{{$t('mailType')}} *</label>
        <div class="col-lg-10">
          <el-select v-model="mailSettings.mailType" name="mailSettings-mailType" v-validate="'required'" :placeholder="''" style="width:100%" :disabled="!disabled.edit">
            <el-option v-for="(item,i) in commonData.mailType"
                       :key="i"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div :class="`form-group ${errors.has('mailSettings-email') ? 'has-error' : ''}`">
        <label class="control-label col-lg-2">{{$t('email')}}</label>
        <div class="col-lg-10">
          <input type="text" :disabled="!disabled.edit" name="mailSettings-email" data-vv-as="Email" v-validate="'email'" class="form-control" v-model="mailSettings.email">
        </div>
      </div>
      <div class="form-group" v-if="mailSettings.mailType == 'smtp'">
        <label class="control-label col-lg-2">{{$t('userList.password')}}</label>
        <div class="col-lg-10">
          <input type="password" :disabled="!disabled.edit" v-model="mailSettings.password" class="form-control">
        </div>
      </div>
      <div class="form-group" v-else>
        <label class="control-label col-lg-2">{{$t('userList.emailName')}}</label>
        <div class="col-lg-10">
          <input type="text" :disabled="!disabled.edit" v-model="mailSettings.emailName" class="form-control">
        </div>
      </div>
      <div :class="`form-group ${errors.has('linkUrl') ? 'has-error' : ''}`" v-if="mailSettings.mailType == 'smtp'">
        <label class="control-label col-lg-2">{{$t('company.host')}}</label>
        <div class="col-lg-10">
          <input type="text" :disabled="!disabled.edit" v-model="mailSettings.host" name="linkUrl" class="form-control">
        </div>
      </div>
      <div class="form-group" v-else>
        <label class="control-label col-lg-2">{{$t('key')}}</label>
        <div class="col-lg-10">
          <input type="text" :disabled="!disabled.edit" v-model="mailSettings.key" class="form-control">
        </div>
      </div>
      <div class="form-group" v-if="mailSettings.mailType == 'smtp'">
        <label class="control-label col-lg-2">{{$t('company.ssl')}}</label>
        <div class="col-lg-10">
          <input type="checkbox" :disabled="!disabled.edit" v-model="mailSettings.enableSSL" class="custorm-checkbox">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-lg-2">{{$t('company.signature')}}</label>
        <div class="col-lg-10">
          <vue-editor :disabled="!disabled.edit" v-model="mailSettings.signature"></vue-editor>
        </div>
      </div>
      <div class="form-group text-right">
        <button :disabled="!disabled.edit" @click="clearData" class="btn btn-default">{{$t('clear')}}</button>
        <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary mr-10">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
      </div>
    </fieldset>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import commonData from "@/utils/common-data";
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        formData: null,
        loading: false,
        mailSettings: {
          enableSSL: false,
        },
        commonData
      };
    },
    computed: {
      ...mapState({
        companyInfo: state => state.common.companyInfo,
      }),
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.settings;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_configEmail";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.formData = await _.cloneDeep(_this.companyInfo);
      if (_this.companyInfo.mailSettings)
        _this.mailSettings = _.cloneDeep(_this.companyInfo.mailSettings);
      if (!_this.mailSettings.mailType) _this.mailSettings.mailType = "smtp";
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.mailSettings = _this.mailSettings;
              await _this.$store.dispatch("$_configEmail/updateInfo", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              return;
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      clearData: function () {
        var _this = this;
        _this.mailSettings = {
          enableSSL: false,
        };
      },
    }
  };
</script>
