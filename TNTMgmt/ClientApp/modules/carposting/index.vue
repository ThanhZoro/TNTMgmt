<template>
  <div>
    <title-bar :langTitle="$t('carposting.list')"></title-bar>
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('carposting.list')}}</h5>
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
            <router-link class="btn btn-primary fontDefault" to="/team/edit">
              {{$t('createNew')}}
            </router-link>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input v-model="description" class="form-control" v-on:keyup.enter="search()" :placeholder="$t('carposting.placeHolderSearch')">
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
        <div class="row">
          <div class="col-md-12">
            <div class="table-cont" id="table-cont">
              <div class="col-md-6" v-for="(item, i) in commonData.carposting" :key="i">
                <div class="panel panel-body">
                  <div class="media pointer" @click="detail(item.postingInfo.id)">
                    <div class="media-body">
                      <h6 class="media-heading text-semibold"><a href="#" class="text-default">{{item.postingInfo.detail.title}}</a></h6>
                      <div>
                        <span> {{item.postingInfo.detail.city}}</span>
                        <span class="ml-20"> {{item.postingInfo.detail.priceOrigin}}</span>
                      </div>
                      <div>
                        <span>Liên hệ: {{item.postingInfo.detail.contact.name}}</span>
                      </div>
                      <div>
                        <span>Điện thoại: {{item.postingInfo.detail.contact.phones.join(' - ')}}</span>
                      </div>
                      <div>
                        <span class="text-lv-3">Ngày đăng: 3 ngày trước</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination class="ml-20"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           background
                           :current-page.sync="searchRequest.currentPage"
                           :page-sizes="[10, 20, 50]"
                           :page-size="searchRequest.pageSize"
                           layout="sizes, prev, pager, next , jumper"
                           :total="total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="! commonData.carposting.length">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{ commonData.carposting.length}}  {{$t('row')}}</div>
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
        checkedfilterData: [],
        filterText: '',
        filterDate: '',
        description: '',
        total: 10,
        commonData
      };
    },
    computed: {
      ...mapGetters({
        currentUser: 'common/currentUser',
        remainFilters: '$_carposting/remainFilters',
      }),
      ...mapState({
        searchRequest: state => state.$_carposting.searchRequest,
        advanceFilter: state => state.$_carposting.advanceFilter,
      })
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_carposting";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.team"));
    },
    methods: {
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_carposting/getTeam");
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_carposting/getTeam");
      },
      handleSort: async function (sortDesc) {
        var _this = this;
        _this.searchRequest.sort = JSON.parse(sortDesc);
        await _this.$store.dispatch("$_carposting/getTeam");
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
          await _this.$store.dispatch('$_carposting/updateFilterTeam', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        await _this.$store.dispatch('$_carposting/updateFilterTeam', { field: field, isDelete: true })
      },
      search: _.debounce(async function () {
        await this.$store.dispatch("$_carposting/getTeam");
      }, 500),
      deleteTeam: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [data.name]), _this.$t('team.delete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          try {
            var response = await _this.$store.dispatch(
              `$_carposting/deleteTeam`,
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
        }).catch(() => {
        });
      }, 500),
      detail: function (id) {
        var _this = this;
        _this.$router.push(`/carposting/detail/${id}`);
      }
    }
  };
</script>
