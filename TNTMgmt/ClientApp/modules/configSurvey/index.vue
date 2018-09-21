<template>
  <div class="form-horizontal mt-20">
    <fieldset class="content-group">
      <div class="form-group">
        <div class="col-md-12" v-if="formData">
          <div class="row">
            <div class="col-md-12">
              <label class="control-label col-md-3">{{$t('company.surveyLead')}}</label>
              <div class="col-md-9">
                <el-select v-model="otherSettings.surveyId"
                           filterable
                           clearable
                           remote
                           :remote-method="filterSurvey"
                           :placeholder="$t('choose')"
                           style="width:100%"
                           :disabled="!disabled.edit">
                  <el-option v-for="item in surveys"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="text-right col-md-12 mt-20">
              <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary mr-10">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
            </div>
          </div>
        </div>
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
        formData: null,
        loading: false,
        otherSettings: {
          surveyId: ''
        }
      };
    },
    computed: {
      ...mapState({
        companyInfo: state => state.common.companyInfo,
        surveys: state => state.$_configSurvey.surveys,
        searchRequest: state => state.$_configSurvey.searchRequest,
        advanceFilter: state => state.$_configSurvey.advanceFilter
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
      const STORE_KEY = "$_configSurvey";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.companyInfo.otherSettings) {
        _this.otherSettings = _.cloneDeep(_this.companyInfo.otherSettings);
        if (_this.companyInfo.otherSettings.surveyId) {
          _this.advanceFilter.choosenFilter.push({ searchType: 'checkbox', data: [{ id: _this.companyInfo.otherSettings.surveyId }], field: 'id' });
        }
      }
      _this.searchRequest.description = "";
      await _this.$store.dispatch("$_configSurvey/getListSurvey");
      if (!_this.surveys.length) { _this.otherSettings = { surveyId : "" }; }
      _this.formData = await _.cloneDeep(_this.companyInfo);
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.otherSettings = _this.otherSettings;
              await _this.$store.dispatch("$_configSurvey/updateInfo", _this.formData);
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
      filterSurvey: _.debounce(async function (query) {
        var _this = this;
        _this.searchRequest.description = query;
        _this.advanceFilter.choosenFilter = [];
        await this.$store.dispatch("$_configSurvey/getListSurvey");
      }, 500),
    }
  };
</script>
