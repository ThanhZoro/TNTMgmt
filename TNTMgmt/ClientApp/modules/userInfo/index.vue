<template>
  <div>
    <title-bar :langTitle="$t('accountSettings')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('accountSettings')}}</h5>
        <div class="heading-elements">
          <router-link to="/" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <router-link :to="`/account`">
            <button class="btn btn-primary">{{$t('updateInfo')}}</button>
          </router-link>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">
                <div class="row" style="margin-top:-30px">
                  <div class="col-xs-12 col-md-3">
                    <div class="form-group" style="margin-top: 28px;">
                      <div>
                        <img class="img-responsive" v-if="avatarUrl" :src="avatarUrl" />
                        <img src="/images/no-image.svg" v-else style="width: 100%;height: 250px;" />
                        <input class="hidden" type="file" id="file" ref="file" v-on:change="handleFileUpload()">
                        <div style="margin-top:10px">
                          <button :disabled="uploadProcessing" class="btn btn-primary" @click="chooseFile">
                            {{$t('chooseFile')}}
                          </button>
                          <button v-show="currentUser.id" :disabled="uploadProcessing || editLogo" class="btn btn-primary" @click="updateLogo">
                            {{$t('saveImage')}} <i v-show="uploadProcessing" class="icon-spinner2 spinner position-left"></i>
                          </button>
                          <button :disabled="uploadProcessing" class="btn btn-danger" @click="deleteLogo">
                            {{$t('deleteImage')}}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-9">
                    <h2>{{(currentUser.firstName ? currentUser.firstName +' ' : '' )+ (currentUser.lastName ? currentUser.lastName : '' )}}</h2>
                    <p v-show="currentUser.address">
                      <span>{{currentUser.address}}</span>
                    </p>
                    <p>
                      <span>{{(currentUser.email ? currentUser.email +' - ' : '' ) + (currentUser.phoneNumber ? currentUser.phoneNumber : '')}}</span>
                    </p>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
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
      "title-bar": TitleBar,
    },
    data() {
      return {
        uploadProcessing: false,
        editLogo: true,
        file: null,
        avatarUrl: ''
      };
    },
    computed: {
      ...mapGetters({
        currentUser: "$_userInfo/currentUser"
      })
    },
    watch: {
      "file": function (val) {
        this.editLogo = val ? false : true;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_userInfo";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.avatarUrl = _.cloneDeep(_this.currentUser.avatarUrl);
    },
    methods: {
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
              this.avatarUrl = e.target.result;
            };
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(this.file);
          } else {
            this.file = null;
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
      updateLogo: _.debounce(async function () {
        var _this = this;
        _this.uploadProcessing = true;
        var data = {
          id: _this.currentUser.id,
          file: _this.file
        }
        try {
          var response = await _this.$store.dispatch('$_userInfo/uploadAvatar', data);
          new PNotify({
            title: '',
            text: _this.$t('saveSuccessfully'),
            addclass: 'bg-success'
          });
        } catch (error) {
          console.log(error)
        }
        _this.uploadProcessing = false;
      }, 500),
      deleteLogo: _.debounce(async function () {
        var _this = this;
        _this.file = null;
        _this.avatarUrl = "";
        _this.updateLogo();
      }, 500),
    }
  };
</script>
