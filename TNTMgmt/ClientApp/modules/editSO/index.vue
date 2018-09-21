<template>
  <div>
    <title-bar :langTitle="$route.params.soHeaderId ? $t('so.updateHeader') : $t('so.createHeader')"></title-bar>
    <div class="content">
      <div>
        <div class="panel-heading">
          <h5 class="panel-title paddingLeft-11">{{$route.params.soHeaderId ? $t('so.updateHeader') : $t('so.createHeader')}}</h5>
          <div class="heading-elements paddingRight-11">
            <router-link :to="$route.params.leadId ? '/lead' : '/so/header'" class="btn btn-default">
              {{$t('back')}}
            </router-link>
            <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
          </div>
        </div>
        <div class="panel-body">
          <div class="col-md-6">
            <div class="panel panel-body" style="height: 390px;">
              <fieldset class="content-group">
                <legend class="text-bold">{{$t('so.salesmanInfo')}}</legend>
                <div class="row">
                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('so.companySales')}}</label>
                    <div class="col-lg-10">
                      <el-select v-model="companyId"
                                 filterable remote reserve-keyword
                                 :placeholder="$t('choose')"
                                 :disabled="!disabled.edit"
                                 style="width:100%">
                        <el-option v-for="(item, i) in companies"
                                   :key="i"
                                   :label="item.companyName"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('screen.team')}}</label>
                    <div class="col-lg-10">
                      <el-select v-model="formData.soHeader.teamId"
                                 filterable clearable remote reserve-keyword
                                 :placeholder="$t('choose')"
                                 :disabled="!disabled.edit"
                                 style="width:100%"
                                 @change="handleChangeTeam(formData.soHeader.teamId)">
                        <el-option v-for="(item, i) in team"
                                   :key="i"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div :class="`form-group col-md-12 ${errors.has('salesman') ? 'has-error' : ''}`">
                    <label class="control-label col-lg-2">{{$t('so.salesman')}} *</label>
                    <div class="col-lg-10">
                      <el-select v-model="formData.soHeader.salesman"
                                 filterable clearable remote reserve-keyword
                                 :placeholder="$t('choose')"
                                 :disabled="!disabled.edit"
                                 name="salesman"
                                 v-validate="'required'"
                                 style="width:100%">
                        <el-option v-for="(item, i) in users"
                                   :key="i"
                                   :label="item.firstName + ' | ' + item.userName"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="col-md-6">
            <div class="panel panel-body" style="overflow-y: auto; height: 390px;">
              <fieldset class="content-group" style="margin-bottom: 0px !important">
                <legend class="text-bold">{{$t('so.buyerInfo')}}</legend>
                <div class="row">
                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('so.buyer')}}</label>
                    <div class="col-lg-10">
                      <el-select v-model="formData.soHeader.buyer.leadId"
                                 filterable
                                 clearable
                                 remote
                                 reserve-keyword
                                 :remote-method="filterLeadBuyer"
                                 :placeholder="$t('so.chooseFromLead')"
                                 :disabled="!disabled.edit"
                                 style="width:100%"
                                 @change="handleChangeBuyerData()">
                        <el-option v-for="(item, i) in leadBuyerList.data"
                                   :key="i"
                                   :label="item.fullName + ' | ' + item.email"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('leadsPage.fullName')}}</label>
                    <div class="col-lg-10">
                      <input type="text" :placeholder="$t('leadsPage.fullName')" class="form-control" :disabled="!disabled.edit" v-model="formData.soHeader.buyer.name">
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('leadsPage.phone')}}</label>
                    <div class="col-lg-10">
                      <input type="text" :placeholder="$t('leadsPage.phone')" class="form-control" :disabled="!disabled.edit" v-model="formData.soHeader.buyer.phone">
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('leadsPage.email')}}</label>
                    <div class="col-lg-10">
                      <input type="text" :placeholder="$t('leadsPage.email')" class="form-control" :disabled="!disabled.edit" v-model="formData.soHeader.buyer.email">
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('leadsPage.address')}}</label>
                    <div class="col-lg-10">
                      <input name="address" class="form-control" :placeholder="$t('placeHolderAddress')" type="text" :disabled="!disabled.edit" v-model="formData.soHeader.buyer.address" v-gmaps-searchbox:Address.formatted_address=vm>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="col-md-12">
            <div class="panel panel-body">
              <fieldset class="content-group">
                <legend class="text-bold">{{$t('so.soInfo')}}</legend>
                <div class="row">
                  <div :class="`form-group col-md-12 ${errors.has('soDate') ? 'has-error' : ''}`">
                    <label class="control-label col-lg-2">{{$t('so.sODate')}} *</label>
                    <div class="col-lg-10">
                      <el-date-picker v-model="formData.soHeader.soDate"
                                      type="date"
                                      name="soDate"
                                      v-validate="'required'"
                                      style="width:100%"
                                      :placeholder="$t('so.sODate')"
                                      :disabled="!disabled.edit">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('so.status')}} </label>
                    <div class="col-lg-10">
                      <el-select v-model="formData.soHeader.status"
                                 filterable
                                 clearable
                                 :placeholder="$t('choose')"
                                 :disabled="!disabled.edit"
                                 style="width:100%"
                                 reserve-keyword>
                        <el-option v-for="(item, i) in commonData.statusSOHeader"
                                   :key="i"
                                   :label="$t('so.' + item.index)"
                                   :value="item.index">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="form-group col-md-12 has-feedback">
                    <label class="control-label col-lg-2">{{$t('so.vat')}}</label>
                    <div class="col-lg-10">
                      <input class="form-control" :placeholder="$t('so.vatAmount')" type="number" :disabled="!disabled.edit" v-model="formData.soHeader.vatAmount" @change="handleChangeValue">
                      <div class="form-control-feedback">
                        <span style="font-weight: bold; padding-right: 10px;">%</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label class="control-label col-md-2">{{$t('so.discount')}}</label>
                    <div class="col-md-10">
                      <div class="col-md-9" style="padding-left: 0px">
                        <input class="form-control" :placeholder="$t('so.discount')" type="number" :disabled="!disabled.edit" v-model="formData.soHeader.discount" @change="handleChangeValue">
                      </div>
                      <div class="col-md-3" style="padding-right: 0px">
                        <el-select v-model="formData.soHeader.discountType" :disabled="!disabled.edit" style="width:100%" @change="handleChangeValue">
                          <el-option v-for="(item,i) in commonData.typeDiscount"
                                     :key="item.i"
                                     :label="$t('so.' + item.value)"
                                     :value="item.index">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label class="control-label col-lg-2">{{$t('so.note')}}</label>
                    <div class="col-lg-10">
                      <input class="form-control" :placeholder="$t('so.note')" type="text" :disabled="!disabled.edit" v-model="formData.soHeader.note">
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="col-md-12">
            <div class="panel panel-body" style="padding: 10px;">
              <fieldset class="content-group " style="padding-left:10px;padding-right:10px">
                <legend class="text-bold" style="padding-top:10px;">
                  <span>{{$t('so.details')}}</span>
                  <span class="pull-right">
                    <el-tooltip :content="$t('so.createSODetail')" placement="top" effect="dark">
                      <button type="button" class="btn btn-default btn-icon btn-xs" :disabled="!disabled.edit" @click="createNewSODetails"><i class="icon-add"></i></button>
                    </el-tooltip>
                    <el-tooltip :content="$t('deleteAll')" placement="top" effect="dark">
                      <button type="button" class="btn btn-default btn-icon btn-xs" :disabled="!disabled.edit" @click="deleteAllSODetails"><i class="icon-trash"></i></button>
                    </el-tooltip>
                  </span>
                </legend>
              </fieldset>

              <div class="row">
                <div class="table-cont">
                  <table class="table">
                    <thead>
                      <tr>
                        <template v-for="(item, props, index) in headers">
                          <th :key="index" v-show="item" style="z-index: 1000">{{$t(`so.${props}`)}}</th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,i) in soDetails">
                        <td style="min-width:180px; z-index: 1">
                          <el-select v-model="soDetails[i].productCode"
                                     filterable remote reserve-keyword
                                     :remote-method="filterProductItem"
                                     name="productItem"
                                     v-validate="'required'"
                                     :placeholder="$t('choose')"
                                     :disabled="!disabled.edit"
                                     style="width:100%"
                                     @change="handleChangeProdItem(i)">
                            <el-option v-for="(item, i) in productItemList.data"
                                       :key="i"
                                       :label="item.productCode + ' | ' + item.name"
                                       :value="item.productCode">
                            </el-option>
                          </el-select>
                        </td>
                        <td style="min-width:180px;">
                          <input type="text" class="form-control" :placeholder="$t('so.unit')" v-model="soDetails[i].unit" disabled/>
                        </td>
                        <td style="min-width:180px;">
                          <input type="number" class="form-control" :placeholder="$t('so.price')" v-model="soDetails[i].price" disabled @change="handleChangeValue" />
                        </td>
                        <td style="min-width:180px;">
                          <input type="number" class="form-control" :placeholder="$t('so.quantity')" :disabled="!disabled.edit" v-model="soDetails[i].quantity" @change="handleChangeValue" />
                        </td>
                        <td style="min-width:180px; vertical-align: middle !important;">
                          <span>{{(soDetails[i].quantity * soDetails[i].price) | currency}}</span>
                        </td>
                        <td style="min-width:180px; vertical-align: middle !important;">
                          <input type="checkbox" :disabled="!disabled.edit" v-model="soDetails[i].freeItem" class="custorm-checkbox" @click="handleChangeValue">
                        </td>
                        <td style="vertical-align: middle !important;">
                          <el-tooltip :content="$t('close')" placement="top" effect="dark">
                            <i class="icon-cross pointer" style="margin-left:15px" :disabled="!disabled.edit" @click="removeSODetail(i)"></i>
                          </el-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="col-md-12" style="margin-top: 50px;">
                <fieldset class="content-group">
                  <fieldset class="col-md-7 col-md-offset-5">
                    <legend class="text-bold mt-20">{{$t('so.totalHeader')}}</legend>
                    <div class="col-md-12 mb-20">
                      <div class="col-md-5">
                        {{$t('so.subTotalAmount')}}
                      </div>
                      <div class="col-md-7 text-right">{{showDataTotal.subTotalAmount | currency}}</div>
                    </div>
                    <hr style="border: 0.5px lightgrey dashed;">
                    <div class="col-md-12 mb-20">
                      <div class="col-md-5">
                        {{$t('so.vatAmount')}}
                      </div>
                      <div class="col-md-7 text-right">{{formData.soHeader.vatAmount + '%'}}</div>
                    </div>
                    <hr style="border: 0.5px lightgrey dashed;">
                    <div class="col-md-12 mb-20">
                      <div class="col-md-5">
                        {{$t('so.discount')}}
                      </div>
                      <div class="col-md-7 text-right" v-if="formData.soHeader.discountType == 3 || formData.soHeader.discountType == 4">{{formData.soHeader.discount | currency}}</div>
                      <div class="col-md-7 text-right" v-else>{{ formData.soHeader.discount + '%'}}</div>
                    </div>
                    <hr style="border: 1px lightgrey solid;">
                    <div class="col-md-12 mb-20">
                      <div class="col-md-5">
                        {{$t('so.lastTotal')}}
                      </div>
                      <div class="col-md-7 text-right">{{showDataTotal.totalAmount | currency}}</div>
                    </div>
                    <div class="col-md-12 mb-20">
                      <div class="col-md-5 text-lv-2">
                        {{$t('so.lastTotalString')}}
                      </div>
                      <div class="col-md-7 text-right text-lv-2">{{showDataTotal.totalAmountToString}}</div>
                    </div>
                  </fieldset>
                </fieldset>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div style="float:right;margin-top:10px;">
              <router-link :to="$route.params.leadId ? '/lead' : '/so/header'" class="btn btn-default" :disabled="!disabled.edit">
                {{$t('back')}}
              </router-link>
              <button class="btn btn-primary" :disabled="errors.items.length > 0 || loading || !disabled.edit" @click="validateBeforeSubmit()">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
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
  import commonData from '@/utils/common-data'
  import address from 'components/common/address';
  export default {
    components: {
      "title-bar": TitleBar,
      'address-twin': address
    },
    data() {
      return {
        commonData,
        leadBuyerList: {},
        changeValue: false,
        companyId: '',
        formData: {
          soHeader: {
            salesman: '',
            buyer: {
              leadId: null,
            },
            status: 0,
            discountType: 1,
            vatAmount: 0,
            discount: 0
          },
          soDetails: [],
        },
        columns: [
          "Salesman",
          "TeamId",
          "Buyer",
          "SoDate",
          "SubTotalAmount",
          "VatAmount",
          "Status",
          "Note",
          "Discount",
          "DiscountType"
        ],
        loading: false,
        vm: {
          Address: {}
        },
        users: [],
        companies: [],
        productItemList: {},
        soDetails: [],
        showDataTotal: {
          subTotalAmount: 0,
          totalAmount: 0,
          totalAmountToString: ''
        },
        a: ['', 'một ', 'hai ', 'ba ', 'bốn ', 'năm ', 'sáu ', 'bảy ', 'tám ', 'chín ', 'mười ', 'mười một ', 'mười hai ', 'mười ba ', 'mười bốn ', 'mười lăm ', 'mười sáu ', 'mười bảy ', 'mười tám ', 'mười chín '],
        b: ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi']
      };
    },
    computed: {
      ...mapGetters({
        currentSO: "$_editSO/currentSO",
        userList: "$_editSO/getUsers",
        getTeam: "$_editSO/getTeam",
        currentUser: 'common/currentUser',
        currentCompany: '$_editSO/getCurrentCompany'
      }),
      ...mapState({
        searchRequest: state => state.$_editSO.searchRequest,
        headers: state => state.$_editSO.headers,
        team: state => state.$_editSO.team,
        soData: state => state.$_editSO.soData
      }),
      disabled() {
        return this.currentUser.accessRight.so;
      }
    },
    watch: {
      "vm.Address.formatted_address": function (val) {
        this.formData.soHeader.buyer.address = val;
      },
      "changeValue": function (val) {
        var _this = this;
        _this.showDataTotal.subTotalAmount = 0;
        _this.soDetails.forEach(function (value) {
          if (value.freeItem == false) {
            _this.showDataTotal.subTotalAmount += (value.price * value.quantity);
          }
        })
        _this.showDataTotal.totalAmount = 0;
        if (_this.showDataTotal.subTotalAmount > 0) {
          if (_this.formData.soHeader.discountType == 1) {
            _this.showDataTotal.totalAmount = _this.showDataTotal.subTotalAmount + (_this.showDataTotal.subTotalAmount * (_this.formData.soHeader.vatAmount / 100)) - (_this.showDataTotal.subTotalAmount * (_this.formData.soHeader.discount / 100));
          } else if (_this.formData.soHeader.discountType == 3) {
            _this.showDataTotal.totalAmount = _this.showDataTotal.subTotalAmount + (_this.showDataTotal.subTotalAmount * (_this.formData.soHeader.vatAmount / 100)) - (_this.formData.soHeader.discount);
          } else if (_this.formData.soHeader.discountType == 2) {
            var totalWithoutDiscount = _this.showDataTotal.subTotalAmount + (_this.showDataTotal.subTotalAmount * (_this.formData.soHeader.vatAmount / 100));
            _this.showDataTotal.totalAmount = totalWithoutDiscount - (totalWithoutDiscount * (_this.formData.soHeader.discount / 100));
          } else {
            var totalWithoutDiscount = _this.showDataTotal.subTotalAmount + (_this.showDataTotal.subTotalAmount * (_this.formData.soHeader.vatAmount / 100));
            _this.showDataTotal.totalAmount = totalWithoutDiscount - _this.formData.soHeader.discount;
          }
        }
        _this.showDataTotal.totalAmountToString = _this.formatMoneyToString(_this.showDataTotal.totalAmount);
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editSO";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("$_editSO/getTeam");
      _this.productItemList = await _this.$store.dispatch("$_editSO/getProductItemList");
      _this.companies.push(_this.currentCompany);
      _this.companyId = _this.currentCompany.id;
      _this.users = _this.userList;

      if (_this.$route.params.soHeaderId) {
        await _this.$store.dispatch("common/setTitle", _this.$t('so.updateHeader'));
        await _this.$store.dispatch("$_editSO/getSO", _this.$route.params.soHeaderId);
        _this.formData = _.cloneDeep(_this.soData);
        if (_this.formData.soHeader.teamId) { _this.handleChangeTeam(_this.formData.soHeader.teamId) }
        _this.formData.soHeader.salesman = _this.soData.soHeader.salesman;
        _this.leadBuyerList = await _this.$store.dispatch("$_editSO/getLead", _this.currentSO.soHeader.buyer.leadId);
        _this.soDetails = _this.formData.soDetails;
        _this.handleChangeValue();
      } else {
        await _this.$store.dispatch("common/setTitle", _this.$t('so.createHeader'));
        _this.leadBuyerList = await _this.$store.dispatch("$_editSO/getListLeads");
        _this.formData.soHeader.salesman = _this.currentUser.id;
        _this.formData.soHeader.teamId = _this.currentUser.teamIds[0] ? _this.currentUser.teamIds[0] : '';
        if (_this.$route.params.leadId) {
          _this.formData.soHeader.buyer.leadId = _this.$route.params.leadId;
          _this.leadBuyerList = await _this.$store.dispatch("$_editSO/getLead", _this.formData.soHeader.buyer.leadId);
          _this.handleChangeBuyerData();
        }
      }
    },
    methods: {
      formatMoneyToString: function (num) {
        var _this = this;
        if ((num = num.toString()).length > 12) return 'Số tiền quá lớn';
        var n = ('000000000000' + num).substr(-12).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return;
        var str = '';
        str += (n[1] != 0) ? (_this.a[Number(n[1])] || _this.b[n[1][0]] + ' ' + _this.a[n[1][1]]) + 'trăm ' : '';
        str += (n[2] != 0) ? (_this.a[Number(n[2])] || _this.b[n[2][0]] + ' ' + _this.a[n[2][1]]) + 'tỷ ' : '';
        str += (n[3] != 0) ? (_this.a[Number(n[3])] || _this.b[n[3][0]] + ' ' + _this.a[n[3][1]]) + 'trăm ' : '';
        str += (n[4] != 0) ? (_this.a[Number(n[4])] || _this.b[n[4][0]] + ' ' + _this.a[n[4][1]]) + 'triệu ' : '';
        str += (n[5] != 0) ? (_this.a[Number(n[5])] || _this.b[n[5][0]] + ' ' + _this.a[n[5][1]]) + 'trăm ' : '';
        str += (n[6] != 0) ? (_this.a[Number(n[6])] || _this.b[n[6][0]] + ' ' + _this.a[n[6][1]]) + 'ngàn ' : '';
        str += (n[7] != 0) ? (_this.a[Number(n[7])] || _this.b[n[7][0]] + ' ' + _this.a[n[7][1]]) + 'trăm ' : '';
        str += (n[8] != 0) ? (_this.a[Number(n[8])] || _this.b[n[8][0]] + ' ' + _this.a[n[8][1]]) + 'đồng ' : '';
        return str;
      },
      handleChangeValue: function () {
        this.changeValue = !this.changeValue;
      },
      getAddress: function (val) { this.formData.buyer.address = val; },
      filterLeadBuyer: _.debounce(async function (query) {
        var _this = this;
        _this.searchRequest.description = query;
        _this.leadBuyerList = await _this.$store.dispatch("$_editSO/getListLeads");
      }, 200),
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              if (_this.$route.params.soHeaderId) _this.formData.columns = _this.columns;
              _this.formData.soDetails = _this.soDetails;
              let response = _this.$route.params.soHeaderId ? await _this.$store.dispatch("$_editSO/updateSO", _this.formData) : await _this.$store.dispatch("$_editSO/createSO", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$route.params.leadId ? _this.$router.push("/lead") : _this.$router.push("/so/header");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      handleChangeBuyerData: function () {
        var _this = this;
        if (_this.formData.soHeader.buyer.leadId) {
          var data = _.find(_this.leadBuyerList.data, function (o) { return o.id == _this.formData.soHeader.buyer.leadId; });
          _this.formData.soHeader.buyer.name = data.fullName;
          _this.formData.soHeader.buyer.phone = data.phone;
          _this.formData.soHeader.buyer.email = data.email;
          _this.formData.soHeader.buyer.address = data.address;
        }
      },
      handleChangeTeam: function (val) {
        var _this = this;
        _this.users = _.cloneDeep(_this.userList);
        if (val) {
          _this.formData.soHeader.salesman = "";
          _this.users = _.filter(_this.users, (o) => { return _.indexOf(o.teamIds, val) > -1 });
        }
      },
      handleChangeProdItem: function (index) {
        var _this = this;
        var data = _.find(_this.productItemList.data, function (o) { return o.productCode == _this.soDetails[index].productCode });
        _this.soDetails[index].productName = data.name;
        _this.soDetails[index].unit = data.unit;
        _this.soDetails[index].price = data.price;
        _this.handleChangeValue();
      },
      filterProductItem: _.debounce(async function (query) {
        var _this = this;
        _this.searchRequest.description = query;
        _this.productItemList = await _this.$store.dispatch("$_editSO/getProductItemList");
      }, 200),
      createNewSODetails: function () {
        var _this = this;
        if (_this.soDetails.length) {
          if (!_.isEmpty(_this.soDetails[_this.soDetails.length - 1]) &&
            _this.soDetails[_this.soDetails.length - 1].productCode) {
            _this.soDetails.push({ productCode: '', price: 0, quantity: 0, note: '', freeItem: false });
          }
        } else {
          _this.soDetails.push({ productCode: '', price: 0, quantity: 0, note: '', freeItem: false });
        }
      },
      removeSODetail: function (index) {
        var _this = this;
        _this.soDetails.splice(index, 1);
        _this.handleChangeValue();
      },
      deleteAllSODetails: function () {
        var _this = this;
        _this.soDetails = [];
        _this.handleChangeValue();
      },
    }
  };
</script>

