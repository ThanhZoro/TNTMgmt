<template>
  <div>
    <title-bar :langTitle="$t('screen.trackingList')"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('screen.trackingList')}}</h5>
          <div class="heading-elements">
            <el-dropdown @command="handleSort" trigger="click">
              <el-button size="medium" class="btn fontDefault">
                {{$t('sort.name')}} <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'CreatedAt' && searchRequest.sort.sortOrder == 1 ) }" command='{"field": "CreatedAt","sortOrder":1}'>{{$t('sort.createdDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'CreatedAt' && searchRequest.sort.sortOrder == -1 ) }" command='{"field": "CreatedAt","sortOrder":-1}'>{{$t('sort.createdAsc')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'UpdatedAt' && searchRequest.sort.sortOrder == 1 ) }" command='{"field": "UpdatedAt","sortOrder":1}'>{{$t('sort.updatedDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'UpdatedAt' && searchRequest.sort.sortOrder == -1 ) }" command='{"field": "UpdatedAt","sortOrder":-1}'>{{$t('sort.updatedAsc')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleShowHide" trigger="click">
              <el-button size="medium" class="btn fontDefault">
                {{$t('showHideCols')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(item, props, index) in headers">
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t(`trackingPage.${props}`)}} <i v-if="item" class="el-icon-check mt-10 ml-10" style="float:right;"></i></el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <ul class="nav navbar-nav navbar-right" style="margin-left:4px">
              <li class="dropdown dropdown-user">
                <a class="dropdown-toggle btn btn-primary" data-toggle="dropdown" :disabled="!disabled.edit">
                  {{$t('integration')}}
                  <i class="caret"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right" v-if="disabled.edit">
                  <li>
                    <router-link to="/ga/tracking/disconnect/edit/">
                      {{$t('disconnectGa')}}
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/ga/tracking/connect/edit/">
                      {{$t('connectGa')}}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input v-model="description" class="form-control" v-on:keyup.enter="search()" :placeholder="$t('placeHolderSearchGA')">
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
                  <button type="button" size="medium" :disabled="!disabled.delete" class="btn bg-slate-400" @click="deleteTracking(ids)">
                    {{$t('delete')}}
                  </button>
                </div>
              </div>
              <div class="col-md-12">
                <el-dropdown @command="handleChoosenfilter" placement="right-start" size="medium" trigger="click">
                  <span class="el-dropdown-link">
                    <button type="button" class="btn border-slate btn-flat">{{$t('addFilter')}}</button>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width:200px;padding-left:10px">
                    <template v-for="(item, index) in remainFilters">
                      <el-dropdown-item :command="item">{{$t('trackingPage'+'.'+item.field) }}</el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
                <span v-if="advanceFilter.choosenFilter">
                  <template v-for="(item, index) in advanceFilter.choosenFilter">
                    <span tabindex="0" class="label bg-grey-300 pointer" style="padding: 6px; margin:0px 5px 0px 10px; font-size:13px">
                      <span @click="handleChoosenfilter(item)">
                        <span v-if="item.searchType == 'text'">
                          {{$t('trackingPage'+'.'+item.field)+ ': ' +item.filterText }}
                        </span>
                        <span v-if="item.searchType == 'date'">
                          {{$t('trackingPage'+'.'+item.field)}}: {{$moment(item.date[0]).format('DD/MM/YYYY')}} {{$t('goto')}} {{$moment(item.date[1]).format('DD/MM/YYYY')}}
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
                      {{advanceFilter.showData.text}}
                    </h6>
                    <div class="heading-elements">
                      <ul class="icons-list">
                        <li><a data-action="close" @click="advanceFilter.show = false"></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="panel-body">
                    <div v-if="advanceFilter.showData.searchType == 'text'">
                      <input v-model="filterText" class="form-control" :placeholder="$t('press')+'...'" v-on:keyup.enter="applyFilter">
                    </div>
                    <div v-if="advanceFilter.showData.searchType == 'date'">
                      <el-date-picker v-model="filterDate"
                                      type="daterange"
                                      align="right"
                                      unlink-panels
                                      :start-placeholder="$t('from')"
                                      :end-placeholder="$t('end')"
                                      style="width:100%"
                                      :picker-options="advanceFilter.pickerOptions">
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
        </div>
        <div class="row" >
          <div class="col-md-12">
            <div class='table-cont' id='table-cont'>
              <table class="table" >
                <thead>
                  <tr>
                    <th><input type="checkbox" class="custorm-checkbox" v-model="isCheckAll" /></th>
                    <template v-for="(item, props, index) in headers">
                      <template v-if="index==0 || index==1">
                        <th :key="index" v-show="item">{{$t(`tracking.${props}`)}}</th>
                        <th v-show="item"></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-show="item">{{$t(`tracking.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item , i) in trackingData.data" style="height:60px">
                    <td><input type="checkbox" class="custorm-checkbox" :value="item.id" v-model="ids" /></td>
                    <td v-show="headers['trackingName']">
                      <div style="width:150px">
                        <router-link :to="'/ga/'+item.id">
                          <span class="break-word blue--text">{{item.name}}</span>
                        </router-link>
                      </div>
                    </td>
                    <td v-show="headers['trackingName']">
                      <div class="icons-list">
                        <el-tooltip :content="$t('tracking.trackingInfo')"  placement="top" effect="dark">
                          <router-link :to="'/ga/'+item.id">
                            <i class="icon-pencil7 black--text"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-show="headers['website']">
                      <div style="min-width:120px">
                        <span class="break-word"><a :href="item.websiteUrl" target="blank">{{item.websiteUrl}}</a></span>
                        <span class="break-word display-block">{{item.webPropertyId}}</span>
                      </div>
                    </td>
                    <td v-show="headers['website']">
                      <el-tooltip :content="$t('getCode')" placement="top" effect="dark">
                        <i class="icon-embed2 pointer" @click="getCode(item)"></i>
                      </el-tooltip>
                    </td>
                    <td v-show="headers['delete']">
                      <el-tooltip :content="$t('trackingPage.titleDelete')" placement="top" effect="dark">
                        <i class="icon-trash pointer" v-if="disabled.delete" @click="deleteTracking(item)"></i>
                        <i class="icon-trash" v-else></i>
                      </el-tooltip>
                    </td>
                    <td v-show="headers['createdOn']">
                      <div style="min-width:120px">
                        <span class="display-block break-word">{{(item.createdBy)  ? item.createdBy : '' }}</span>
                        <span class="display-block text-lv-3"> {{(item.fromNowCreate)  ?  item.fromNowCreate  : ''}}</span>
                      </div>
                    </td>
                    <td v-show="headers['updatedOn']">
                      <div style="min-width:120px" v-if="item.updatedAt">
                        <span class="display-block break-word">{{(item.updatedBy ? item.updatedBy :'N/A')}}</span>
                        <span class="display-block break-word text-lv-3">{{(item.fromNowUpdate) ?  item.fromNowUpdate  : ''}}</span>
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
                           :total="trackingData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!trackingData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{trackingData.total}}  {{$t('row')}}</div>
          </div>
        </div>
        <el-dialog :title="$t('codeHtml')"
                   :visible.sync="showCode"
                   width="600px">
          <p>{{$t('tracking.descriptionShowCode')}}</p>
          <p>{{$t('tracking.descriptionShowCodeHeadBefore')}} <b>&lt;head></b> {{$t('tracking.descriptionShowCodeHeadAfter')}}:</p>
          <center>
            <textarea class="form-control" rows="4" readonly cols="70">&lt;script>o2oDataLayer = [{o2odata:{'companyId' : '{{code.companyId}}','trackingId' : '{{code.trackingId}}','tid' : '{{code.tid}}'}}];&lt;/script>&lt;script src="//gtmjs.com/scripts/tracking.js" async>&lt;/script>
          </textarea>
          </center>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showCode = false">{{$t('close')}}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
  <!-- /bordered panel body table -->
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
        code: {},
        showCode: false
      };
    },
    computed: {
      ...mapGetters({
        trackingData: "$_ga/trackingData",
        remainFilters: '$_ga/remainFilters',
        filterData: '$_ga/filterData',
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_ga.searchRequest,
        headers: state => state.$_ga.headers,
        advanceFilter: state => state.$_ga.advanceFilter,
        companyId: state => state.common.companyInfo.id
      }),
      disabled() {
        return this.currentUser.accessRight.tracking;
      }
    },
    watch: {
      "isCheckAll": function (val) {
        var _this = this;
        _this.ids = val ? _.map(_this.trackingData.data, (o) => { return o.id }) : [];
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_ga";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.trackingList"));
      if (_this.trackingData && !_this.trackingData.data) {
        await _this.$store.dispatch("$_ga/getAllTracking");
      }
    },
    methods: {
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_ga/getAllTracking");
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_ga/getAllTracking");
      },
      handleSort: async function (sortDesc) {
        var _this = this;
        _this.searchRequest.sort = JSON.parse(sortDesc);
        await _this.$store.dispatch("$_ga/getAllTracking");
      },
      async handleShowHide(command) {
        var _this = this;
        await _this.$store.dispatch("$_ga/showHideCols", command);
      },
      async deleteTracking(item) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [item.name]), _this.$t('trackingPage.titleDelete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            var data = item.id ? [item.id] : item;
            var response = await _this.$store.dispatch('$_ga/deleteTracking', data);
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
      },
      async handleChoosenfilter(command) {
        var _this = this;
        _this.advanceFilter.show = true;
        _this.advanceFilter.showData = command;
        switch (command.searchType) {
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
        if ((request.searchType == "text" && request.filterText) || (request.searchType == "date" && request.date)) {
          await _this.$store.dispatch('$_ga/updateFilter', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        if (field == 'lookAfter') {
          _this.filterSelect = '';
        }
        await _this.$store.dispatch('$_ga/updateFilter', { field: field, isDelete: true })
      },
      search: _.debounce(async function () {
        await this.$store.dispatch('$_ga/searchRequest', { val: this.description, type: "description" });
      }, 500),
      getCode: function (data) {
        var _this = this;
        _this.showCode = true;
        _this.code = {
          companyId: _this.companyId,
          trackingId: data.id,
          tid: data.webPropertyId
        }
      },
    }
  };
</script>
