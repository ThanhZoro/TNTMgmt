<template>
  <div>
    <title-bar :langTitle="$t('screen.leadList')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('leadList.importLead')}}</h5>
        <div class="heading-elements">
          <router-link to="/lead" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">
                <div :class="`form-group ${errors.has('staffInCharge') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('staffInCharge')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.staffInCharge"
                               clearable
                               remote
                               :placeholder="$t('choose')"
                               v-validate="'required'"
                               name="staffInCharge"
                               :remote-method="filterUsers"
                               style="width:100%"
                               reserve-keyword
                               filterable
                               @focus="filterUsers('')">
                      <el-option v-for="item in users"
                                 :key="item.id"
                                 :label="item.fullName+' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('supportStaff')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.supportStaff"
                               clearable
                               remote
                               multiple
                               :placeholder="''"
                               :remote-method="filterUsers"
                               style="width:100%"
                               collapse-tags
                               reserve-keyword
                               filterable
                               @focus="filterUsers('')">
                      <el-option v-for="item in users"
                                 :key="item.id"
                                 :label="item.fullName+' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div :class="`form-group ${errors.has('file') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('chooseFile')}} *</label>
                  <div class="col-lg-10">
                    <input type="file" v-validate="'required'" name="file" class="form-control" id="file" ref="file" v-on:change="handleFileUpload()" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2"></label>
                  <div class="col-lg-10">
                    <a @click="getTemplate" class="blue--text" style="border-bottom: solid 1px #61c3fa;">{{$t('textExcel')}}</a>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/lead" class="btn btn-default">
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
        loading: false,
        formData: {
          staffInCharge: '',
          supportStaff: [],
          file: null,
        }
      };
    },
    computed: {
      ...mapGetters({
        users: '$_importLead/listUser',
      }),
      ...mapState({
        searchUser: state => state.$_importLead.users,
        lang: state => state.language.language,
        userId: state => state.auth.userInfo.profile.sub,
      })
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_importLead";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch(
        "common/setTitle",
        _this.$t("leadList.importLead")
      );
      _this.formData.staffInCharge = _this.userId;
    },
    methods: {
      handleFileUpload(e) {this.formData.file = this.$refs.file.files[0];},
      filterUsers: function (query) { this.searchUser.description = query; },
      async getTemplate() {
        let _this = this;
        await _this.$store.dispatch('$_importLead/getTemplate', _this.lang);
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              await _this.$store.dispatch('$_importLead/importLead', _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('importSuccess'),
                addclass: 'bg-success'
              });
              this.formData.file = null;
              document.getElementById('file').value = '';
            } catch (error) {
              console.log(error);
              _this.loading = false;
            }
          }
        });
        _this.loading = false;
      }, 500)
    }
  };
</script>
