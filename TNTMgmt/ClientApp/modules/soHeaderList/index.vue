<template>
  <div>
    <title-bar :langTitle="$t('so.header')"></title-bar>
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('so.header')}}</h5>
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
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t(`so.${props}`)}}<i v-show="item" class="el-icon-check mt-10 ml-10" style="float:right;"></i></el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link class="btn btn-primary fontDefault" to="/so/header/edit" :disabled="!disabled.edit">
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
                  <input v-model="searchRequest.description" class="form-control" v-on:keyup.enter="search()" :placeholder="$t('so.searchDes')">
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
                  <button type="button" size="medium" class="btn bg-slate-400" @click="deleteData(ids)" :disabled="!disabled.delete">
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
                      <el-dropdown-item :command="item">{{$t('so'+'.'+item.field) }}</el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
                <span v-if="advanceFilter.choosenFilter">
                  <template v-for="(item, index) in advanceFilter.choosenFilter">
                    <span tabindex="0" class="label bg-grey-300 pointer" style="padding: 6px; margin:0px 5px 0px 10px; font-size:13px">
                      <span @click="handleChoosenfilter(item)">
                        <span v-if="item.searchType == 'checkbox' && item.field != 'status'">
                          {{$t(item.text)}}:
                          <span v-for="(item1, index1) in item.data">
                            <span v-if="index1 < 2">{{item1.name}}<span v-show="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'checkbox' && item.field == 'status'">
                          {{$t('so.' + item.field)}}:
                          <span v-for="(item1, index1) in item.data">
                            <span v-if="index1 < 2">{{ $t('so.' + item1.id)}}<span v-show="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'text'">
                          {{$t('so'+'.'+item.field)+ ': ' +item.filterText }}
                        </span>
                        <span v-if="item.searchType == 'date'">
                          {{$t('so'+'.'+item.field)}}: {{$moment(item.date[0]).format('DD/MM/YYYY')}} {{$t('goto')}} {{$moment(item.date[1]).format('DD/MM/YYYY')}}
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
                      <input v-model="desFilter" class="form-control" :placeholder="$t('press')" style="margin-bottom: 10px" v-show="advanceFilter.showData.field != 'status'">
                      <div v-for="(item, index) in filterData">
                        <input type="checkbox" v-model="checkedfilterData" class="custorm-checkbox" :id="item.id" :value="item.id" :title="item.name" />
                        <label :for="item.id" class="pointer label-padding break-word">{{(item.name != item.id) ? item.name : $t('so.' + item.name)}}</label>
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
        <div class="row">
          <div class="col-md-12">
            <div class='table-cont' id='table-cont' style="padding-top: 0px;">
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" class="custorm-checkbox" v-model="isCheckAll" />
                    </th>
                    <template v-for="(item, props, index) in headers">
                      <template v-if="index==1">
                        <th :key="index" v-show="item">{{$t(`so.${props}`)}}</th>
                        <th v-show="item"></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-show="item">{{$t(`so.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in soHeaderList.data" :key="i" :value="i">
                    <td><input type="checkbox" class="custorm-checkbox" :value="item.id" v-model="ids" /></td>
                    <td v-show="headers['soNumberString']">
                      <div style="width:80px !important">
                        <span>
                          {{item.soNumberString}}
                        </span>
                      </div>
                    </td>
                    <td v-show="headers['buyer']">
                      <div style="width:200px !important">
                        <router-link :to="`/so/header/edit/${item.id}`">
                          <span style=" font-weight: bold; color:#000" class="break-word">
                            {{item.buyer.name}}
                          </span>
                        </router-link>
                        <div>{{item.buyer.phone || $t('notAvailablePhone')}}</div>
                        <a :href="`mailto:${item.buyer.email }`" target="_top" class="break-word" v-if="item.buyer.email">{{item.buyer.email}}</a>
                        <span v-else class="display-block text-lv-2">{{ $t('notAvailableEmail')}}</span>
                      </div>
                    </td>
                    <td v-show="headers['buyer']">
                      <div class="icons-list">
                        <el-tooltip :content="$t('so.edit')" placement="top" effect="dark">
                          <router-link :to="`/so/header/edit/${item.id}`">
                            <i class="icon-pencil7"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-show="headers['soInfo']">
                      <div style="width:200px !important" class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.sODate')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-calendar2 icon-style-custom"></i></span>
                        </el-tooltip>
                        <span class="text-lv-1">{{item.soDateTime || $t('notAvailable')}}</span>
                      </div>
                      <div class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.status')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-heart6 icon-style-custom"></i></span>
                        </el-tooltip>
                        <el-dropdown class="fontDefault" trigger="click" @command="handleStatusClick">
                          <span class="el-dropdown-link changeOnLeads">
                            <i class="icon-primitive-dot" v-bind:style="{ color: item.statusColor }" v-show="item.status != 0"></i> {{$t('so.' + item.status)}}
                          </span>
                          <el-dropdown-menu slot="dropdown" class="el-popper-default">
                            <el-dropdown-item v-for="(statusItem, statusKey) in commonData.statusSOHeader"
                                              :key="statusKey"
                                              :value="statusItem.index"
                                              :command="{statusId: statusItem.index, soHeaderList: item}"
                                              :disabled="!disabled.edit">
                              <i class="icon-primitive-dot" v-bind:style="{ color: statusItem.colorValue }" v-show="statusItem.index != 0"></i> {{(statusItem.index == 0) ?  $t('leadList.noStatusValue') : $t('so.' + statusItem.index)}}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <div style="width: 200px !important" class="break-word pb-5" @click="showChangeInfo(item)">
                        <span>
                          <el-tooltip placement="top" effect="dark">
                            <span slot="content">{{$t('so.note')}}</span>
                            <span class="pointer" v-if="item.note && item.note.length > 23" style="float: left; padding-bottom: 20px; padding-right:15px"> <i class="icon-copy"></i></span>
                            <span class="pointer" v-else style="float: left; padding-right:15px"> <i class="icon-copy icon-style-custom"></i></span>
                          </el-tooltip>
                        </span>
                        <span slot="reference" class="pointer changeOnLeads">
                          {{item.noteContent || $t('notAvailableNote')}}
                        </span>
                      </div>
                    </td>
                    <td v-show="headers['totalHeader']">
                      <div style="width:200px !important" class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.vatAmount')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-stats-growth2 icon-style-custom"></i></span>
                        </el-tooltip>
                        <span class="text-lv-1">{{item.vatAmount || $t('so.notAvailableVAT')}} </span><span v-show="item.vatAmount">%</span>
                      </div>
                      <div class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.discount')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-gift icon-style-custom"></i></span>
                        </el-tooltip>
                        <span class="text-lv-2">{{item.discount || $t('so.notAvailableDiscount')}} </span><span v-show="item.discount">%</span>
                      </div>
                      <div class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.toTalAmount')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-coins icon-style-custom"></i></span>
                        </el-tooltip>
                        <router-link :to="`/so/header/edit/${item.id}`">
                          <span v-if="item.totalAmount">{{item.totalAmount | currency}}</span>
                          <span class="text-lv-3" v-else>{{$t('so.notAvailableTotalAmount')}}</span>
                        </router-link>
                      </div>
                    </td>
                    <td v-show="headers['salesUnit']">
                      <div style="width:200px !important" class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.companySales')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-office icon-style-custom"></i></span>
                        </el-tooltip>
                        <span>{{(currentCompany.id == item.companyId) ? currentCompany.companyName : $t('notAvailable')}}</span>
                      </div>
                      <div class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.teamSales')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-users2 icon-style-custom"></i></span>
                        </el-tooltip>
                        <span class="text-lv-2">{{item.teamName || $t('so.notAvailableTeam')}}</span>
                      </div>

                      <div class="pb-5">
                        <el-tooltip placement="top" effect="dark">
                          <span slot="content">{{$t('so.salesman')}}</span>
                          <span class="pointer" style="padding-right:13px"> <i class="icon-users icon-style-custom"></i></span>
                        </el-tooltip>
                        <router-link :to="`/so/header/edit/${item.id}`">
                          <span class="break-word">
                            {{item.salesmanName}}
                          </span>
                        </router-link>
                      </div>
                    </td>
                    <td v-show="headers['create']">
                      <div class="text-lv-1">{{(item.createdBy) ? item.createdBy : $t('notAvailable')}}</div>
                      <div class="text-lv-2" v-show="item.createdBy">{{' -- ' + item.fromNowCreate}}</div>
                    </td>
                    <td v-show="headers['update']">
                      <div class="text-lv-1">{{(item.updatedBy) ? item.updatedBy : $t('notAvailable')}}</div>
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
                           :total="soHeaderList.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!soHeaderList.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{soHeaderList.total}} {{$t('row')}}</div>
          </div>
        </div>
        <el-dialog :title="$t('so.editNotePopup')"
                   :visible.sync="popup.show"
                   width="30%">
          <span>{{$t('leadList.editNoteDes')}}</span>
          <textarea rows="5"
                    cols="100"
                    :placeholder="$t('leadsPage.note')"
                    :disabled="!disabled.edit"
                    v-model="noteValue"
                    v-on:keyup.enter="changeNote(soHeader)"
                    class="form-control"
                    autofocus></textarea>
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
  import commonData from '@/utils/common-data'
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        commonData,
        checkedfilterData: [],
        filterText: '',
        filterDate: '',
        desFilter: '',
        ids: [],
        noteValue: '',
        popup: {
          show: false,
          type: ''
        },
        isCheckAll: false,
        soHeader: {},
        columns: [
          "Note",
          "Status"
        ]
      };
    },
    computed: {
      ...mapGetters({
        soHeaderList: "$_soHeaderList/soHeaderList",
        remainFilters: '$_soHeaderList/remainFilters',
        filterData: '$_soHeaderList/filterData',
        currentUser: 'common/currentUser',
        currentCompany: "$_soHeaderList/getCompany",
      }),
      ...mapState({
        searchRequest: state => state.$_soHeaderList.searchRequest,
        searchLeadsRequest: state => state.$_soHeaderList.searchLeadsRequest,
        headers: state => state.$_soHeaderList.headers,
        advanceFilter: state => state.$_soHeaderList.advanceFilter,
      }),
      disabled() {
        return this.currentUser.accessRight.so;
      }
    },
    watch: {
      "isCheckAll": function (val) {
        var _this = this;
        _this.ids = val ? _.map(_this.soHeaderList.data, (o) => { return o.id }) : [];
      },
      "desFilter": _.debounce(async function (val) {
        var _this = this;
        if (_this.advanceFilter.showData.field == 'buyer') {
          _this.searchLeadsRequest.description = val;
          await _this.$store.dispatch('$_soHeaderList/getListLeads');
        } else {
          _this.$store.dispatch('$_soHeaderList/updateFilterCheckbox', { data: val, type: "desFilter" });
        }
      }, 200),
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_soHeaderList";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.so"));
      if (_this.soHeaderList && !_this.soHeaderList.data) await _this.$store.dispatch("$_soHeaderList/getSoHeader");

      if (_this.soHeaderList.data) {
        var listTeamId = [];
        _this.soHeaderList.data.forEach(function (value) {
          var data = _.find(listTeamId, function (v) { return v.id == value.teamId });
          if (!data) listTeamId.push({ id: value.teamId });
        })
        _this.advanceFilter.choosenTeamFilter.push({ searchType: 'checkbox', data: listTeamId, field: 'id' });
      }
      await _this.$store.dispatch("$_soHeaderList/getTeam");
      _this.advanceFilter.choosenTeamFilter = [];
    },
    methods: {
      filter: _.debounce(async function () {
        var _this = this;
        await _this.$store.dispatch("$_soHeaderList/getSoHeader");
      }, 500),
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_soHeaderList/getSoHeader");
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_soHeaderList/getSoHeader");
      },
      handleSort: async function (sortDesc) {
        var _this = this;
        _this.searchRequest.sort = JSON.parse(sortDesc);
        await _this.$store.dispatch("$_soHeaderList/getSoHeader");
      },
      async handleShowHide(command) {
        var _this = this;
        await _this.$store.dispatch("$_soHeaderList/showHideCols", command);
      },
      deleteData: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('so.deleteSoHeader'), _this.$t('so.deleteTitle'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            await _this.$store.dispatch(
              `$_soHeaderList/deleteSoHeader`,
              { ids: data.id ? [data.id] : data }
            );
            new PNotify({
              title: '',
              text: _this.$t('deleteSuccess'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
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
        if (command.field == 'buyer') {
          await _this.$store.dispatch('$_soHeaderList/getListLeads');
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
        if (request.field == "buyer") {
          request.field = "buyer.leadId"
        }
        request.data = _.filter(_this.filterData, (v) => { return _this.checkedfilterData.indexOf(v.id) > -1 });
        request.filterText = _this.filterText;
        request.date = _this.filterDate;
        if ((request.searchType == "checkbox" && request.data.length > 0) || (request.searchType == "text" && request.filterText) || (request.searchType == "date" && request.date)) {
          await _this.$store.dispatch('$_soHeaderList/updateFilterSoHeader', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        _this.desFilter = '';
        await _this.$store.dispatch('$_soHeaderList/updateFilterSoHeader', { field: field, isDelete: true })
      },
      validateBeforeSubmit: _.debounce(async function (formData) {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              formData.columns = _this.columns;
              let response = await _this.$store.dispatch("$_soHeaderList/updateSoHeader", formData);
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
        if (command.soHeaderList.status != command.statusId) {
          command.soHeaderList.status = command.statusId;
          var formData = command.soHeaderList;
          _this.validateBeforeSubmit(formData);
        }
      },
      search: _.debounce(async function () {
        await this.$store.dispatch("$_soHeaderList/getSoHeader");
      }, 500),
      showChangeInfo(item, type = "note") {
        var _this = this;
        _this.soHeader = item ? item : null;
        _this.popup = { show: true, type: type };
        if (type == "note") {
          _this.noteValue = item.note;
        }
      },
      async changeNote(item, i) {
        var _this = this;
        item.note = _this.noteValue.slice(0, _this.noteValue.length - 1);
        await _this.validateBeforeSubmit(item);
        await _this.closePopUp();
      },
      closePopUp() {
        var _this = this;
        _this.popup.show = false;
        _this.noteValue = "";
        if (_this.ids) { _this.ids = []; _this.isCheckAll = false; }
      },
    }
  };
</script>
