<template>
  <div>
    <div class="col-md-12 mt-20">
      <div class="col-md-4">
        <div class="form-group has-feedback">
          <input class="form-control input-xs" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('so.searchDesDetail')">
          <div class="form-control-feedback">
            <i class="icon-search4"></i>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <button type="button" size="medium" class="btn btn-primary btn-xs" @click="search()">
            {{$t('search')}}
          </button>
        </div>
      </div>
      <div class="pull-right mr-20">
        <router-link class="btn btn-primary fontDefault" :to="`/so/header/${$route.params.id}/details/edit`" :disabled="!disabled.edit">
          {{$t('createNew')}}
        </router-link>
      </div>
      <div class="pull-right mr-20">
        <button type="button" size="medium" class="btn bg-slate-400" @click="deleteData(ids)" v-if="ids[0]" :disabled="!disabled.delete">
          {{$t('delete')}}
        </button>
      </div>
    </div>
    <div class="col-md-12" style="padding: 0px;">
      <div class='table-cont' id='table-cont'>
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
            <tr v-for="(item, i) in soDetailList.data" :key="i" :value="i">
              <td><input type="checkbox" class="custorm-checkbox" :value="item.id" v-model="ids" /></td>
              <td v-show="headers['productCode']">
                <div style="width: 60px !important;">
                  <span>{{item.productCode}}</span>
                </div>
              </td>
              <td v-show="headers['productName']" style="min-width: 160px">
                <router-link :to="`/so/header/${$route.params.id}/details/edit/${item.id}`">
                  <span class="break-word blue--text">{{item.productName || ''}}</span>
                </router-link>
              </td>
              <td v-show="headers['productName']">
                <div class="icons-list">
                  <el-tooltip :content="$t('so.updateSODetail')" placement="top" effect="dark">
                    <router-link :to="`/so/header/${$route.params.id}/details/edit/${item.id}`">
                      <i class="icon-pencil7"></i>
                    </router-link>
                  </el-tooltip>
                </div>
              </td>
              <td v-show="headers['unit']">
                <div style="width: 60px !important;">
                  <span>{{item.unit}}</span>
                </div>
              </td>
              <td v-show="headers['quantity']">
                <div style="width: 60px !important;">
                  <span>{{item.quantity}}</span>
                </div>
              </td>
              <td v-show="headers['price']">
                <div style="width: 60px !important;">
                  <span>{{item.price}}</span>
                </div>
              </td>
              <td v-show="headers['amount']">
                <div style="width: 60px !important;">
                  <span>{{item.amount}}</span>
                </div>
              </td>
              <td v-show="headers['freeItem']">
                <div class="icons-list" style="vertical-align: middle">
                  <i v-show="item.freeItem" class="icon-checkmark3"></i>
                </div>
              </td>
              <td v-show="headers['note']">
                <div style="width: 200px" class="break-word pb-5" @click="showChangeInfo(item)">
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
      <div class="col-md-12">
      <div class="col-md-8">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       background
                       :current-page.sync="searchRequest.currentPage"
                       :page-sizes="[10, 20, 50]"
                       :page-size="searchRequest.pageSize"
                       layout="sizes, prev, pager, next , jumper"
                       :total="soDetailList.total">
        </el-pagination>
      </div>

      <div class="total-list col-md-3 text-right" style="margin-top: 40px">
        <div v-if="!soDetailList.total">{{$t('noData')}}</div>
        <div v-else>{{$t('have')}} {{soDetailList.total}} {{$t('row')}}</div>
      </div>
      </div>
    </div>
    <div class="col-md-12 mt-20">
      <fieldset class="content-group">
        <fieldset class="col-md-7 col-md-offset-5">
        <legend class="text-bold mt-20">{{$t('so.totalHeader')}}</legend>
          <div class="col-md-12 mb-20">
            <div class="col-md-5">
              {{$t('so.subTotalAmount')}}
            </div>
            <div class="col-md-7 text-right">23423423</div>
          </div>
          <hr style="border: 0.5px lightgrey dashed;">
          <div class="col-md-12 mb-20">
            <div class="col-md-5">
              {{$t('so.vatAmount')}}
            </div>
            <div class="col-md-7 text-right">23423423</div>
          </div>
          <hr style="border: 0.5px lightgrey dashed;">
          <div class="col-md-12 mb-20">
            <div class="col-md-5">
              {{$t('so.discount')}}
            </div>
            <div class="col-md-7 text-right">23423423</div>
          </div>
          <hr style="border: 1px lightgrey solid;">
          <div class="col-md-12 mb-20">
            <div class="col-md-5">
              {{$t('so.lastTotal')}}
            </div>
            <div class="col-md-7 text-right">23423423</div>
          </div>
          <div class="col-md-12 mb-20">
            <div class="col-md-5 text-lv-2">
              {{$t('so.lastTotalString')}}
            </div>
            <div class="col-md-7 text-right text-lv-2">Muoi hai trieu ba tram ngan sau tram nam muoi viet nam dong</div>
          </div>
        </fieldset>
      </fieldset>
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
                v-on:keyup.enter="changeNote(soDetail)"
                class="form-control"
                autofocus></textarea>
    </el-dialog>
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
        description: '',
        checkedfilterData: [],
        filterText: '',
        filterDate: '',
        desFilter: '',
        ids: [],
        isCheckAll: false,
        noteValue: '',
        popup: {
          show: false,
          type: ''
        },
        soDetail: {},
      };
    },
    computed: {
      ...mapGetters({
        soDetailList: "$_soDetailList/soDetailList",
        remainFilters: '$_soDetailList/remainFilters',
        filterData: '$_soDetailList/filterData',
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_soDetailList.searchRequest,
        headers: state => state.$_soDetailList.headers,
        advanceFilter: state => state.$_soDetailList.advanceFilter,
      }),
      disabled() {
        return this.currentUser.accessRight.so;
      }
    },
    watch: {
      "isCheckAll": function (val) {
        var _this = this;
        _this.ids = val ? _.map(_this.soDetailList.data, (o) => { return o.id }) : [];
      },
      "desFilter": _.debounce(async function (val) {
        var _this = this;
        _this.$store.dispatch('$_soDetailList/updateFilterCheckbox', { data: val, type: "desFilter" });
      }, 200),
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_soDetailList";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("so.details"));
      _this.searchRequest.soHeaderId = _this.$route.params.id;
      await _this.$store.dispatch("$_soDetailList/getSODetailList");

      var tableCont = document.querySelector('#table-cont');
      if (tableCont) {
        tableCont.addEventListener('scroll', (e) => {
          var getTableCont = document.getElementById('table-cont');
          var scrollTop = tableCont.scrollTop;
          document.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
        })
      }
    },
    methods: {
      filter: _.debounce(async function () {
        var _this = this;
        await _this.$store.dispatch("$_soDetailList/getSODetailList");
      }, 500),
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_soDetailList/getSODetailList");
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_soDetailList/getSODetailList");
      },
      handleSort: async function (sortDesc) {
        var _this = this;
        _this.searchRequest.sort = JSON.parse(sortDesc);
        await _this.$store.dispatch("$_soDetailList/getSODetailList");
      },
      async handleShowHide(command) {
        var _this = this;
        await _this.$store.dispatch("$_soDetailList/showHideCols", command);
      },
      deleteData: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('so.deleteProductItem'), _this.$t('so.deleteTitle'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            await _this.$store.dispatch(
              `$_soDetailList/deleteProductItem`,
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
          await _this.$store.dispatch('$_soDetailList/updateFilterProdItem', request)
        }
      },
      async cancelFilter(field) {
        var _this = this;
        _this.desFilter = '';
        await _this.$store.dispatch('$_soDetailList/updateFilterProdItem', { field: field, isDelete: true })
      },
      validateBeforeSubmit: _.debounce(async function (formData) {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              let response = await _this.$store.dispatch("$_soDetailList/updateSODetail", formData);
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
      search: _.debounce(async function () {
        var _this = this;
        _this.searchRequest.description = _this.description;
        await _this.$store.dispatch("$_soDetailList/getSODetailList");
      }, 500),
      showChangeInfo(item, type = "note") {
        var _this = this;
        _this.soDetail = item ? item : null;
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
