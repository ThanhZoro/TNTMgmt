<template>
  <div>
    <fieldset class="content-group">
      <div class="pull-right mb-15">
        <button class="btn btn-primary" @click="validateBeforeSubmit()" :disabled="errors.items.length > 0 || loading || !disabled.edit">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
      </div>
      <div class="row">
        <div class="col-md-12" v-if="type == 'generalInfo'">
          <div :class="`form-group ${errors.has('fullName') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.fullName')}} </label>
            <div class="col-lg-10 mb-20">
              <input type="text" :disabled="!disabled.edit" v-validate="(leadRequire.indexOf('fullName') != -1) ? 'required' : ''" name="fullName" :placeholder="$t('leadsPage.fullName')" :data-vv-as="$t('leadsPage.fullName')" class="form-control" v-model="formData.fullName">
            </div>
          </div>

          <div :class="`form-group  ${errors.has('phone') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.phone')}} </label>
            <div class="col-lg-10 mb-20">
              <input type="text" :disabled="!disabled.edit" name="phone" v-validate="(leadRequire.indexOf('phone') != -1) ? 'required' : ''" :placeholder="$t('leadsPage.phone')" :data-vv-as="$t('leadsPage.phone')"  class="form-control" v-model="formData.phone">
            </div>
          </div>

          <div :class="`form-group ${errors.has('email') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.email')}} </label>
            <div class="col-lg-10 mb-20 ">
              <input type="text" :disabled="!disabled.edit" name="email" :placeholder="$t('leadsPage.email')" :data-vv-as="$t('leadsPage.email')" v-validate="(leadRequire.indexOf('phone') != -1) ? 'required|email' : 'email'" class="form-control" v-model="formData.email">
            </div>
          </div>

          <div :class="`form-group ${errors.has('status') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.status')}} </label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.status"
                         filterable
                         clearable
                         remote
                         name="status"
                         v-validate="(leadRequire.indexOf('status') != -1) ? 'required' : ''"
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.status"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div :class="`form-group ${errors.has('source') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.source')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.source"
                         filterable
                         clearable
                         remote
                         name="source"
                         v-validate="(leadRequire.indexOf('source') != -1) ? 'required' : ''"
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.source"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div :class="`form-group ${errors.has('channel') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.channel')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.channel"
                         filterable
                         clearable
                         remote
                         name="channel"
                         v-validate="(leadRequire.indexOf('channel') != -1) ? 'required' : ''"
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.channel"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group ">
            <label class="control-label col-lg-2">{{$t('leadsPage.staffInCharge')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.staffInCharge"
                         filterable clearable remote reserve-keyword
                         :placeholder="$t('choose')"
                         style="width:100%"
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.users"
                           :key="i"
                           :label="item.firstName + ' | ' + item.userName"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.supportStaff')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.supportStaff"
                         filterable
                         clearable
                         remote
                         collapse-tags
                         multiple
                         :placeholder="''"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.users" v-if="item.id != formData.staffInCharge"
                           :key="i"
                           :label="item.firstName + ' | ' + item.userName"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="col-md-12" v-if="type == 'moreInfo'">
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.interest')}}</label>
            <div class="col-lg-10 mb-20">
              <el-tag v-for="(tag,i) in formData.interest" :key="i"
                      closable
                      :disable-transitions="false"
                      @close="handleClose('I',tag)"
                      class="mb-5">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag"
                        v-if="inputVisibleI"
                        v-model="inputValueI"
                        ref="saveTagInputI"
                        size="medium"
                        style="width:100% !important;margin-left:0px"
                        @keyup.enter.native="handleInputConfirm('I')"
                        @blur="handleInputConfirm('I')">
              </el-input>
              <el-tooltip v-if="buttonVisibleI" :content="$t('leadsPage.addInterest')" placement="top" effect="dark">
                <button type="button" :disabled="!disabled.edit" class="btn btn-default btn-icon" @click="showInput('I')"><i class="icon-add"></i></button>
              </el-tooltip>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.note')}}</label>
            <div class="col-lg-10 mb-20">
              <input type="text" :disabled="!disabled.edit" name="note" :placeholder="$t('leadsPage.note')" class="form-control" v-model="formData.note">
            </div>
          </div>

          <div :class="`form-group ${errors.has('gender') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.gender')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.gender"
                         filterable
                         clearable
                         remote
                         name="gender"
                         v-validate="(leadRequire.indexOf('gender') != -1) ? 'required' : ''"
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.gender"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div :class="`form-group ${errors.has('birthday') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.birthday')}}</label>
            <div class="col-lg-10 mb-20">
              <el-date-picker name="birthday" v-validate="(leadRequire.indexOf('birthday') != -1) ? 'required' : ''" style="width:100%" :placeholder="$t('leadsPage.birthday')" v-model="formData.birthday" type="date" format="dd/MM/yyyy" :disabled="!disabled.edit"></el-date-picker>
            </div>
          </div>

          <div :class="`form-group ${errors.has('address') ? 'has-error' : ''}`">
            <label class="control-label col-lg-2">{{$t('leadsPage.address')}}</label>
            <div class="col-lg-10 mb-20">
              <input name="address" :disabled="!disabled.edit" class="form-control" :placeholder="$t('placeHolderAddress')" type="text" v-validate="(leadRequire.indexOf('address') != -1) ? 'required' : ''" v-model="formData.address" v-gmaps-searchbox:Address.formatted_address=vm>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.identityCard')}}</label>
            <div class="col-lg-10 mb-20">
              <input type="text" :disabled="!disabled.edit" name="identityCard" :placeholder="$t('leadsPage.identityCard')" class="form-control" v-model="formData.identityCard">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.dateOfIssue')}}</label>
            <div class="col-lg-10 mb-20">
              <el-date-picker name="dateOfIssue" :disabled="!disabled.edit" style="width:100%" :placeholder="$t('leadsPage.dateOfIssue')" v-model="formData.dateOfIssue" type="date" format="dd/MM/yyyy"></el-date-picker>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.placeOfIssue')}}</label>
            <div class="col-lg-10 mb-20">
              <input type="text" :disabled="!disabled.edit" name="placeOfIssue" :placeholder="$t('leadsPage.placeOfIssue')" class="form-control" v-model="formData.placeOfIssue" />
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.maritalStatus')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.maritalStatus"
                         filterable
                         clearable
                         remote
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.maritalStatus"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.relationship')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.relationship"
                         filterable
                         clearable
                         remote
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.relationship"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.socialId')}}</label>
            <div class="col-lg-10 mb-20">
              <input type="text" name="socialId" :disabled="!disabled.edit" :placeholder="$t('leadsPage.socialId')" class="form-control" v-model="formData.socialId">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.vocative')}}</label>
            <div class="col-lg-10 mb-20">
              <el-select v-model="formData.vocative"
                         filterable
                         clearable
                         remote
                         :placeholder="$t('choose')"
                         style="width:100%"
                         reserve-keyword
                         :disabled="!disabled.edit">
                <el-option v-for="(item, i) in getMasterData.vocative"
                           :key="i"
                           :label="item.dataValue"
                           :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-lg-2">{{$t('leadsPage.campaign')}}</label>
            <div class="col-lg-10 mb-20">
              <input type="text" name="campaign" :disabled="!disabled.edit" :placeholder="$t('leadsPage.campaign')" class="form-control" v-model="formData.campaign">
            </div>
          </div>
        </div>
        <div class="pull-right " style="margin-top:0px;margin-right:10px">
          <button class="btn btn-primary" @click="validateBeforeSubmit()" :disabled="errors.items.length > 0 || loading || !disabled.edit">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
    </fieldset>    
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  export default {
    components: {
    },
    data() {
      return {
        formData: { interest: []},
        loading: false,
        inputVisibleI: false,
        buttonVisibleI: true,
        inputValueI: "",
        formUpdate: false,
        columnsGeneral: [
          "FullName",
          "Phone",
          "Email",
          "Status",
          "Source",
          "Channel",
          "StaffInCharge",
          "SupportStaff",
        ],
        columnsMore: [
          "Interest",
          "Gender",
          "Birthday",
          "Address",
          "IdentityCard",
          "DateOfIssue",
          "PlaceOfIssue",
          "MaritalStatus",
          "Relationship",
          "SocialId",
          "Vocative",
          "Campaign",
          "Note"
        ],
        vm: {
          Address: {}
        }
      };
    },
    computed: {
      ...mapGetters({
        getMasterData: "$_leadInfo/getMasterData",
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        lead: state => state.$_leadInfo.lead,
        currentUserId: state => state.auth.userInfo.profile.sub,
        leadRequire: state => state.common.companyInfo.otherSettings.leadRequire,
      }),
      disabled() {
        return this.currentUser.accessRight.lead;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_leadInfo";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.$route.params.id) {
        await _this.$store.dispatch("$_leadInfo/getLead", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.lead);
      }
    },
    watch: {
      "vm.Address.formatted_address": function (val) {
        this.formData.address = val;
      },
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.columns = _this.type == "generalInfo" ? _this.columnsGeneral : _this.columnsMore;
              let response =await _this.$store.dispatch("$_leadInfo/updateLead", _this.formData) ;
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
      handleClose(type, tag) {
        if (type == "I") {
          this.formData.interest.splice(this.formData.interest.indexOf(tag), 1);
        }
      },

      showInput(type) {
        if (type == "I") {
          this.inputVisibleI = true;
          this.buttonVisibleI = false;
          this.$nextTick(_ => {
            this.$refs.saveTagInputI.$refs.input.focus();
          });
        }
      },
      handleInputConfirm(type) {
        if (type == "I") {
          let inputValueI = this.inputValueI;
          if (inputValueI) {
            this.formData.interest.push(inputValueI);
          }
          this.inputValueI = "";
          this.inputVisibleI = false;
          this.buttonVisibleI = true;
        }
      },
    },
    props: ["type"]
  };
</script>
