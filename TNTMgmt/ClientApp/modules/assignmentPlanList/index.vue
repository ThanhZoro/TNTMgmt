<template>
  <div>
    <title-bar :langTitle="$t('screen.assignmentPlan')"></title-bar>
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('screen.assignmentPlan')}}</h5>
          <div class="heading-elements">
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
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t(`assignmentPlan.${props}`)}} <i v-if="item" class="el-icon-check mt-10 ml-10" style="float:right;"></i></el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link class="btn btn-primary fontDefault" to="/assignmentPlan/edit" :disabled="!disabled.assignmentedit">
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
                  <input v-model="searchRequest.description" class="form-control" v-on:keyup.enter="search()" :placeholder="$t('assignmentPlan.search')">
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
                  <button type="button" :disabled="!disabled.assignmentdelete" size="medium" class="btn bg-slate-400" @click="deleteAssignmentPlan(ids)">
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
                      <el-dropdown-item :command="item">{{$t('assignmentPlan'+'.'+item.field) }}</el-dropdown-item>
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
                            <span v-if="index1 < 2">{{item1.name}}<span v-if="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'checkbox' && item.field != 'gender'">
                          {{$t(item.text)}}:
                          <span v-for="(item1, index1) in item.data">
                            <span v-if="index1 < 2">{{ `"${item1.name}"`}}<span v-if="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'text'">
                          {{$t('assignmentPlan'+'.'+item.field)+ ': ' +item.filterText }}
                        </span>
                        <span v-if="item.searchType == 'date'">
                          {{$t('assignmentPlan'+'.'+item.field)}}: {{$moment(item.date[0]).format('DD/MM/YYYY')}} {{$t('goto')}} {{$moment(item.date[1]).format('DD/MM/YYYY')}}
                        </span>
                      </span>
                      <span @click="cancelFilter(item.field)">
                        <i class="icon-close2"></i>
                      </span>
                    </span>
                  </template>
                </span>
              </div>
              <div style="position:absolute;top:55px;z-index:1; width: 300px; left:150px" v-if="advanceFilter.show">
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
                      <input v-model="advanceFilter.showData.searchText" class="form-control" :placeholder="$t('press')" style="margin-bottom: 10px">
                      <div v-for="(item, index) in filterData">
                        <input type="checkbox" v-model="checkedfilterData" class="custorm-checkbox" :id="item.id" :value="item.id" :title="item.name" />
                        <label :for="item.id" class="pointer label-padding">{{(item.name != item.id) ? item.name : $t(item.name)}}</label>
                      </div>
                    </div>
                    <div v-if="advanceFilter.showData.searchType == 'text'">
                      <input v-model="filterText" class="form-control" v-on:keyup.enter="applyFilter()" :placeholder="$t('press')">
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
                      <button type="button" class="btn btn-default uppercaseText " @click="cancelFilter(advanceFilter.showData.field)">{{$t('quit')}}</button>
                      <button type="button" class="btn btn-primary uppercaseText " @click="applyFilter">{{$t('apply')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!--Table-->

        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-cont" id="table-cont">
              <table class="table" >
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" class="custorm-checkbox" v-model="isCheckAll" />
                    </th>
                    <template v-for="(item, props, index) in headers">
                      <template v-if="index==0">
                        <th :key="index" v-if="item">{{$t(`assignmentPlan.${props}`)}}</th>
                        <th v-show="item"></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-if="item">{{$t(`assignmentPlan.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in assignmentPlanData.data">
                    <td><input type="checkbox" class="custorm-checkbox" :value="item.id" v-model="ids" /></td>
                    <td v-if="headers['title']" style="min-width:180px">
                      <div >
                        <router-link :to="`/assignmentPlan/edit/${item.id}`">
                          <span class=" blue--text">{{item.name}}</span>
                        </router-link>
                        <span class="display-block">{{$t('start')}} {{item.startTime+ ':'+item.startMins}} - {{item.endTime+':'+item.endMins}} | {{item.frequent}} {{$t(item.frequentType)}}</span>
                      </div>
                    </td>
                    <td v-if="headers['title']">
                      <div>
                        <el-tooltip :content="$t('assignmentPlanEdit.update')" placement="top" effect="dark">
                          <router-link :to="`/assignmentPlan/edit/${item.id}`">
                            <i class="icon-pencil7 mb-15"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                      <div v-if="disabled.assignmentedit">
                        <el-tooltip :content="$t('assignmentPlan.delete')" placement="top" effect="dark">
                          <a @click="deleteAssignmentPlan(item)"><i class="icon-trash"></i></a>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-if="headers['revokeCons']">
                      <div style="min-width:100px">
                        <span>{{item.revokeCons ? $t(item.revokeCons) : ''}}</span>
                        <span class="display-block text-lv-3">{{$t('after')}} {{item.revoke}} <span style="text-transform:lowercase">{{$t(item.revokeType)}}</span></span>
                      </div>
                    </td>
                    <td v-if="headers['tracking']">
                      <div style="min-width:120px">
                        <span>{{item.trackingName ? item.trackingName : ''}}</span>
                        <span class="break-word display-block">
                          {{item.trackingType.length ? item.trackingType.join(',') : ''}}
                        </span>
                      </div>
                    </td>
                    <td v-if="headers['mail']">
                      <div v-if="item.ccMail">{{item.ccMail}}</div>
                    </td>
                    <td v-if="headers['create']">
                      <div style="min-width:120px">
                        <div>{{(item.createdBy) ? item.createdBy : ''}}</div>
                        <div class="text-lv-3">{{item.fromNowCreate  ? item.fromNowCreate  : $t('notAvailable')}}</div>
                      </div>
                    </td>
                    <td v-if="headers['update']">
                      <div style="min-width:120px">
                        <div>{{(item.updatedBy) ? item.updatedBy : ''}}</div>
                        <div class="text-lv-3">{{item.fromNowUpdate  ? item.fromNowUpdate  : $t('notAvailable')}}</div>
                      </div>
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
                           :total="assignmentPlanData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!assignmentPlanData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{assignmentPlanData.total}}  {{$t('row')}}</div>
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
        checkedfilterData: [],
        filterText: '',
        filterDate: '',
        description: '',
        ids: [],
        isCheckAll: false,
      };
    },
    computed: {
      ...mapGetters({
        assignmentPlanData: "$_assignmentList/assignmentPlanData",
        filterData: '$_assignmentList/filterData',
        remainFilters: '$_assignmentList/remainFilters',
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_assignmentList.searchRequest,
        headers: state => state.$_assignmentList.headers,
        advanceFilter: state => state.$_assignmentList.advanceFilter,
        lang: state => state.language.language,
      }),
      disabled() {
        return this.currentUser.accessRight.auto;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_assignmentList";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.assignmentPlan"));
      if (_this.assignmentPlanData && !_this.assignmentPlanData.data) {
        await _this.$store.dispatch("$_assignmentList/getTracking");
        await _this.$store.dispatch("$_assignmentList/getListAssignmentPlan");
      }
    },
    watch: {
      "isCheckAll": function (val) {
        var _this = this;
        _this.ids = val ? _.map(_this.assignmentPlanData.data, (o) => { return o.id }) : [];
      },
    },
    methods: {
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_assignmentList/getListAssignmentPlan");
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_assignmentList/getListAssignmentPlan");
      },
      handleSort: async function (sortDesc) {
        var _this = this;
        _this.searchRequest.sort = JSON.parse(sortDesc);
        await _this.$store.dispatch("$_assignmentList/getListAssignmentPlan");
      },
      async handleShowHide(command) {
        var _this = this;
        await _this.$store.dispatch("$_assignmentList/showHideCols", command);
      },
      async handleChoosenfilter(command) {
        var _this = this;
        _this.advanceFilter.show = true;
        _this.advanceFilter.showData = command;

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
        var request = _.cloneDeep(_this.advanceFilter.showData);
        request.data = _.filter(_this.filterData, (v) => { return _this.checkedfilterData.indexOf(v.id) > -1 });
        request.filterText = _this.filterText;
        request.date = _this.filterDate;
        if ((request.searchType == "checkbox" && request.data.length > 0) || (request.searchType == "text" && request.filterText) || (request.searchType == "date" && request.date)) {
          await _this.$store.dispatch('$_assignmentList/updateFilterAttribution', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        await _this.$store.dispatch('$_assignmentList/updateFilterAttribution', { field: field, isDelete: true })
      },
      deleteAssignmentPlan: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [data.name]), _this.$t('assignmentPlan.delete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          try {
            await _this.$store.dispatch(
              `$_assignmentList/deleteAssignmentPlan`,
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
          _this.isCheckAll = false;
        }).catch(() => {
        });
      }, 500),
      search: _.debounce(async function () {
        await this.$store.dispatch("$_assignmentList/getListAssignmentPlan");
      }, 500)
    }
  };
</script>
