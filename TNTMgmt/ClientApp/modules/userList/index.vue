<template>
  <div>
    <title-bar :langTitle="$t('screen.userList')"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('screen.userList')}}</h5>
          <div class="heading-elements">
            <el-dropdown @command="handleSort" trigger="click">
              <el-button size="medium" class="btn fontDefault">
                {{$t('sort.name')}} <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'createdAt' && searchRequest.sort.sortOrder == 'desc' ) }" command='{"field": "createdAt","sortOrder":"desc"}'>{{$t('sort.createdDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'createdAt' && searchRequest.sort.sortOrder == 'asc' ) }" command='{"field": "createdAt","sortOrder":"asc"}'>{{$t('sort.createdAsc')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'updatedAt' && searchRequest.sort.sortOrder == 'desc' ) }" command='{"field": "updatedAt","sortOrder":"desc"}'>{{$t('sort.updatedDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'updatedAt' && searchRequest.sort.sortOrder == 'asc' ) }" command='{"field": "updatedAt","sortOrder":"asc"}'>{{$t('sort.updatedAsc')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleShowHide" trigger="click" >
              <el-button size="medium" class="btn fontDefault">
                {{$t('showHideCols')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" >
                <template v-for="(item, props, index) in headers" style="width:180px">
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t(`userList.${props}`)}} <i v-show="item" class="el-icon-check mt-10 ml-20" style="float:right;"></i></el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link class="btn btn-primary" to="/user/create" :disabled="!disabled.edit">
              {{$t('createNew')}}
            </router-link>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input class="form-control" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('userList.searchDes')">
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
                <div class="form-group text-right" >
                  <router-link to="/user/accessRight/create" type="button" size="medium" :disabled="!disabled.edit" class="btn bg-slate-400" >
                    {{$t('screen.accessRight')}}
                  </router-link>
                </div>
              </div>
              <div class="col-md-12">
                <el-dropdown @command="handleChoosenfilter" placement="right-start" size="medium" trigger="click">
                  <span class="el-dropdown-link">
                    <button type="button" class="btn border-slate btn-flat">{{$t('addFilter')}}</button>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width:200px;padding-left:10px">
                    <template v-for="(item, index) in remainFilters">
                      <el-dropdown-item :command="item">{{$t('userList'+'.'+item.field) }}</el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
                <span v-if="advanceFilter.choosenFilter">
                  <template v-for="(item, index) in advanceFilter.choosenFilter">
                    <span tabindex="0" class="label bg-grey-300 pointer" style="padding: 6px; margin:0px 5px 0px 10px; font-size:13px">
                      <span @click="handleChoosenfilter(item)">
                        <span v-if="item.searchType == 'checkbox'">
                          {{$t(item.text)}}:
                          <span v-for="(item1, index1) in item.data">
                            <span v-if="index1 < 2">{{ `"${item1.name}"`}}<span v-show="index1 == 0 && item.data.length > 1"> , </span></span>
                            <span v-if="index1 == 2">,...</span>
                          </span>
                        </span>
                        <span v-if="item.searchType == 'text'">
                          {{$t('userList'+'.'+item.field)+ ': ' +item.filterText }}
                        </span>
                        <span v-if="item.searchType == 'date'">
                          {{$t('userList'+'.'+item.field)}}: {{$moment(item.date[0]).format('DD/MM/YYYY')}} {{$t('goto')}} {{$moment(item.date[1]).format('DD/MM/YYYY')}}
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
                        <label :for="item.id" class="pointer label-padding">{{item.name}}</label>
                      </div>
                    </div>
                    <div v-if="advanceFilter.showData.searchType == 'text'">
                      <input v-model="filterText" class="form-control" v-on:keyup.enter="applyFilter" :placeholder="$t('press')+'...'">
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
                      <button type="button" class="btn btn-default" @click="cancelFilter(advanceFilter.showData.field)">{{$t('quit')}}</button>
                      <button type="button" class="btn btn-primary" @click="applyFilter">{{$t('apply')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-cont" id="table-cont" >
              <table class="table">
                <thead>
                  <tr>
                    <template v-for="(item, props, index) in headers">
                      <template v-if="props=='department'">
                        <th :key="index" v-show="item">{{$t(`userList.${props}`)}}</th>
                        <th></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-show="item">{{$t(`userList.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in userData.data" :key="i" :value="item">
                    <td v-show="headers['fullName']" style="min-width:180px;">
                      <router-link :to="`/user/update/${item.id}`" v-if="disabled.edit">
                        <span class="blue--text">{{`${item.firstName} ${item.lastName || ''}`}}</span>
                      </router-link>
                      <span v-else>
                        <span >{{`${item.firstName} ${item.lastName || ''}`}}</span>
                      </span>
                    </td>
                    <td v-show="headers['status']" style="min-width:180px;">
                      {{item.isActive ? $t('active') : $t('inActive')}}
                    </td>
                    <td v-show="headers['gender']">{{item.gender || ''}}</td>
                    <td v-show="headers['email']">
                      <div><a :href="`mailto:${item.email }`" target="_top">{{item.email || $t('notAvailableEmail')}}</a></div>
                    </td>
                    <td v-show="headers['phone']">{{item.phoneNumber || ''}}</td>
                    <td v-show="headers['accessRight']" style="min-width:200px;">
                      <router-link :to="`/user/accessRight/edit/${item.id}`" v-if="disabled.edit">
                        {{item.roles.length ? item.roles.join(', '): $t('accessRight.noAccessRight')}}
                      </router-link>
                      <span v-else>
                        {{item.roles.length ? item.roles.join(', '): $t('accessRight.noAccessRight')}}
                      </span>
                    </td>
                    <td v-show="headers['birthday']">{{item.birthdayTime || ''}}</td>
                    <td v-show="headers['userName']">{{item.userName}}</td>
                    <td v-show="headers['code']" style="min-width:100px;">{{item.code || ''}}</td>
                    <td v-show="headers['position']" style="min-width:100px;">{{_.toString(item.position) || ''}}</td>
                    <td v-show="headers['department']" style="min-width:100px;">{{_.toString(item.department) || ''}}</td>
                    <td style="min-width:100px">
                      <div class="icons-list">
                        <el-tooltip :content="$t('user.updateUser')" placement="top" effect="dark" v-if="disabled.edit">
                          <router-link :to="`/user/update/${item.id}`">
                            <i class="icon-pencil7"></i>
                          </router-link>
                        </el-tooltip>
                        <el-tooltip :content="$t('team.addTeamUser')" placement="top" effect="dark" v-if="disabled.edit" class="ml-20">
                          <router-link :to="`/user/team/${item.id}`">
                            <i class="icon-users2 black--text"></i>
                          </router-link>
                        </el-tooltip>
                      </div>
                    </td>
                    <td v-show="headers['createdAt']" style="min-width:200px">
                      <span class="display-block break-word">{{(item.createdBy)  ? item.createdBy : '' }}</span>
                      <span class="display-block text-lv-3"> {{(item.fromNowCreate)  ?  item.fromNowCreate  : ''}}</span>
                    </td>
                    <td v-show="headers['updatedAt']" style="min-width:200px">
                      <span class="display-block break-word">{{(item.updatedBy ? item.updatedBy :'N/A')}}</span>
                      <span class="display-block break-word text-lv-3">{{(item.fromNowUpdate) ?  item.fromNowUpdate  : ''}}</span>
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
                           :total="userData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!userData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{userData.total}} {{$t('row')}}</div>
          </div>
        </div>
      </div>
      <!-- /bordered panel body table -->
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
        desFilter: '',
      };
    },
    computed: {
      ...mapGetters({
        userData: "$_userList/userData",
        filterData: '$_userList/filterData',
        remainFilters: '$_userList/remainFilters',
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_userList.searchRequest,
        headers: state => state.$_userList.headers,
        advanceFilter: state => state.$_userList.advanceFilter,
        team: state => state.$_userList.team
      }),
      disabled() {
        return this.currentUser.accessRight.settings;
      }
    },
    watch: {
      "desFilter": _.debounce(async function (val) {
        var _this = this;
        _this.$store.dispatch('$_userList/updateFilterCheckbox', { data: val, type: _this.advanceFilter.showData.field });
      }, 200),
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_userList";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.userList"));
      if (!_this.team) {
        await _this.$store.dispatch('$_userList/getTeam');
      }
    },
    methods: {
      handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
      },
      handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
      },
      handleSort: function (sortDesc) {
        this.searchRequest.sort = JSON.parse(sortDesc);
      },
      async handleShowHide(command) {
        var _this = this;
        await _this.$store.dispatch("$_userList/showHideCols", command);
      },
      async handleChoosenfilter(command) {
        var _this = this;
        _this.advanceFilter.show = true;
        _this.advanceFilter.showData = command;
        _this.desFilter = '';
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
          await _this.$store.dispatch('$_userList/updateFilter', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        await _this.$store.dispatch('$_userList/updateFilter', { field: field, isDelete: true })
      },
      search() {
        this.searchRequest.description = this.description;
      },
    }
  };
</script>
