<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('tracking.updateTracking') : $t('tracking.createTracking')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('tracking.updateTracking') : $t('tracking.createTracking')}}</h5>
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
                  <label class="control-label col-lg-2">{{$t('tracking.trackingName')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :placeholder="$t('tracking.placeholdelTrackingName')" v-validate="'required'" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('credential') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('tracking.chooseUser')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.accountCredential"
                               :disabled="disableInput"
                               filterable
                               clearable
                               remote
                               :default-first-option="true"
                               :placeholder="$t('pleaseSelect')"
                               style="width:100%"
                               v-validate="'required'"
                               name="credential"
                               reserve-keyword>
                      <el-option v-for="item in GAMapping"
                                 :key="item.accountCredential"
                                 :label="item.userName"
                                 :value="item.accountCredential">
                      </el-option>
                    </el-select>
                    <div class="mt-5">
                      <a @click="setupGA" v-show="!$route.query.credentialId">{{$t('connectGoogle')}}</a>
                    </div>

                  </div>
                </div>
                <div :class="`form-group ${errors.has('account') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.userName')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.accountId"
                               filterable
                               clearable
                               :disabled="disableInput"
                               remote
                               :placeholder="$t('pleaseSelect')"
                               style="width:100%"
                               v-validate="'required'"
                               name="account"
                               reserve-keyword>
                      <el-option v-for="item in googleAnalytic.account"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div :class="`form-group ${errors.has('property') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('tracking.propertyId')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.webPropertyId"
                               :disabled="disableInput || formData.accountId == ''"
                               filterable
                               clearable
                               remote
                               :placeholder="$t('pleaseSelect')"
                               style="width:100%"
                               v-validate="'required'"
                               name="property"
                               reserve-keyword>
                      <el-option v-for="item in googleAnalytic.propertise"
                                 :key="item.id"
                                 :label="item.id"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div :class="`form-group ${errors.has('profile') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('tracking.view')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.profileId"
                               :disabled="disableInput || formData.webPropertyId == ''"
                               filterable
                               clearable
                               remote
                               :placeholder="$t('pleaseSelect')"
                               v-validate="'required'"
                               name="profile"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in googleAnalytic.profile"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('trackingPage.website')}}</label>
                  <div class="col-lg-10" style="margin-top:9px">
                    <span>{{formData.websiteUrl}}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadList.activity')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.active">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/ga" class="btn btn-default">
            {{$t('back')}}
          </router-link>
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
  import TitleBar from "components/common/titleBar";
  import store from "./_store";
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {
          accountId: "",
          webPropertyId: "",
          profileId: "",
          accountCredential: this.$route.query.credentialId ? this.$route.query.credentialId : ''
        },
        loading: false,
        disableInput: this.$route.params.id ? true : false
      };
    },
    computed: {
      ...mapGetters({
      }),
      ...mapState({
        googleAnalytic: state => state.$_editTrackingConnectGa.googleAnalytic,
        GAMapping: state => state.$_editTrackingConnectGa.GAMapping,
        currentTracking: state => state.$_editTrackingConnectGa.tracking,
      })
    },
    watch: {
      "formData.accountId": async function (val) {
        var _this = this;
        if (val != "") {
          await _this.$store.dispatch('$_editTrackingConnectGa/getListProperties', { accountId: val, accountCredential: _this.formData.accountCredential });
        }
        if (!_this.disableInput) {
          _this.formData.webPropertyId = "";
          _this.formData.profileId = "";
        }
      },
      "formData.webPropertyId": async function (val) {
        var _this = this;
        if (val != "") {
          await _this.$store.dispatch('$_editTrackingConnectGa/getListProfiles', { accountId: _this.formData.accountId, propertyId: val, accountCredential: _this.formData.accountCredential });
        }
        if (!_this.disableInput) {
          _this.formData.profileId = "";
        }
      },
      "formData.profileId": async function (val) {
        var _this = this;
        if (val != "") {
          var website = await _.find(this.googleAnalytic.profile, { 'id': val });
          if (website) {
            this.formData.websiteUrl = website.websiteUrl;
          }
        } else {
          this.formData.websiteUrl = "";
        }
      },
      "formData.accountCredential": async function (val) {
        var _this = this;
        if (val) {
          await _this.$store.dispatch('$_editTrackingConnectGa/getListAccount', val);
        }
        if (!_this.disableInput) {
          _this.formData.accountId = "";
          _this.formData.webPropertyId = "";
          _this.formData.profileId = "";
        }

      }
    },
    methods: {
      setupGA: function () {
        var _this = this;
        _this.$store.dispatch('$_editTrackingConnectGa/setupAccount');
      },
      back: function () {
        if (this.$route.params.id) {
          this.$router.go(-1);
        } else {
          this.$router.push('/ga');
        }
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              var response = await _this.$store.dispatch('$_editTrackingConnectGa/editTracking', _this.formData);
              _this.$router.push(`/ga/${response.data.id}`);
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
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editTrackingConnectGa";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$route.params.id ? _this.$t('tracking.updateTracking') : _this.$t('tracking.createTracking'));
      await _this.$store.dispatch('$_editTrackingConnectGa/getGAMapping');
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editTrackingConnectGa/getTracking', _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentTracking);
      }
      if (_this.$route.query && _this.$route.query.credentialId) {
        await _this.$store.dispatch('$_editTrackingConnectGa/getListAccount', _this.$route.query.credentialId);
      }
    },
  };
</script>
