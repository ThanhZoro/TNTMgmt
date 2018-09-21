<template>
  <div>
    <title-bar :langTitle="$t('screen.leadList')"></title-bar>
    <div class="content" >
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('screen.leadList')}}</h5>
          <div class="heading-elements">
            <button :disabled="!disabled.export" class="el-button el-button--medium el-button--default btn fontDefault" @click="handleExportExcel" >
              {{$t('leadsPage.export')}} <i class="icon-download4" style="font-size:13px"></i>
            </button>
            <router-link :disabled="!disabled.import" class="el-button el-button--medium el-button--default btn fontDefault" to="/lead/import">
              {{$t('leadsPage.import')}} <i class="icon-upload4" style="font-size:13px"></i>
            </router-link>
            <el-dropdown @command="handleSort" trigger="click">
              <el-button size="medium" class="btn fontDefault">
                {{$t('sort.name')}} <i class="el-icon-arrow-down el-icon--right" style="font-weight: 900;"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'createdAt' && searchRequest.sort.sortOrder == 1 ) }" command='{"field": "createdAt","sortOrder":1}'>{{$t('sort.createdDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'createdAt' && searchRequest.sort.sortOrder == 0 ) }" command='{"field": "createdAt","sortOrder":0}'>{{$t('sort.createdAsc')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'updatedAt' && searchRequest.sort.sortOrder == 1 ) }" command='{"field": "updatedAt","sortOrder":1}'>{{$t('sort.updatedDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'updatedAt' && searchRequest.sort.sortOrder == 0 ) }" command='{"field": "updatedAt","sortOrder":0}'>{{$t('sort.updatedAsc')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleShowHide" trigger="click">
              <el-button size="medium" class="btn fontDefault">
                {{$t('showHideCols')}}<i class="el-icon-arrow-down el-icon--right" style="font-weight: 900;"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(item, props, index) in headers">
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t(`leadList.${props}`)}}<i v-show="item" class="el-icon-check mt-10 ml-10" style="float:right;"></i></el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link class="btn btn-primary fontDefault" to="/lead/edit"  :disabled="!disabled.edit">
              {{$t('createNew')}}
            </router-link>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <!--Search-->
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input v-model="searchRequest.description" class="form-control" v-on:keyup.enter="search()" :placeholder="$t('leadList.searchDes')">
                  <div class="form-control-feedback">
                    <i class="icon-search4"></i>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <button type="button" size="medium" class="btn btn-primary" @click="search()">
                    {{$t('search')}}
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group text-right" v-if="ids[0]">
                  <button type="button" size="medium" :disabled="!disabled.edit" class="btn btn-danger" @click="showChangeInfo(null,'assignment')">
                    {{$t('screen.assignmentPlanEdit')}}
                  </button>
                  <button type="button" size="medium" class="btn bg-slate-400" :disabled="!disabled.delete" @click="deleteLead(ids)">
                    {{$t('delete')}}
                  </button>
                </div>
              </div>
              <!--Filter-->
              <div class="col-md-12">
                <el-dropdown @command="handleChoosenfilter" placement="right-start" size="medium" trigger="click">
                  <span class="el-dropdown-link">
                    <button type="button" class="btn border-slate btn-flat">{{$t('addFilter')}}</button>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width:200px;padding-left:10px">
                    <template v-for="(item, index) in remainFilters">
                      <el-dropdown-item :command="item">{{$t('leadsPage'+'.'+item.field) }}</el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
                <span v-if="advanceFilter.choosenFilter">
                  <template v-for="(item, index) in advanceFilter.choosenFilter">
                    <span tabindex="0" class="label bg-grey-300 pointer" style="padding: 6px; margin:0px 5px 0px 10px; font-size:13px">
                      <span @click="handleChoosenfilter(item)">
                        <span v-if="item.searchType == 'checkbox' && item.field == 'gender'">
                          {{$t(item.text)}}:
                          <span v-for="(item1, index1) in item.data">
                            <span v-if="index1 < 2">{{item1.name}}<span v-show="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'checkbox' && item.field != 'gender'">
                          {{$t(item.text)}}:
                          <span v-for="(item1, index1) in item.data">
                            <span v-if="index1 < 2">{{ `"${item1.name}"`}}<span v-show="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'text'">
                          {{$t('leadsPage'+'.'+item.field)+ ': ' +item.filterText }}
                        </span>
                        <span v-if="item.searchType == 'date'">
                          {{$t('leadsPage'+'.'+item.field)}}: {{$moment(item.date[0]).format('DD/MM/YYYY')}} {{$t('goto')}} {{$moment(item.date[1]).format('DD/MM/YYYY')}}
                        </span>
                      </span>
                      <span @click="cancelFilter(item.field)">
                        <i class="icon-close2"></i>
                      </span>
                    </span>
                  </template>
                </span>
              </div>
              <div style="position:absolute;top:55px;z-index:1; width: 300px; left:150px" v-show="advanceFilter.show">
                <div class="panel panel-primary">
                  <div class="panel-heading">
                    <h6 class="panel-title">
                      {{$t(advanceFilter.showData.text)}}
                    </h6>
                    <div class="heading-elements">
                      <ul class="icons-list">
                        <li><a data-action="close" @click="advanceFilter.show = false"></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="panel-body">
                    <div v-if="advanceFilter.showData.searchType == 'checkbox'">
                      <input v-model="desFilter" class="form-control" :placeholder="$t('press')" style="margin-bottom: 10px">
                      <div v-for="(item, index) in filterData">
                        <input type="checkbox" v-model="checkedfilterData" class="custorm-checkbox" :id="item.id" :value="item.id" :title="item.name" />
                        <label :for="item.id" class="pointer label-padding break-word">{{(item.name != item.id) ? item.name : $t(item.name)}}</label>
                      </div>
                    </div>
                    <div v-if="advanceFilter.showData.searchType == 'text'">
                      <input v-model="filterText" class="form-control" v-on:keyup.enter="applyFilter">
                    </div>
                    <div v-if="advanceFilter.showData.searchType == 'date'">
                      <el-date-picker v-model="filterDate"
                                      type="daterange"
                                      align="right"
                                      unlink-panels
                                      :start-placeholder="$t('from')"
                                      :end-placeholder="$t('end')"
                                      style="width:100%"
                                      :picker-options="advanceFilter.pickerOptions"
                                      :default-time="['00:00:00', '23:59:59']">
                      </el-date-picker>
                    </div>
                    <div class="pull-right" style="margin-top:20px;">
                      <button type="button" class="btn btn-default uppercaseText" @click="cancelFilter(advanceFilter.showData.field)">{{$t('quit')}}</button>
                      <button type="button" class="btn btn-primary uppercaseText" @click="applyFilter">{{$t('apply')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!--Table-->
        </div>
        <div class="row" >
          <div class="col-md-12">
            <div class='table-cont' style="padding-top: 0px;">
              <table class="table" >
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" class="custorm-checkbox" v-model="isCheckAll" />
                    </th>
                    <template v-for="(item, props, index) in headers">
                      <template v-if="index==0 || index==2">
                        <th :key="index" v-show="item">{{$t(`leadList.${props}`)}}</th>
                        <th v-show="item"></th>
                      </template>
                      <template v-else-if="index==1">
                        <th :key="index" v-show="item">{{$t(`leadList.${props}`)}}</th>
                        <th v-if="surveyId" v-show="item"></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-show="item">{{$t(`leadList.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in leadData.data" :key="i" :value="i">
                    <td><input type="checkbox" class="custorm-checkbox" :value="item.id" v-model="ids" /></td>
                    <td v-show="headers['generalInfo']">
                      <div style="width:200px !important">
                        <router-link :to="`/lead/generalInfo/${item.id}`">
                          <span style=" font-weight: bold; color:#000" class="break-word">
                            {{item.fullName}}
                          </span>
                        </router-link>
                        <div>{{item.phone || $t('notAvailablePhone')}}</div>
                        <a :href="`mailto:${item.email }`" target="_top" class="break-word" v-if="item.email">{{item.email}}</a>
                        <span v-else class="display-block text-lv-3">{{ $t('notAvailableEmail')}}</span>
                      </div>
                    </td>
                    <td v-show="headers['generalInfo']">
                      <div class="icons-list">
                        <el-tooltip :content="$t('settings.other')" placement="top" effect="dark">
                          <router-link :to="`/lead/generalInfo/${item.id}`">
                            <i class="icon-pencil7"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                      <div class="icons-list mt-20">
                        <el-tooltip :content="$t('so.soInfo')" placement="top" effect="dark">
                          <router-link :to="`/so/header/edit/fromLead/${item.id}`">
                            <i class="icon-cart5"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-show="headers['customerCare']">
                      <div class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('leadsPage.status')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-heart6 icon-style-custom"></i></span>
                        </el-tooltip>
                        <el-dropdown class="fontDefault" trigger="click" @command="handleStatusClick" >
                          <span class="el-dropdown-link changeOnLeads">
                            <i class="icon-primitive-dot" v-if="item.statusColor" v-bind:style="{ color: item.statusColor,marginLeft: '-5px' }"></i>{{item.statusName || $t('notAvailableStatus')}}
                          </span>
                          <el-dropdown-menu slot="dropdown" class="el-popper-default" >
                            <el-dropdown-item key="itemNull"
                                              value="null"
                                              :command="{statusId: null, lead: item}" :disabled="!disabled.edit">
                              {{$t('leadList.noStatusValue')}}
                            </el-dropdown-item>
                            <el-dropdown-item v-for="(statusItem, statusKey) in getMasterData.status"
                                              :key="statusKey"
                                              :value="statusItem.id"
                                              :command="{statusId: statusItem.id, lead: item}"
                                              :disabled="!disabled.edit">
                              <i class="icon-primitive-dot" v-bind:style="{ color: statusItem.color }"></i> {{statusItem.dataValue}}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <div style="width: 200px" class="break-word pb-5" @click="showChangeInfo(item)">
                        <span>
                          <el-tooltip placement="top" effect="dark">
                            <span slot="content">{{$t('leadsPage.note')}}</span>
                            <span class="pointer" v-if="item.note && item.note.length > 23" style="float: left; padding-bottom: 20px; padding-right:15px"> <i class="icon-copy"></i></span>
                            <span class="pointer" v-else style="float: left; padding-right:15px"> <i class="icon-copy icon-style-custom"></i></span>
                          </el-tooltip>
                        </span>
                        <span slot="reference" class="pointer changeOnLeads">
                          {{item.noteContent || $t('notAvailableNote')}}
                        </span>
                      </div>
                      <div>
                        <div style="float:left">
                          <el-tooltip placement="top" effect="dark">
                            <span slot="content">{{$t('leadList.surveyLead')}}</span>
                            <span class="pointer" style="padding-right:14px"> <i class="icon-spell-check2 icon-style-custom"></i></span>
                          </el-tooltip>
                        </div>
                        <div v-if="disabled.edit">
                          <router-link :to="`/lead/survey/${item.id}`" v-if="surveyId">
                            <span v-if="item.isSuveyed">
                              {{$t('leadList.haveValueSurvey')}}
                            </span>
                            <span v-else class="text-lv-3">{{$t('leadList.notAvailableSurvey')}}</span>
                          </router-link>
                          <router-link to="/settings/config-survey" v-else>
                            <span class="text-lv-3">
                              {{$t('leadList.notAvailableSurveyTable')}}
                            </span>
                          </router-link>
                        </div>
                        <div v-else>
                          <span v-if="surveyId">
                            <span v-if="item.isSuveyed">
                              {{$t('leadList.haveValueSurvey')}}
                            </span>
                            <span v-else class="text-lv-3">{{$t('leadList.notAvailableSurvey')}}</span>
                          </span>
                          <span  v-else>
                            <span class="text-lv-3">
                              {{$t('leadList.notAvailableSurveyTable')}}
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td v-if="surveyId" v-show="headers['customerCare']">
                      <div class="icons-list" v-if="disabled.edit">
                        <el-tooltip :content="$t('leadList.surveyLead')" placement="top" effect="dark">
                          <router-link :to="`/lead/survey/${item.id}/${surveyId}`">
                            <i class="icon-spell-check2"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-show="headers['assignment']">
                      {{item.staffInChargeName || $t('leadList.notAvailableStaff')}}
                      <div>
                        <router-link :to="`/lead/history/${item.id}`">
                          <a>{{$t('leadsPage.interactive')}} </a>
                        </router-link>
                      </div>
                    </td>
                    <td v-show="headers['assignment']">
                      <div class="icons-list">
                        <el-tooltip :content="$t('leadList.assignment')" placement="top" effect="dark">
                          <a @click="showChangeInfo(item,'assignment')" v-if="disabled.edit"><i class="icon-shuffle" style="color: black !important;color:#2196f3"></i></a>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-show="headers['sourceChannel']" style="min-width: 130px !important;">
                      <div class="text-lv-1">
                        {{item.sourceName || $t('notAvailableSource')}}
                      </div>
                      <div class="text-lv-2">
                        {{item.channelName || $t('notAvailableChannel')}}
                      </div>
                    </td>
                    <td v-show="headers['onlineInfo']" >
                      <div style="min-width: 100px !important;" class="text-lv-1" v-if="!item.tid && !item.cid && !item.utmSource && !item.utmMedium && !item.utmCampaign && !item.utmTerm">
                        {{$t('notAvailable')}}
                      </div>
                      <div v-else style="min-width: 250px !important;">
                        <div class="text-lv-1">
                          {{item.tid || $t('leadList.notAvailableTID')}} | {{item.cid || $t('leadList.notAvailableCID')}}
                        </div>
                        <div class="text-lv-2">
                          {{item.utmSource || $t('leadList.notAvailableUtmSource')}} | {{item.utmMedium || $t('leadList.notAvailableUtmMedium')}}
                        </div>
                        <div class="text-lv-3">
                          {{item.utmCampaign || $t('leadList.notAvailableUtmCampaign')}} | {{item.utmTerm || $t('leadList.notAvailableUtmKeyword')}}
                        </div>
                      </div>
                    </td>
                    <td v-show="headers['create']">
                      <div class="text-lv-1" style="min-width: 150px !important;">{{(item.createdBy) ? item.createdBy : $t('notAvailable')}}</div>
                      <div class="text-lv-2" v-show="item.createdBy">{{' -- ' + item.fromNowCreate}}</div>
                    </td>
                    <td v-show="headers['update']">
                      <div class="text-lv-1"  style="min-width: 150px !important;">{{(item.updatedBy) ? item.updatedBy : $t('notAvailable')}}</div>
                      <div class="text-lv-2" v-show="item.updatedBy">{{' -- ' + item.fromNowUpdate}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <el-pagination class="ml-20"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           background
                           :current-page.sync="searchRequest.currentPage"
                           :page-sizes="[10, 20, 50]"
                           :page-size="searchRequest.pageSize"
                           layout="sizes, prev, pager, next , jumper"
                           :total="leadData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!leadData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{leadData.total}} {{$t('row')}}</div>
          </div>
        </div>
        <el-dialog :title="popup.type == 'note' ? $t('updateNote',[lead ? lead.fullName : '']) :  $t('assignmentTo',[lead ? lead.fullName : ''])"
                   :visible.sync="popup.show"
                   width="30%">
          <span>{{popup.type == 'note' ? $t('leadList.editNoteDes') : $t('assignmentPlanEdit.chooseUserAllocated')}}</span>
          <textarea rows="5"
                    cols="100"
                    :placeholder="$t('leadsPage.note')"
                    v-model="noteValue"
                    v-on:keyup.enter="changeNote(lead)"
                    v-if="popup.type == 'note'"
                    class="form-control"
                    :disabled="!disabled.edit"
                    autofocus></textarea>
          <el-select v-else v-model="staffInCharge"
                     filterable clearable remote reserve-keyword
                     :placeholder="$t('assignmentPlanEdit.chooseUserAllocated')"
                     style="width:100%"
                     :disabled="!disabled.edit">
            <el-option v-for="(item, i) in users"
                       :key="i"
                       :label="item.firstName + ' | ' + item.userName"
                       :value="item.id">
            </el-option>
          </el-select>
          <span slot="footer" v-if="popup.type != 'note'" class="dialog-footer">
            <button class="btn btn-default" @click="closePopUp">{{$t('close')}}</button>
            <button class="btn btn-primary" :disabled="!disabled.edit" @click="submitStaffInCharge(lead ? [lead.id] : ids)">{{$t('save')}}</button>
          </span>
        </el-dialog>
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
        checkedfilterData: [],
        filterText: '',
        filterDate: '',
        desFilter: '',
        ids: [],
        isCheckAll: false,
        noteValue: '',
        staffInCharge: '',
        popup: {
          show: false,
          type: ''
        },
        lead: {},
        users: null,
      };
    },
    computed: {
      ...mapGetters({
        leadData: "$_leadList/leadData",
        filterData: '$_leadList/filterData',
        remainFilters: '$_leadList/remainFilters',
        getMasterData: '$_leadList/getMasterData',
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_leadList.searchRequest,
        searchRequestTracking: state => state.$_leadList.searchRequestTracking,
        headers: state => state.$_leadList.headers,
        advanceFilter: state => state.$_leadList.advanceFilter,
        lang: state => state.language.language,
        term: state => state.common.term,
        listUser: state => state.common.users,
        surveyId: state => state.common.companyInfo.otherSettings.surveyId || ''
      }),
      disabled() {
        return this.currentUser.accessRight.lead;
      }
    },
    watch: {
      "isCheckAll": function (val) {
        var _this = this;
        _this.ids = val ? _.map(_this.leadData.data, (o) => { return o.id }) : [];
      },
      "desFilter": _.debounce(async function (val) {
        var _this = this;
        if (_this.advanceFilter.showData.field == 'trackingId') {
          _this.searchRequestTracking.description = val;
          await _this.$store.dispatch('$_leadList/getAllTracking');
        } else {
          _this.$store.dispatch('$_leadList/updateFilterCheckbox', { data: val, type: "desFilter" });
        }
      }, 200),
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_leadList";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.leadList"));
      if (_this.leadData && !_this.leadData.data) {
        await _this.$store.dispatch("$_leadList/getListLeads");
      }      
    },
    methods: {
      filter: _.debounce(async function () {
        var _this = this;
        await _this.$store.dispatch("$_leadList/getListLeads");
      }, 500),
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_leadList/getListLeads");
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_leadList/getListLeads");
      },
      handleSort: async function (sortDesc) {
        var _this = this;
        _this.searchRequest.sort = JSON.parse(sortDesc);
        await _this.$store.dispatch("$_leadList/getListLeads");
      },
      async handleShowHide(command) {
        var _this = this;
        await _this.$store.dispatch("$_leadList/showHideCols", command);
      },
      handleExportExcel: _.debounce(async function () {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.exportLead'), _this.$t('leadsPage.export'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            let response = await _this.$store.dispatch('$_leadList/exportExcel', _this.lang);
            new PNotify({
              title: '',
              text: _this.$t('saveSuccessfully'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
            new PNotify({
              title: '',
              text: _this.$t('saveFailed'),
              addclass: 'bg-danger'
            });
          }
        }).catch(() => {
        });
      }, 500),
      deleteLead: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [data.fullName]), _this.$t('leadsPage.deleteTitle'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            await _this.$store.dispatch(
              `$_leadList/deleteLead`,
              { ids: data.id ? [data.id] : data }
            );
            new PNotify({
              title: '',
              text: _this.$t('deleteSuccess'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
            new PNotify({
              title: '',
              text: _this.$t('deleteWrong'),
              addclass: 'bg-danger'
            });
          }
          _this.ids = [];
          _this.loading = false;
          _this.isCheckAll = false;
        }).catch(() => {
        });
      }, 500),
      async handleChoosenfilter(command) {
        var _this = this;
        _this.advanceFilter.show = true;
        _this.advanceFilter.showData = command;
        _this.desFilter = '';
        if (command.field == 'trackingId') {
          await _this.$store.dispatch('$_leadList/getAllTracking');
        }
        switch (command.searchType) {
          case "checkbox":
            _this.checkedfilterData = _.map(command.data, (v) => { return v.id });
          case "text":
            _this.filterText = command.filterText;
          case "date":
            _this.filterDate = command.date;
          default:
        }
      },
      async applyFilter() {
        var _this = this;
        _this.desFilter = '';
        var request = _.cloneDeep(_this.advanceFilter.showData);
        request.data = _.filter(_this.filterData, (v) => { return _this.checkedfilterData.indexOf(v.id) > -1 });
        request.filterText = _this.filterText;
        request.date = _this.filterDate;
        if ((request.searchType == "checkbox" && request.data.length > 0) || (request.searchType == "text" && request.filterText) || (request.searchType == "date" && request.date)) {
          await _this.$store.dispatch('$_leadList/updateFilterLeads', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        _this.desFilter = '';
        await _this.$store.dispatch('$_leadList/updateFilterLeads', { field: field, isDelete: true })
      },
      validateBeforeSubmit: _.debounce(async function (formData) {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              formData.columns = ["Status", "Note"];
              let response = await _this.$store.dispatch("$_leadList/updateLead", formData);
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
      handleStatusClick(command) {
        var _this = this;
        if (command.lead.status != command.statusId) {
          command.lead.status = command.statusId;
          var formData = command.lead;
          _this.validateBeforeSubmit(formData);
        }
      },
      search: _.debounce(async function () {
        await this.$store.dispatch("$_leadList/getListLeads");
      }, 500),
      handleStaffInChargeClick(command) {
        var _this = this;
        if (command.lead.staffInCharge != command.userId) {
          command.lead.staffInCharge = command.userId;
          var formData = command.lead;
          _this.validateBeforeSubmit(formData);
        }
      },
      async changeNote(item, i) {
        var _this = this;
        item.note = _this.noteValue.slice(0, _this.noteValue.length - 1);
        await _this.validateBeforeSubmit(item);
        await _this.closePopUp();
      },
      submitStaffInCharge: _.debounce(async function () {
        var _this = this;
        try {
          var data = {
            ids: _this.lead ? [_this.lead.id] : _this.ids,
            staffInCharge: _this.staffInCharge
          }
          _this.closePopUp();
          let response = await _this.$store.dispatch("$_leadList/addStaffInCharge", data);
          new PNotify({
            title: '',
            text: _this.$t('saveSuccessfully'),
            addclass: 'bg-success'
          });
        } catch (error) {
          console.log(error);
        }
      }, 500),
      showChangeInfo(item, type = "note") {
        var _this = this;
        _this.lead = item ? item : null;
        _this.popup = { show: true, type: type };
        if (type == "note") {
          _this.noteValue = item.note;
        } else {
          _this.users = _.cloneDeep(_this.listUser);
        }
      },
      closePopUp() {
        var _this = this;
        _this.popup.show = false;
        _this.noteValue = "";
        _this.users = null;
        _this.staffInCharge = "";
        if (_this.ids) { _this.ids = []; _this.isCheckAll = false; }
      },
      disabledData: function () {
        var _this = this;
        _.forEach(_this.currentUser.accessRight.lead, (value, key) => {
          _this.disabled[key] = !value;
        });
      }
    }
  };
</script>
