<template>
  <div>
    <title-bar :langTitle="$t('screen.updateUser')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('user.updateUser')}}</h5>
        <div class="heading-elements">
          <router-link :to="`/user/info`" class="btn btn-default">
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
              <fieldset class="content-group" v-if="formData">

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.userName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="userName" :placeholder="$t('userList.userName')" disabled class="form-control" v-model="formData.userName">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('firstName') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.firstName')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="firstName" :placeholder="$t('userList.firstName')" :data-vv-as="$t('userList.firstName')" v-validate="'required'" class="form-control" v-model="formData.firstName">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.lastName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="lastName" :placeholder="$t('userList.lastName')" class="form-control" v-model="formData.lastName">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('phone') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.phone')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="phone" :placeholder="$t('userList.phone')" :data-vv-as="$t('userList.phone')" v-validate="'required'" class="form-control" v-model="formData.phoneNumber">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.code')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="code" :placeholder="$t('userList.code')" class="form-control" v-model="formData.code">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.gender')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.gender"
                               clearable
                               remote
                               :placeholder="'Chọn'"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in getMasterData.gender"
                                 :key="i"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.department')}}</label>
                  <div class="col-lg-10">
                    <el-tag v-for="(tag,i) in formData.department" :key="i"
                            closable
                            :disable-transitions="false"
                            @close="handleClose('D',tag)"
                            class="mb-5">
                      {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag"
                              v-if="inputVisibleD"
                              v-model="inputValueD"
                              ref="saveTagInputD"
                              size="medium"
                              style="width:100% !important;margin-left:0px"
                              @keyup.enter.native="handleInputConfirm('D')"
                              @blur="handleInputConfirm('D')">
                    </el-input>
                    <el-tooltip v-if="buttonVisibleD" :content="$t('userList.addDepartment')" placement="top" effect="dark">
                      <button  class="btn btn-default btn-icon" @click="showInput('D')"><i class="icon-add"></i></button>
                    </el-tooltip>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.position')}}</label>
                  <div class="col-lg-10">
                    <el-tag v-for="(tag,i) in formData.position" :key="i"
                            closable
                            :disable-transitions="false"
                            @close="handleClose('P',tag)"
                            class="mb-5">
                      {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag"
                              v-if="inputVisibleP"
                              v-model="inputValueP"
                              ref="saveTagInputP"
                              size="medium"
                              style="width:100% !important;margin-left:0px"
                              @keyup.enter.native="handleInputConfirm('P')"
                              @blur="handleInputConfirm('P')">
                    </el-input>
                    <el-tooltip v-if="buttonVisibleP" :content="$t('userList.addPosition')" placement="top" effect="dark">
                      <button class="btn btn-default btn-icon" @click="showInput('P')"><i class="icon-add"></i></button>
                    </el-tooltip>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('address')}}</label>
                  <div class="col-lg-10">
                    <address-twin @nameAddress="getAddress" :address="formData.address"></address-twin>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link :to="`/user/info`" class="btn btn-default">
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
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  import commonData from "@/utils/common-data"
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
        listGender: commonData.listGender,
        inputVisibleD: false,
        buttonVisibleD: true,
        inputValueD: "",
        inputVisibleP: false,
        buttonVisibleP: true,
        inputValueP: "",
      };
    },
    computed: {
      ...mapGetters({
        currentUser: "$_updateAccount/currentUser",
        getMasterData: '$_updateAccount/getMasterData'
      })
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_updateAccount";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.updateUser"));
      _this.formData = _.cloneDeep(_this.currentUser);
    },
    methods: {
      getAddress: function (val) {
        this.formData.address = val;
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              await _this.$store.dispatch("$_updateAccount/updateAccount", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/user/info");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      handleClose(type, tag) {
        switch (type) {
          case "D":
            this.formData.department.splice(
              this.formData.department.indexOf(tag),
              1
            );
            break;
          case "P":
            this.formData.position.splice(this.formData.position.indexOf(tag), 1);
            break;
          default:
            break;
        }
      },

      showInput(type) {
        switch (type) {
          case "D":
            this.inputVisibleD = true;
            this.buttonVisibleD = false;
            this.$nextTick(_ => {
              this.$refs.saveTagInputD.$refs.input.focus();
            });
            break;
          case "P":
            this.inputVisibleP = true;
            this.buttonVisibleP = false;
            this.$nextTick(_ => {
              this.$refs.saveTagInputP.$refs.input.focus();
            });
            break;
          default:
            break;
        }
      },

      handleInputConfirm(type) {
        switch (type) {
          case "D":
            let inputValueD = this.inputValueD;
            if (inputValueD) {
              this.formData.department.push(inputValueD);
            }
            this.inputValueD = "";
            this.inputVisibleD = false;
            this.buttonVisibleD = true;
            break;
          case "P":
            let inputValueP = this.inputValueP;
            if (inputValueP) {
              this.formData.position.push(inputValueP);
            }
            this.inputValueP = "";
            this.inputVisibleP = false;
            this.buttonVisibleP = true;
            break;
          default:
            break;
        }
      }
    }
  };
</script>
