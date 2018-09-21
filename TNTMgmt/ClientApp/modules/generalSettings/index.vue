<template>
  <div class="form-horizontal">
    <fieldset class="content-group">
      <legend class="text-bold">{{$t('settings.generalSettings')}}</legend>

      <div class="form-group">
        <label class="control-label col-xs-2">{{$t('settings.language')}}</label>
        <div class="col-xs-10 mb-20">
          <el-select v-model="otherSettings.languageDefault"
                     filterable
                     :placeholder="$t('choose')"
                     style="width:100%"
                     reserve-keyword
                     :disabled="!disabled.edit">
            <el-option v-for="(item, i) in commonData.languageDefault"
                       :key="i"
                       :label="item=='vi-VN' ? $t('vi') : $t('en')"
                       :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-xs-2">{{$t('settings.timezone')}}</label>
        <div class="col-xs-10 mb-20">
          <el-select v-model="otherSettings.timeZone"
                     filterable
                     clearable
                     :placeholder="$t('choose')"
                     style="width:100%"
                     reserve-keyword
                     :disabled="!disabled.edit">
            <el-option v-for="(item, i) in timezone"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="text-right mt-20">
        <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}}</button>
      </div>

    </fieldset>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import commonData from "@/utils/common-data";
  export default {
    data() {
      return {
        formData: { otherSettings: {} },
        loading: false,
        otherSettings: {
        },
        commonData,
        timezone: {},
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
      const STORE_KEY = "$_generalSettings";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.timezone = await _this.$store.dispatch("$_generalSettings/getTimeZone");
      _this.formData = await _.cloneDeep(_this.companyInfo);
      if (_this.companyInfo.otherSettings)
        _this.otherSettings = _.cloneDeep(_this.companyInfo.otherSettings);
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.otherSettings = _this.otherSettings;
              await _this.$store.dispatch("$_generalSettings/updateGeneralSettings", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
            } catch (error) {
              console.log(error);
              
            }
          }
        });
        _this.loading = false;
      }, 500),
    }
  };
</script>
