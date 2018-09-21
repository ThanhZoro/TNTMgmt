<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('contact.update') : $t('contact.create')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('contact.update') : $t('contact.create')}}</h5>
        <div class="heading-elements">
          <router-link :to="`/lead/contact/${$route.params.leadId}`" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">

                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.fullName')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :disabled="!disabled.edit" v-validate="'required'" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.phone')}} </label>
                  <div class="col-lg-10">
                    <input type="text" name="phone" :disabled="!disabled.edit" class="form-control" v-model="formData.phone">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('email') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.email')}} </label>
                  <div class="col-lg-10">
                    <input type="text" name="email" :disabled="!disabled.edit" v-validate="'email'" class="form-control" v-model="formData.email">
                  </div>
                </div>
                <div class="form-group ">
                  <label class="control-label col-lg-2">{{$t('userList.position')}} </label>
                  <div class="col-lg-10">
                    <input type="text" name="relationship" :disabled="!disabled.edit" class="form-control" v-model="formData.relationship">
                  </div>
                </div>
              </fieldset>
              <fieldset class="content-group">
                <div class="row">
                  <label class="control-label col-lg-2">{{$t('company.logo')}}</label>
                  <div class="col-md-10">
                    <img class="img-responsive" :src="avatarUrl" style="width:300px" />
                    <input class="hidden" type="file" id="file" ref="file" v-on:change="handleFileUpload()">
                    <div style="margin-top:10px">
                      <el-tooltip class="item" effect="dark" :content="$t('chooseFile')" placement="top">
                        <button :disabled="uploadProcessing || !disabled.edit"  class="btn btn-default btn-icon btn-xs" @click="chooseFile"><i class="icon-image2"></i></button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="$t('saveImage')" placement="top">
                        <button v-show="$route.params.id" :disabled="uploadProcessing || !disabled.edit" class="btn btn-default btn-icon btn-xs" @click="updateLogo"><i class="icon-checkmark3 "></i></button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="$t('deleteImage')" placement="top">
                        <button :disabled="uploadProcessing || !disabled.edit" class="btn btn-default btn-icon btn-xs" @click="deleteLogo"><i class="icon-trash "></i></button>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

        </div>
        <div class="text-right mt-30">
          <router-link :to="`/lead/contact/${$route.params.leadId}`" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import commonData from "@/utils/common-data";
  import TitleBar from "components/common/titleBar";
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      "title-bar": TitleBar,
      VueEditor
    },
    data() {
      return {
        formData: {
          file: null,
          leadId: this.$route.params.leadId
        },
        loading: false,
        uploadProcessing: false,
        file: null,
        avatarUrl: ''
      };
    },
    computed: {
      ...mapState({
        contact: state => state.$_editContact.contact,
      }),
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.lead;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editContact";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.$route.params.id) {
        await _this.$store.dispatch("$_editContact/getInfoId", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.contact);
        _this.avatarUrl = _this.formData.avatarUrl ? _this.formData.avatarUrl : '';
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              await _this.$store.dispatch("$_editContact/updateContact", _this.formData);
              _this.$router.go(-1);
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
      handleFileUpload(e) {
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
      },
      chooseFile() {
        this.$refs.file.click();
      },
      deleteLogo: _.debounce(async function () {
        var _this = this;
        _this.formData.file = null;
        _this.avatarUrl = "";
      }, 500),
      updateLogo: _.debounce(async function () {
        var _this = this;
        _this.uploadProcessing = true;
        var data = {
          id: _this.$route.params.id,
          file: _this.formData.file
        }
        try {
          var response = await _this.$store.dispatch('$_editContact/updateLogo', data);
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
    }
  };
</script>
