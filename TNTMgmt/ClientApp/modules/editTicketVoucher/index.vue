<template>
  <div>
    <title-bar :langTitle="$t('ticket.titleEdit')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('ticket.update') : $t('ticket.create')}}</h5>
        <div class="heading-elements">
          <button @click="back()" class="btn btn-default">
            {{$t('back')}}
          </button>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="form-horizontal">
          <div class="row">
            <div class="col-md-4">
              <div class="panel panel-flat">
                <div class="panel-body">
                  <fieldset>
                    <legend class="text-semibold">{{$t('ticket.desginTicket')}}</legend>
                    <div>
                      <div :class="`form-group margin-bottom-default ${errors.has('name') ? 'has-error' : ''}`">
                        <span class="col-lg-12 control-label">
                          <span>{{$t('ticket.programName')}} *</span>
                        </span>
                      </div>
                      <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                        <label class="col-lg-1 control-label">
                          <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" value="name" name="name">
                        </label>
                        <div class="col-lg-11">
                          <input type="text" name="name" :placeholder="$t('ticket.placeHolderTrackingName')" v-validate="'required'" class="form-control" v-model="formData.name">
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-group margin-bottom-default">
                        <span class="col-lg-12 control-label">
                          <span>{{$t('ticket.showImg')}} <span style="color:red">{{$t('ticket.rate')}} </span></span>
                        </span>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 control-label">
                          <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" value="file" name="file">
                        </label>
                        <div class="col-lg-11">
                          <img class="img-responsive" :src="avatarUrl" />
                          <input class="hidden" type="file" id="file" ref="file" v-on:change="handleFileUpload()">
                          <div style="margin-top:10px">
                            <el-tooltip class="item" effect="dark" :content="$t('chooseFile')" placement="top">
                              <button :disabled="uploadProcessing" class="btn btn-default btn-icon btn-xs" @click="chooseFile"><i class="icon-image2"></i></button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="$t('saveImage')" placement="top">
                              <button v-show="$route.params.id" :disabled="uploadProcessing" class="btn btn-default btn-icon btn-xs" @click="updateLogo"><i class="icon-checkmark3 "></i></button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="$t('deleteImage')" placement="top">
                              <button :disabled="uploadProcessing" class="btn btn-default btn-icon btn-xs" @click="deleteLogo"><i class="icon-trash "></i></button>
                            </el-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-group margin-bottom-default">
                        <span class="col-lg-12 control-label">
                          <span>{{$t('ticket.titleTicket')}}</span>
                        </span>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 control-label">
                          <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" value="title" name="title">
                        </label>
                        <div class="col-lg-11">
                          <input type="text" class="form-control" v-model="formData.title">
                        </div>
                      </div>
                    </div>
                    <div>
                      <div :class="`form-group ${errors.has('numberOfCharactersCode') ? 'has-error' : ''}`">
                        <div class="row">
                          <div class="col-md-12">
                            <label class="col-lg-12 control-label">
                              <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" value="numberOfCharactersCode" name="numberOfCharactersCode"> {{$t('ticket.ticketCode')}} *
                            </label>
                            <div class="col-lg-12">
                              <el-select v-model="formData.numberOfCharactersCode"
                                         filterable
                                         clearable
                                         remote
                                         :placeholder="$t('choose')"
                                         reserve-keyword
                                         v-validate="'required'"
                                         name="numberOfCharactersCode"
                                         style="width:100%">
                                <el-option v-for="item in commonData.code"
                                           :key="item"
                                           :label="item+$t('ticket.characters')"
                                           :placeholder="$t('choose')"
                                           :value="item">
                                </el-option>
                              </el-select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-6">
                          {{$t('ticket.colorTicketCode')}}
                          <input type="color" class="form-control" v-model="formData.backgroundColorCode">
                        </div>
                        <div class="col-md-6">
                          {{$t('ticket.colorWordTicket')}}
                          <input type="color" class="form-control" v-model="formData.colorCode">
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="blue--text">{{$t('ticket.showInfo')}}</p>
                      <div class="form-group">
                        <label class="col-lg-12 control-label">
                          <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" value="dateOfValidity" name="dateOfValidity"> <span>{{$t('ticket.startDay')}}</span>
                        </label>
                        <div class="col-lg-11">
                          <el-date-picker v-model="formData.dateOfValidity"
                                          type="datetime" style="width:100%">
                          </el-date-picker>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-12 control-label">
                          <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" value="expiryDate" name="expiryDate"> <span>{{$t('ticket.endDay')}}</span>
                        </label>
                        <div class="col-lg-11">
                          <el-date-picker v-model="formData.expiryDate"
                                          type="datetime" style="width:100%">
                          </el-date-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-group">
                        <div class="col-lg-6">
                          <input type="checkbox" id="googleId" class="custorm-checkbox" v-model="formData.displayFields" name="GoogleId" value="GoogleId">
                          <label for="googleId">{{$t('ticket.googleId')}}</label>
                        </div>
                        <div class="col-lg-6">
                          <input type="checkbox" id="qrcode" class="custorm-checkbox" v-model="formData.displayFields" name="QRCode" value="QRCode">
                          <label for="qrcode">{{$t('qrcode.qrcodeName')}}</label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="panel panel-flat" style="min-height: 807px;">
                <div class="panel-body">
                  <fieldset>
                    <legend class="text-semibold" style="margin-bottom: 55px;">{{$t('ticket.formSignUp')}}</legend>
                    <div class="form-group" v-for="item in commonData.formSignIn">
                      <label class="col-lg-1 control-label">
                        <input type="checkbox" class="custorm-checkbox" v-model="formData.displayFields" :value="item.validate" :name="item.validate">
                      </label>
                      <div class="col-lg-6">
                        <input type="text" class="form-control" :placeholder="$t(`userList.${item.name}`)">
                      </div>
                      <div class="col-lg-5">
                        <el-select v-model="formData.form[item.validate]">
                          <el-option v-for="item in commonData.validation"
                                     :key="item"
                                     :label="$t(item)"
                                     :placeholder="$t('choose')"
                                     :value="item">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div>
                      <div class="form-group margin-bottom-default">
                        <span class="col-lg-3 control-label">
                          <span>{{$t('ticket.buttonSaveTicket')}}</span>
                        </span>
                      </div>
                      <div class="form-group">
                        <div class="col-lg-12">
                          <input type="text" class="form-control" v-model="formData.form.nameButton">
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-group margin-bottom-default">
                        <span class="col-lg-12 control-label">
                          <span>{{$t('ticket.infoAfterSaveTicket')}}</span>
                        </span>
                      </div>
                      <div class="form-group">
                        <div class="col-lg-12">
                          <textarea rows="5" cols="5" class="form-control"
                                    v-model="formData.form.alertMessageAfterSave">
                          </textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-lg-4">{{$t('leadList.activity')}}</label>
                        <div class="col-lg-8" style="margin-top:5px">
                          <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.isActive">
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="panel panel-flat">
                <div class="panel-body" style="min-height: 807px;">
                  <fieldset>
                    <legend class="text-semibold" style="margin-bottom: 55px;">{{$t('call.reviewDesign')}}</legend>
                    <div class="col-md-12">
                      <div class="panel panel-flat">
                        <div class="panel-heading">
                          <div class="panel-title text-center font-size-28">
                            <span v-show="checkExit('name')">{{formData.name}}</span>
                          </div>
                        </div>
                        <img width="100%" v-show="checkExit('file')" :src="avatarUrl" />
                        <div :style="{ 'background-color': `${formData.backgroundColorCode}`, 'color':`${formData.colorCode}` }" class="font-size-18 text-center">
                          <span v-show="checkExit('title')">{{formData.title}}</span>
                          <p v-show="checkExit('numberOfCharactersCode')">12AC</p>
                        </div>
                        <div class="row" style="padding:25px 0px;">
                          <div class="col-md-5 col-xs-12 text-center">
                            <qriously :value="''" :size="130" v-show="checkExit('QRCode')" />
                          </div>
                          <div class="col-md-7 col-xs-12 text-left" style="font-size:14px">
                            <p>{{$t('ticket.GID')}}: 1201930.1289380213</p>
                            <p v-show="checkExit('dateOfValidity')">{{$t('ticket.createdAt')}} : {{formData.dateOfValidity ?  $moment(formData.dateOfValidity).format('DD/MM/YYYY HH:mm:ss ') : ''}}</p>
                            <p v-show="checkExit('expiryDate')">{{$t('ticket.applyTo')}}: {{formData.expiryDate ?  $moment(formData.expiryDate).format('DD/MM/YYYY HH:mm:ss') : ''}}</p>
                          </div>
                        </div>
                        <div class="col-xs-12 text-left" style="margin-top:20px;margin-left:-10px">
                          <p>{{$t('ticket.yourInfo')}}</p>
                        </div>
                        <div class="col-xs-12">
                          <div class="form-group" v-for="item in commonData.formSignIn" v-show="checkExit(item.validate)">
                            <input :placeholder="$t(`userList.${item.name}`)" class="form-control" />
                          </div>
                          <div class="form-group">
                            <button class="btn btn-danger" style="width:100%">{{formData.form.nameButton}}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
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
  import commonData from '@/utils/common-data'
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {
          numberOfCharactersCode: '',
          trackingId: this.$route.params.gaId,
          backgroundColorCode: '#000000',
          colorCode: '#000000',
          form: {
            validateName: "",
            validatePhone: "",
            validateEmail: "",
            validateGender: "",
            validateAddress: "",
            nameButton: "",
            alertMessageAfterSave: ""
          },
          displayFields: [],
          file: null,
          backgroundColorCode: '#000000',
          colorCode: '#000000',
          isActive: true,
        },
        loading: false,
        id: false,
        file: null,
        uploadProcessing: false,
        commonData,
        avatarUrl: "",
        editLogo: false,
      };
    },
    computed: {
      ...mapGetters({

      }),
      ...mapState({
        currentTicketTracking: state => state.$_editTicketVoucher.currentTicketTracking
      })
    },
    watch: {
      "formData.file": function (val) {
        this.editLogo = val ? false : true;
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.dateOfValidity = _this.formData.dateOfValidity ? _this.$moment(_this.formData.dateOfValidity).format("YYYY-MM-DD HH:mm:ss") : "";
              _this.formData.expiryDate = _this.formData.expiryDate ? _this.$moment(_this.formData.expiryDate).format("YYYY-MM-DD HH:mm:ss") : "";
              if (_this.$route.params.id && _this.formData.file) delete _this.formData.file;
              var response = await _this.$store.dispatch('$_editTicketVoucher/editTicket', _this.formData);
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
      handleFileUpload(e) {
        var size = parseFloat(this.$refs.file.files[0].size / 1024).toFixed(2);
        if (size < 1024) {
          this.formData.file = this.$refs.file.files[0];
          if (this.formData.file) {
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = e => {
              // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
              // Read image as base64 and set to imageData
              this.avatarUrl = e.target.result;
            };
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(this.formData.file);
          } else {
            this.formData.file = null;
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
      deleteLogo: _.debounce(async function () {
        var _this = this;
        _this.formData.file = null;
        _this.avatarUrl = "";
        if (_this.$route.params.id) await _this.updateLogo();
      }, 500),
      updateLogo: _.debounce(async function () {
        var _this = this;
        _this.uploadProcessing = true;
        var data = {
          id: _this.$route.params.id,
          file: _this.formData.file
        }
        try {
          var response = await _this.$store.dispatch('$_editTicketVoucher/updateLogo', data);
          new PNotify({
            title: '',
            text: _this.$t('saveSuccessfully'),
            addclass: 'bg-success'
          });
        } catch (error) {
          console.log(error);
        }
        _this.uploadProcessing = false;
      }, 500),
      checkExit(val = '') {
        var _this = this;
        if (val != '') {
          var exits = _.indexOf(_this.formData.displayFields, val);
          return exits != -1 ? true : false;
        }
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editTicketVoucher";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("ticket.titleEdit"));
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editTicketVoucher/getTicket', _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentTicketTracking);
      }
      _this.avatarUrl = _this.formData.imageUrl ? _this.formData.imageUrl : '';
    },
  };
</script>
