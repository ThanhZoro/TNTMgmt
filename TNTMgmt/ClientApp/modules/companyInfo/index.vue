<template>
      <div class="form-horizontal" v-if="formData">
        <fieldset class="content-group">
          <legend class="text-bold">{{$t('screen.updateCompany')}}</legend>
          <div :class="`form-group ${errors.has('companyName') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('company.companyName')}} *</label>
            <div class="col-lg-10">
              <input type="text" name="companyName" :disabled="!disabled.edit" :data-vv-as="$t('company.companyName')" v-validate="'required'" class="form-control" v-model="formData.companyName">
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('company.industryCategory')}}</label>
            <div class="col-lg-10">
              <el-select v-model="formData.companyType"
                         filterable
                         clearable
                         remote
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in listIndustry"
                           :key="i"
                           :label="$t('industry.' + item)"
                           :value="item">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('website')}}</label>
            <div class="col-lg-10">
              <input type="text" :disabled="!disabled.edit" class="form-control" :placeholder="$t('placeHolderWebsite')" v-model="formData.companyWebsite">
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('address')}}</label>
            <div class="col-lg-10">
              <address-twin @nameAddress="getAddress" :address="formData.companyAddress" :disabled="!disabled.edit"></address-twin>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('phone')}}</label>
            <div class="col-lg-10">
              <input type="text" :disabled="!disabled.edit" class="form-control" v-model="formData.phone" :placeholder="$t('placeHolderPhone')">
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('fax')}}</label>
            <div class="col-lg-10">
              <input type="text" :disabled="!disabled.edit" class="form-control" v-model="formData.fax" :placeholder="$t('placeHolderFax')">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('email')}}</label>
            <div class="col-lg-10">
              <input type="text" :disabled="!disabled.edit" name="email" data-vv-as="Email" v-validate="'email'" class="form-control" value="" v-model="formData.email" :placeholder="$t('placeHolderEmail')">
              <span v-show="errors.has('email')" class="help-block text-danger">{{ errors.first('email') }}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('tax')}}</label>
            <div class="col-lg-10">
              <input type="text" :disabled="!disabled.edit" class="form-control" value="" v-model="formData.taxCode" :placeholder="$t('placeHolderTax')">
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('company.scale')}}</label>
            <div class="col-lg-10">
              <el-select v-model="formData.scaleId"
                         filterable
                         clearable
                         remote
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option value="">{{$t('pleaseSelect')}}</el-option>
                <el-option v-for="(item, i) in listScale"
                           :key="i"
                           :label="$t('listScale.' + item)"
                           :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
        </fieldset>
        <fieldset class="content-group">
          <div class="row">
            <label class="control-label col-lg-2">{{$t('company.logo')}}</label>
            <div class="col-md-10">
              <div style="margin-bottom:10px;">
                <img class="img-responsive" :src="formData.logoUrl" style="width:300px" v-if="formData.logoUrl" />
                <img src="/images/no-image.svg" v-else style="width:300px" />
              </div>
              <input class="hidden" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
              <el-tooltip class="item" effect="dark" :content="$t('chooseFile')" placement="top">
                <button :disabled="uploadProcessing || !disabled.edit" class="btn btn-default btn-icon btn-xs" @click="chooseFile"><i class="icon-image2"></i></button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('upload')" placement="top">
                <button :disabled="uploadProcessing  || !disabled.edit" class="btn btn-default btn-icon btn-xs" @click="updateLogo"><i class="icon-checkmark3 "></i></button>
              </el-tooltip>
            </div>
          </div>
        </fieldset>
        <div class="text-right mt-30">
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
  
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import commonData from "@/utils/common-data";
  import TitleBar from "components/common/titleBar";
  import address from 'components/common/address';
  export default {
    components: {
      "title-bar": TitleBar,
      'address-twin': address
    },
    data() {
      return {
        formData: null,
        loading: false,
        uploadProcessing: false,
        listIndustry: commonData.listIndustry,
        listScale: commonData.listScale,
        file: null,
      };
    },
    computed: {
      ...mapState({
        companyInfo: state => state.common.companyInfo,
        searchRequest: state => state.$_companyInfo.searchRequest
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
      const STORE_KEY = "$_companyInfo";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch(
        "common/setTitle",
        _this.$t("screen.updateCompany")
      );
      _this.formData = await _.cloneDeep(_this.companyInfo);
    },
    methods: {
      getAddress: function (val) {
        this.formData.companyAddress = val;
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              await _this.$store.dispatch(
                "$_companyInfo/updateInfo",
                _this.formData
              );
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              return;
            } catch (error) {
              console.log(error);
              new PNotify({
                title: '',
                text: _this.$t('saveFailed'),
                addclass: 'bg-danger'
              });
            }
          }
        });
        _this.loading = false;
      }, 500),
      handleFileUpload(e) {
        var size = parseFloat(this.$refs.file.files[0].size / 1024).toFixed(2);
        if (size < 1024) {
          this.file = this.$refs.file.files[0];
          if (this.file) {
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = e => {
              // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
              // Read image as base64 and set to imageData
              this.formData.logoUrl = e.target.result;
            };
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(this.file);
          } else {
            this.formData.logoUrl = this.companyInfo.logoUrl;
          }
        } else {
          new PNotify({
            title: '',
            text: this.$t('limitUpload'),
            addclass: 'bg-danger'
          });
        }
      },
      chooseFile() {
        this.$refs.file.click();
      },
      async updateLogo() {
        var _this = this;
        if (this.file) {
          _this.uploadProcessing = true;
          let formData = new FormData();
          formData.append("file", this.file);
          try {
            await _this.$store.dispatch("$_companyInfo/updateLogo", formData);
            _this.file = null;
            new PNotify({
              title: '',
              text: _this.$t('saveSuccessfully'),
              addclass: 'bg-success'
            });
          } catch (e) {
            console.log(e);
            new PNotify({
              title: '',
              text: _this.$t('saveFailed'),
              addclass: 'bg-danger'
            });
          }
          _this.uploadProcessing = false;
        } else {
          new PNotify({
            title: '',
            text: _this.$t('chooseFile'),
            addclass: 'bg-warning'
          });
        }
      }
    }
  };
</script>
