<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('leadsPage.updateLead') : $t('leadsPage.createLead')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('leadsPage.updateLead') : $t('leadsPage.createLead')}}</h5>
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

                <div :class="`form-group ${errors.has('fullName') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.fullName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="fullName" v-validate="(leadRequire.indexOf('fullName') != -1) ? 'required' : ''" :placeholder="$t('leadsPage.fullName')" :data-vv-as="$t('leadsPage.fullName')" class="form-control" v-model="formData.fullName">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('phone') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.phone')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="phone" v-validate="(leadRequire.indexOf('phone') != -1) ? 'required' : ''" :placeholder="$t('leadsPage.phone')" :data-vv-as="$t('leadsPage.phone')" class="form-control" v-model="formData.phone">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('email') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.email')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="email" :placeholder="$t('leadsPage.email')" :data-vv-as="$t('leadsPage.email')" v-validate="(leadRequire.indexOf('email') != -1) ? 'required|email' : 'email'" class="form-control" v-model="formData.email">
                  </div>
                </div>
                <!--Status-->
                <div :class="`form-group ${errors.has('status') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.status')}} </label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.status"
                               filterable
                               clearable
                               remote
                               name="status"
                               v-validate="(leadRequire.indexOf('status') != -1) ? 'required' : ''"
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in getMasterData.status"
                                 :key="i"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!--Source-->
                <div :class="`form-group ${errors.has('source') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.source')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.source"
                               filterable
                               clearable
                               remote
                               name="source"
                               v-validate="(leadRequire.indexOf('source') != -1) ? 'required' : ''"
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in getMasterData.source"
                                 :key="i"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!--Channel-->
                <div :class="`form-group ${errors.has('channel') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.channel')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.channel"
                               filterable
                               clearable
                               remote
                               name="channel"
                               v-validate="(leadRequire.indexOf('channel') != -1) ? 'required' : ''"
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in getMasterData.channel"
                                 :key="i"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group" v-if="!formUpdate">
                  <label class="control-label col-lg-2">{{$t('screen.team')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.teamId"
                               filterable clearable remote reserve-keyword
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="(item, i) in team"
                                 :key="i"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!--StaffInCharge-->
                <div class="form-group" v-if="!formUpdate">
                  <label class="control-label col-lg-2">{{$t('leadsPage.staffInCharge')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.staffInCharge"
                               filterable clearable remote reserve-keyword
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="(item, i) in users"
                                 :key="i"
                                 :label="item.firstName + ' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.supportStaff')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.supportStaff"
                               filterable
                               clearable
                               remote
                               collapse-tags
                               multiple
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in getMasterData.users" v-if="item.id != formData.staffInCharge"
                                 :key="i"
                                 :label="item.firstName + ' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </fieldset>
              <fieldset class="content-group">
                <legend class="text-bold">{{$t('moreInfo')}}</legend>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.interest')}}</label>
                  <div class="col-lg-10">
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
                      <button type="button" class="btn btn-default btn-icon" @click="showInput('I')"><i class="icon-add"></i></button>
                    </el-tooltip>
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.note')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="note" :placeholder="$t('leadsPage.note')" class="form-control" v-model="formData.note">
                  </div>
                </div>

                <!--Gender-->
                <div :class="`form-group ${errors.has('gender') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.gender')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.gender"
                               filterable
                               clearable
                               remote
                               name="gender"
                               v-validate="(leadRequire.indexOf('gender') != -1) ? 'required' : ''"
                               :placeholder="$t('choose')"
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

                <!--Birthday-->
                <div :class="`form-group ${errors.has('birthday') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.birthday')}}</label>
                  <div class="col-lg-10">
                    <el-date-picker name="birthday" v-validate="(leadRequire.indexOf('birthday') != -1) ? 'required' : ''" style="width:100%" :placeholder="$t('leadsPage.birthday')" v-model="formData.birthday" type="date" format="dd/MM/yyyy">></el-date-picker>
                  </div>
                </div>

                <!--Address-->
                <div :class="`form-group ${errors.has('address') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('leadsPage.address')}}</label>
                  <div class="col-lg-10">
                    <input name="address" class="form-control" :placeholder="$t('placeHolderAddress')" type="text" v-validate="(leadRequire.indexOf('address') != -1) ? 'required' : ''" v-model="formData.address" v-gmaps-searchbox:Address.formatted_address=vm>
                  </div>
                </div>

                <!--IdentityCard-->
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.identityCard')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="identityCard" :placeholder="$t('leadsPage.identityCard')" class="form-control" v-model="formData.identityCard">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.dateOfIssue')}}</label>
                  <div class="col-lg-10">
                    <el-date-picker name="dateOfIssue" style="width:100%" :placeholder="$t('leadsPage.dateOfIssue')" v-model="formData.dateOfIssue" type="date" format="dd/MM/yyyy">></el-date-picker>
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.placeOfIssue')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="placeOfIssue" :placeholder="$t('leadsPage.placeOfIssue')" class="form-control" v-model="formData.placeOfIssue" />
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.maritalStatus')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.maritalStatus"
                               filterable
                               clearable
                               remote
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
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
                  <div class="col-lg-10">
                    <el-select v-model="formData.relationship"
                               filterable
                               clearable
                               remote
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
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
                  <div class="col-lg-10">
                    <input type="text" name="socialId" :placeholder="$t('leadsPage.socialId')" class="form-control" v-model="formData.socialId">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.vocative')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.vocative"
                               filterable
                               clearable
                               remote
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
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
                  <div class="col-lg-10">
                    <input type="text" name="campaign" :placeholder="$t('leadsPage.campaign')" class="form-control" v-model="formData.campaign">
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
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {
          interest: [],
          staffInCharge: ""
        },
        loading: false,
        inputVisibleI: false,
        buttonVisibleI: true,
        inputValueI: "",
        formUpdate: false,
        columns: [
          "FullName",
          "Phone",
          "Email",
          "Status",
          "Source",
          "Channel",
          "StaffInCharge",
          "SupportStaff",
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
          "Note",
          "TeamId"
        ],
        vm: {
          Address: {}
        },
        users: []
      };
    },
    computed: {
      ...mapGetters({
        currentLead: "$_editLead/currentLead",
        getMasterData: "$_editLead/getMasterData",
        getTeam: "$_editLead/getTeam"
      }),
      ...mapState({
        currentUserId: state => state.auth.userInfo.profile.sub,
        leadRequire: state => state.common.companyInfo.otherSettings.leadRequire,
        advanceFilter: state => state.$_editLead.advanceFilter,
        team: state => state.$_editLead.team
      })
    },
    watch: {
      "vm.Address.formatted_address": function (val) {
        this.formData.address = val;
      },
      "formData.teamId": function (val) {
        var _this = this;
        _this.users = _.cloneDeep(_this.getMasterData.users);
        if (val) {
          _this.formData.staffInCharge = "";
          _this.users = _.filter(_this.users, (o) => { return _.indexOf(o.teamIds, val) > -1 });
        }
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editLead";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.advanceFilter.choosenFilter.push({ searchType: 'checkbox', data: _this.getTeam, field: 'id' });
      await _this.$store.dispatch("$_editLead/getTeam");
      _this.formData.staffInCharge = _.cloneDeep(_this.currentUserId);
      _this.users = _.cloneDeep(_this.getMasterData.users);
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.columns = _this.$route.params.id ? _this.columns : [];
              let response = _this.$route.params.id ? await _this.$store.dispatch("$_editLead/updateLead", _this.formData) : await _this.$store.dispatch("$_editLead/createLead", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/lead");
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
      }
    }
  };
</script>
