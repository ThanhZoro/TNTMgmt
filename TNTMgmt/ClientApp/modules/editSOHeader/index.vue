<template>
  <div>
    <fieldset class="content-group">
      <div class="pull-right mb-15" v-if="$route.params.id">
        <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
      </div>
      <div class="row">
        <!-- Bordered panel body table -->
        <div class="col-md-12" v-if="type == 'salesmanInfo'  && formData">
          <div class="content-group">
            <div class="form-group">
              <label class="control-label col-lg-2">{{$t('screen.team')}}</label>
              <div class="col-lg-10 mb-20">
                <el-select v-model="formData.teamId"
                           filterable clearable remote reserve-keyword
                           :placeholder="$t('choose')"
                           style="width:100%"
                           @change="handleChangeTeam(formData.teamId)">
                  <el-option v-for="(item, i) in team"
                             :key="i"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div :class="`form-group ${errors.has('salesman') ? 'has-error' : ''}`">
              <label class="control-label col-lg-2">{{$t('so.salesman')}} *</label>
              <div class="col-lg-10 mb-20 ">
                <el-select v-model="formData.salesman"
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
          </div>
          <div class="col-md-12" v-if="type == 'buyerInfo' && formData">
            <div class="content-group">
              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('so.buyer')}}</label>
                <div class="col-lg-10 mb-20">
                  <el-select v-model="formData.buyer.leadId"
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

              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('leadsPage.fullName')}}</label>
                <div class="col-lg-10 mb-20">
                  <input type="text" :disabled="!disabled.edit" :placeholder="$t('leadsPage.fullName')" class="form-control" v-model="formData.buyer.name">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('leadsPage.phone')}}</label>
                <div class="col-lg-10 mb-20">
                  <input type="text" :disabled="!disabled.edit" :placeholder="$t('leadsPage.phone')" class="form-control" v-model="formData.buyer.phone">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('leadsPage.email')}}</label>
                <div class="col-lg-10 mb-20">
                  <input type="text" :disabled="!disabled.edit" :placeholder="$t('leadsPage.email')" class="form-control" v-model="formData.buyer.email">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('leadsPage.address')}}</label>
                <div class="col-lg-10 mb-20" >
                  <address-twin @nameAddress="getAddress" :address="formData.buyer.address"></address-twin>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-if="type == 'generalInfo'  && formData">
            <div class="content-group">
              <div :class="`form-group ${errors.has('soDate') ? 'has-error' : ''}`">
                <label class="control-label col-lg-2">{{$t('so.sODate')}} *</label>
                <div class="col-lg-10 mb-20">
                  <el-date-picker v-model="formData.soDate"
                                  type="date"
                                  name="soDate"
                                  v-validate="'required'"
                                  style="width:100%"
                                  :placeholder="$t('so.sODate')"
                                  :disabled="!disabled.edit">
                  </el-date-picker>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('so.status')}} </label>
                <div class="col-lg-10 mb-20">
                  <el-select v-model="formData.status"
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
              <div class="form-group has-feedback">
                <label class="control-label col-lg-2">{{$t('so.vatAmount')}}</label>
                <div class="col-lg-10">
                  <input class="form-control" :disabled="!disabled.edit" :placeholder="$t('so.vatAmount')" type="number" v-model="formData.vatAmount">
                  <div class="form-control-feedback">
                    <span style="font-weight: bold">%</span>
                  </div>
                </div>
              </div>
              <div class="form-group has-feedback">
                <label class="control-label col-lg-2">{{$t('so.discount')}}</label>
                <div class="col-lg-10">
                  <input class="form-control" :disabled="!disabled.edit" :placeholder="$t('so.discount')" type="number" v-model="formData.discount">
                  <div class="form-control-feedback">
                    <span style="font-weight: bold">%</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-lg-2">{{$t('so.note')}}</label>
                <div class="col-lg-10 mb-20">
                  <input class="form-control" :disabled="!disabled.edit" :placeholder="$t('so.note')" type="text" v-model="formData.note">
                </div>
              </div>
            </div>
          </div>
          <!-- /bordered panel body table -->
        </div>
    </fieldset>
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
        formData: null,
        loading: false,
        users: []
      };
    },
    computed: {
      ...mapGetters({
        currentSOHeader: "$_editSOHeader/currentSOHeader",
        userList: "$_editSOHeader/getUsers",
        getTeam: "$_editSOHeader/getTeam",
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_editSOHeader.searchRequest,
        team: state => state.$_editSOHeader.team
      }),
      disabled() {
        return this.currentUser.accessRight.so;
      }
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editSOHeader";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("$_editSOHeader/getTeam");
      if (_this.$route.params.id) {
        await _this.$store.dispatch("common/setTitle", _this.$t('so.updateHeader'));
        await _this.$store.dispatch("$_editSOHeader/getSOHeader", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentSOHeader);
        var salesmanIdTemp = _this.formData.salesman;
        _this.leadBuyerList = await _this.$store.dispatch("$_editSOHeader/getLead", _this.currentSOHeader.buyer.leadId);
        _this.handleChangeTeam(_this.formData.teamId);
        _this.formData.salesman = salesmanIdTemp;
      } else {
        await _this.$store.dispatch("common/setTitle", _this.$t('so.createHeader'));
        _this.leadBuyerList = await _this.$store.dispatch("$_editSOHeader/getListLeads");
      }
    },
    methods: {
      getAddress: function (val) {this.formData.buyer.address = val;},
      filterLeadBuyer: _.debounce(async function (query) {
        var _this = this;
        _this.searchRequest.description = query;
        _this.leadBuyerList = await _this.$store.dispatch("$_editSOHeader/getListLeads");
      }, 200),
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              let response = _this.$route.params.id ? await _this.$store.dispatch("$_editSOHeader/updateSOHeader", _this.formData) : await _this.$store.dispatch("$_editSOHeader/createSOHeader", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/so/header");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      handleChangeBuyerData: function () {
        var _this = this;
        if (_this.formData.buyer.leadId) {
          var data = _.find(_this.leadBuyerList.data, function (o) { return o.id == _this.formData.buyer.leadId; });
          _this.formData.buyer.name = data.fullName;
          _this.formData.buyer.phone = data.phone;
          _this.formData.buyer.email = data.email;
          _this.formData.buyer.address = data.address;
        }
      },
      handleChangeTeam: function (val) {
        var _this = this;
        _this.users = _.cloneDeep(_this.userList);
        if (val) {
          _this.formData.salesman = "";
          _this.users = _.filter(_this.users, (o) => { return _.indexOf(o.teamIds, val) > -1 });
        }
      }
    },
    props: ["type"]
  };
</script>

