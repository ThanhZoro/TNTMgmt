<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('assignmentPlanEdit.update') : $t('assignmentPlanEdit.create')"></title-bar>
    <div class="content">
      <div>
        <div class="panel-heading">
          <h5 class="panel-title paddingLeft-11">{{$route.params.id ? $t('assignmentPlanEdit.update') : $t('assignmentPlanEdit.create')}}</h5>
          <div class="heading-elements paddingRight-11">
            <router-link to="/assignmentPlan" class="btn btn-default">
              {{$t('back')}}
            </router-link>
            <button type="button" :disabled="!disabled.assignmentdelete" size="medium" class="btn bg-slate-400" v-if="$route.params.id" @click="deleteAssignmentPlan($route.params.id)">
              {{$t('delete')}}
            </button>
            <button class="btn btn-primary" :disabled="errors.items.length > 0 || loading || !disabled.assignmentedit" @click="validateBeforeSubmit()">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
          </div>
        </div>
        <div class="panel-body">
          <div class="col-md-6">
            <div class="panel panel-body">
              <fieldset class="content-group">
                <legend class="text-semibold" style="padding-bottom:24px">{{$t('leadList.generalInfo')}}</legend>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                        <label class="control-label">{{$t('assignmentPlanEdit.calendarName')}} * </label>
                        <input type="text" :disabled="!disabled.assignmentedit" v-model="formData.name" class="form-control" name="name" :placeholder="$t('assignmentPlanEdit.calendarNamePlaceholder')" v-validate="'required'">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div :class="`form-group `">
                        <label class="control-label">{{$t('assignmentPlanEdit.ccMailLabel')}}</label>
                        <input type="text" :disabled="!disabled.assignmentedit" v-model="formData.ccMail" name="email" data-vv-as="Email"  class="form-control" :placeholder="$t('assignmentPlanEdit.ccMailPlaceholder')">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div class="form-group has-feedback">
                        <label class="control-label">{{$t('assignmentPlanEdit.ruleRevoke')}}</label>
                        <el-select v-model="formData.revokeCons" :placeholder="$t('choose')" :disabled="!disabled.assignmentedit" style="width:100%">
                          <el-option v-for="(item,i) in commonData.ruleRevole"
                                     :key="item.i"
                                     :label="$t(item.value)"
                                     :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div :class="`form-group ${errors.has('number-frequency') ? 'has-error' : ''}`">
                        <label class="control-label">{{$t('assignmentPlanEdit.frequent')}} * &nbsp;&nbsp;</label>
                        <el-tooltip placement="top" effect="dark" class="">
                          <div slot="content">{{$t('rulesMinute')}}<br>{{$t('rulesHour')}}</div>
                          <span class="pointer"> <i class="icon-question3"></i></span>
                        </el-tooltip>
                        <input type="text" :disabled="!disabled.assignmentedit" v-if="formData.frequentType == 'minutes'" v-model="formData.frequent" name="number-frequency" v-validate="'required|numeric|max_value:59'" class="form-control">
                        <input type="text" :disabled="!disabled.assignmentedit" v-else-if="formData.frequentType == 'hours'" v-model="formData.frequent" name="number-frequency" v-validate="'required|numeric|max_value:23'" class="form-control">
                        <input type="text" :disabled="!disabled.assignmentedit" v-else v-model="formData.frequent" name="number-frequency" v-validate="'required|numeric'" class="form-control">
                        <div class="form-control-feedback" style="width: 90px ;margin-top: 2px;">
                          <el-select v-model="formData.frequentType" :disabled="!disabled.assignmentedit" :placeholder="$t('conversion.type')" class="border-left-none-select">
                            <el-option v-for="(item,i) in commonData.time"
                                       :key="item.i"
                                       :label="$t(item.value)"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <label class="control-label">{{$t('assignmentPlanEdit.startTime')}}  *</label>
                    <div class="form-group has-feedback">
                      <div :class="`form-group ${errors.has('number-start-hours') ? 'has-error' : ''}`" style="width:49% ;float:left">
                        <input type="text" :disabled="!disabled.assignmentedit" v-model="formData.startTime" name="number-start-hours" v-validate="'required|numeric|min_value:0|max_value:23'" class="form-control">
                        <div class="form-control-feedback">
                          {{$t('hours')}}
                        </div>
                      </div>
                      <div :class="`form-group ${errors.has('number-start-minutes') ? 'has-error' : ''}`" style="width:49% ; float:right">
                        <input type="text" :disabled="!disabled.assignmentedit" v-model="formData.startMins" name="number-start-minutes" v-validate="'required|numeric|min_value:0|max_value:59'" class="form-control">
                        <div class="form-control-feedback">
                          {{$t('minutes')}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <label class="control-label">{{$t('assignmentPlanEdit.endTime')}} *</label>
                    <div class="form-group has-feedback">
                      <div :class="`form-group ${errors.has('number-end-hours') ? 'has-error' : ''}`" style="width:49% ;float:left">
                        <input type="text" :disabled="!disabled.assignmentedit" v-model="formData.endTime" name="number-end-hours" v-validate="'required|numeric|min_value:0|max_value:23'" class="form-control">
                        <div class="form-control-feedback">
                          {{$t('hours')}}
                        </div>
                      </div>
                      <div :class="`form-group ${errors.has('number-end-minutes') ? 'has-error' : ''}`" style="width:49% ; float:right">
                        <input type="text" :disabled="!disabled.assignmentedit" v-model="formData.endMins" name="number-end-minutes" v-validate="'required|numeric|min_value:0|max_value:59'" class="form-control">
                        <div class="form-control-feedback">
                          {{$t('minutes')}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div :class="`form-group ${errors.has('number-revoke') ? 'has-error' : ''}`">
                        <label class="control-label">{{$t('assignmentPlanEdit.revokeTime')}} * &nbsp;&nbsp;</label>
                        <el-tooltip placement="top" effect="dark" class="">
                          <div slot="content">{{$t('rulesMinute')}}<br>{{$t('rulesHour')}}</div>
                          <span class="pointer"> <i class="icon-question3"></i></span>
                        </el-tooltip>
                        <input type="text" :disabled="!disabled.assignmentedit" v-if="formData.revokeType == 'minutes'" v-model="formData.revoke" name="number-revoke" v-validate="'required|numeric|max_value:59'" class="form-control">
                        <input type="text" :disabled="!disabled.assignmentedit" v-else-if="formData.revokeType == 'hours'" v-model="formData.revoke" name="number-revoke" v-validate="'required|numeric|max_value:23'" class="form-control">
                        <input type="text" :disabled="!disabled.assignmentedit" v-else v-model="formData.revoke" name="number-revoke" v-validate="'required|numeric'" class="form-control">
                        <div class="form-control-feedback" style="width: 90px ;margin-top: 2px;">
                          <el-select v-model="formData.revokeType" :disabled="!disabled.assignmentedit" :placeholder="$t('conversion.type')" class="border-left-none-select">
                            <el-option v-for="(item,i) in commonData.time"
                                       :key="item.i"
                                       :label="$t(item.value)"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div :class="`form-group ${errors.has('trackingId') ? 'has-error' : ''}`">
                        <label class="control-label">{{$t('assignmentPlan.tracking')}} *</label>
                        <el-select v-model="formData.trackingId"
                                   filterable
                                   clearable
                                   remote
                                   reserve-keyword
                                   :placeholder="$t('choose')"
                                   :remote-method="filterTracking"
                                   style="width:100%"
                                   name="trackingId"
                                   v-validate="'required'"
                                   :disabled="!disabled.assignmentedit">
                          <el-option v-for="item in tracking"
                                     :key="item.id"
                                     :label="item.name"
                                     :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group has-feedback">
                      <div class="form-group has-feedback">
                        <label class="control-label">{{$t('assignmentPlan.trackingType')}}</label>
                        <el-select v-model="formData.trackingType"
                                   multiple
                                   filterable
                                   remote
                                   reserve-keyword
                                   style="width:100%;"
                                   :placeholder="''"
                                   collapse-tags
                                   :disabled="!disabled.assignmentedit">
                          <el-option v-for="(item,i) in commonData.trackingType"
                                     :key="i"
                                     :label="item.value"
                                     :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="col-md-6">
            <div class="panel panel-body" style="padding: 10px;">
              <fieldset class="content-group " style="padding-left:10px;padding-right:10px">
                <legend class="text-semibold" style="padding-top:10px;">
                  <span>{{$t('assignmentPlanEdit.employeeList')}}</span>
                  <span class="pull-right">
                    <el-tooltip :content="$t('assignmentPlanEdit.addEmployee')" placement="top" effect="dark">
                      <button type="button" class="btn btn-default btn-icon btn-xs" @click="createNewEmployee"><i class="icon-add"></i></button>
                    </el-tooltip>
                    <el-tooltip :content="$t('deleteAll')" placement="top" effect="dark">
                      <button type="button" class="btn btn-default btn-icon btn-xs" @click="deleteAllEmployee()"><i class="icon-trash"></i></button>
                    </el-tooltip>
                  </span>
                </legend>
              </fieldset>
              <div class="row">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>{{$t('team.name')}}</th>
                        <template v-for="(item, props, index) in headers">
                          <th :key="index" v-show="item">{{$t(`assignmentPlan.${props}`)}}</th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,i) in employee">
                        <td style="min-width:180px;">
                          <el-select v-model="employee[i].teamId"
                                     filterable
                                     remote
                                     clearable
                                     reserve-keyword
                                     :placeholder="$t('team.placeHolderSearch')"
                                     :remote-method="filterTeam"
                                     @change="employee[i].userId = ''"
                                     style="width:100%"
                                     name="userId">
                            <el-option v-for="item in team"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </td>
                        <td style="min-width:180px;">
                          <el-select v-model="employee[i].userId"
                                     filterable
                                     remote
                                     reserve-keyword
                                     :placeholder="$t('assignmentPlanEdit.employeeChoose')"
                                     :remote-method="filterEmployee"
                                     style="width:100%"
                                     name="userId"
                                     @focus="filterUsers(employee[i].teamId,i)">
                            <el-option v-for="user in users"
                                       :key="user.id"
                                       :label="`${user.firstName} ${user.lastName || ''} | ${user.userName}`"
                                       :value="user.id">
                            </el-option>
                          </el-select>
                        </td>
                        <td >
                          <input type="number" style="width:90px;" v-model="employee[i].total" class="form-control" :placeholder="$t('assignmentPlanEdit.employeeQuantity')" @keyup="employee[i].total < 0 ? employee[i].total = 1 : employee[i].total" />
                        </td>
                        <td>
                          <el-tooltip :content="$t('close')" placement="top" effect="dark">
                            <i class="icon-cross pointer" style="margin-left:15px" @click="employee.splice(i, 1)"></i>
                          </el-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div style="float:right;margin-top:10px;">
              <router-link to="/assignmentPlan" class="btn btn-default">
                {{$t('back')}}
              </router-link>
              <button class="btn btn-primary" :disabled="errors.items.length > 0 || loading || !disabled.assignmentedit" @click="validateBeforeSubmit()">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
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
  import commonData from "@/utils/common-data"
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {
          trackingType: [],
          detail: [],
          revokeType: 'minutes',
          frequentType: 'minutes',
          trackingId : ""
        },
        loading: false,
        addNew: false,
        employee: [],
        users : [],
        commonData
      };
    },
    computed: {
      ...mapGetters({
        getUser: '$_assignmentPlanEdit/getUser',
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_assignmentPlanEdit.searchRequest,
        headers: state => state.$_assignmentPlanEdit.headers,
        lang: state => state.language.language,
        user: state => state.$_assignmentPlanEdit.user,
        tracking: state => state.$_assignmentPlanEdit.tracking,
        assignmentPlan: state => state.$_assignmentPlanEdit.assignmentPlan,
        team: state => state.$_assignmentPlanEdit.team,
        searchTeam: state => state.$_assignmentPlanEdit.searchTeam,
        advanceFilterTeam: state => state.$_assignmentPlanEdit.advanceFilterTeam,
        advanceFilter: state => state.$_assignmentPlanEdit.advanceFilter,
        common: state => state.common,
      }),
      disabled() {
        return this.currentUser.accessRight.auto;
      }
    },
    watch: {
      "formData.detail": function (val) {
        var _this = this;
        var ids = _.map(val, (o) => { return o.userId });
        _this.$store.dispatch("$_assignmentPlanEdit/setUserIds", ids);
      },
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_assignmentPlanEdit";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.users = _.cloneDeep(_this.getUser);
      if (_this.$route.params.id) {
        _this.advanceFilter.choosenFilter = [];
        _this.advanceFilterTeam.choosenFilter = [];
        await _this.$store.dispatch("$_assignmentPlanEdit/getAssignmentPlan", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.assignmentPlan);
        _this.employee = _.cloneDeep(_this.assignmentPlan.detail);
        var teamUser = [];
        _.forEach(_this.formData.detail, (o) => { if (o.teamUser) teamUser.push(o.teamId) });
        if (_this.formData.trackingId) {
          _this.advanceFilter.choosenFilter.push({ searchType: 'checkbox', data: [{ id: _this.formData.trackingId }], field: 'id' });
        }
        if (teamUser.length) {
          _this.advanceFilterTeam.choosenFilter.push({ searchType: 'checkbox', data: [{ id: teamUser }], field: 'id' });
        }
      }
      _this.searchTeam.description = "";
      _this.searchRequest.description = "";
      await _this.$store.dispatch("$_assignmentPlanEdit/getTracking");
      await _this.$store.dispatch("$_assignmentPlanEdit/getTeam");
      if (!_this.tracking.length) { _this.formData.trackingId = "" }
      var team = _.cloneDeep(_.map(_this.team, (o) => { return o.id }));
      _.forEach(_this.employee, (o) => { if (_.indexOf(team, o.teamId) == -1) { o.teamId = ""; } });
    },
    methods: {
      deleteAllEmployee: function () {
        var _this = this;
        if (_this.employee.length) {
          _this.$confirm(_this.$t('call.description'), _this.$t('assignmentPlanEdit.deleteAll'), {
            confirmButtonText: _this.$t('confirm'),
            cancelButtonText: _this.$t('cancel'),
          }).then(async () => {
            _this.employee = [];
          }).catch(() => {
          });
        } else {
          new PNotify({
            title: '',
            text: _this.$t('assignmentPlanEdit.noEmployee'),
            addclass: 'bg-danger'
          });
        }
      },
      filterEmployee: _.debounce(async function (val) {
        this.user.description = val;
      }, 500),
      filterTeam: _.debounce(async function (val) {
        var _this = this;
        _this.searchTeam.description = val;
        await _this.$store.dispatch("$_assignmentPlanEdit/getTeam");
      }, 500),
      filterTracking: _.debounce(async function (val) {
        var _this = this;
        _this.advanceFilter.choosenFilter = [];
        await _this.$store.dispatch("$_assignmentPlanEdit/searchRequest", val);
      }, 500),
      getNameUser: function (val) {
        var _this = this;
        var user = _.find(_this.common.users, { 'id': val });
        return user ? user.userName : '';
      },
      createNewEmployee: function () {
        var _this = this;
        if (_this.employee.length) {
          if (!_.isEmpty(_this.employee[_this.employee.length - 1]) &&
            _this.employee[_this.employee.length - 1].total >=1 &&
            _this.employee[_this.employee.length - 1].userId) {
            _this.employee.push({total: 1,userId: ''});
          }
        } else {
          _this.employee.push({ total: 1, userId: ''});
        }
        _this.users = _.cloneDeep(_this.getUser);
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.detail = _this.employee;
              let response = await _this.$store.dispatch("$_assignmentPlanEdit/editAssignmentPlan", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.go(-1);
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      deleteAssignmentPlan: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [data.name]), _this.$t('assignmentPlan.delete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          try {
            var response = await _this.$store.dispatch(
              `$_assignmentPlanEdit/deleteAssignmentPlan`,
              { ids: [data] }
            );
            if (response) {
              await _this.$store.dispatch(`$_assignmentList/getListAssignmentPlan`, response.data);
              _this.$router.push('/assignmentPlan');
            }
            new PNotify({
              title: '',
              text: _this.$t('deleteSuccess'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
          }
        }).catch(() => {
        });
      }, 500),
      filterUsers: function (val,i) {
        var _this = this;
        _this.users = _.cloneDeep(_this.getUser);
        if (val) {
          _this.users = _.filter(_this.users, (o) => { return _.indexOf(o.teamIds, val) > -1 });
        }
      }
    }
  };
</script>
