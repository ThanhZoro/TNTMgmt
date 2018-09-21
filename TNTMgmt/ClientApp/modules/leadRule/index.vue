<template>
  <div class="form-horizontal">
    <fieldset class="content-group">
      <legend class="text-bold">{{$t('settings.leadRule')}}</legend>
      <fieldset class="content-group">
        <div class="form-group">
          <div class="col-md-12">
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="fullName" value="fullName" />
              <label for="fullName" class="pointer label-padding">{{$t('leadsPage.fullName')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="phone" value="phone" />
              <label for="phone" class="pointer label-padding">{{$t('leadsPage.phone')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="email" value="email" />
              <label for="email" class="pointer label-padding">{{$t('leadsPage.email')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="status" value="status" />
              <label for="status" class="pointer label-padding">{{$t('leadsPage.status')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="channel" value="channel" />
              <label for="channel" class="pointer label-padding">{{$t('leadsPage.channel')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="source" value="source" />
              <label for="source" class="pointer label-padding">{{$t('leadsPage.source')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="gender" value="gender" />
              <label for="gender" class="pointer label-padding">{{$t('leadsPage.gender')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="birthday" value="birthday" />
              <label for="birthday" class="pointer label-padding">{{$t('leadsPage.birthday')}}</label>
            </div>
            <div class="col-xs-4">
              <input type="checkbox" v-model="otherSettings.leadRequire" class="custorm-checkbox" id="address" value="address" />
              <label for="address" class="pointer label-padding">{{$t('leadsPage.address')}}</label>
            </div>
            <div class="text-right col-xs-12 mt-20">
              <button @click="clearData" class="btn btn-default" :disabled="!disabled.edit">{{$t('clear')}}</button>
              <button @click="validateBeforeSubmit"  :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}}</button>
            </div>
          </div>
        </div>
      </fieldset>
    </fieldset>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  export default {
    data() {
      return {
        formData: { otherSettings: {} },
        loading: false,
        leadRule: [],
        otherSettings: {
          leadRequire: []
        }
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
      const STORE_KEY = "$_leadRule";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
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
              await _this.$store.dispatch("$_leadRule/updateLeadRequire", _this.formData);
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
      clearData: function () {
        var _this = this;
        _this.otherSettings.leadRequire = [];
      },
    }
  };
</script>
