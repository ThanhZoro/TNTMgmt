<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('so.updateHeader') : $t('so.createHeader')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('so.updateHeader') : $t('so.createHeader')}}</h5>
        <div class="heading-elements">
          <router-link to="/so/header" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">
                <legend class="text-bold">{{$t('so.salesmanInfo')}}</legend>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('screen.team')}}</label>
                  <div class="col-lg-10">
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
                  <div class="col-lg-10">
                    <el-select v-model="formData.salesman"
                               filterable clearable remote reserve-keyword
                               :placeholder="$t('choose')"
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
              </fieldset>

              <fieldset class="content-group">
                <legend class="text-bold">{{$t('so.buyerInfo')}}</legend>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.buyer')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.buyer.leadId"
                               filterable
                               clearable
                               remote
                               reserve-keyword
                               :remote-method="filterLeadBuyer"
                               :placeholder="$t('so.chooseFromLead')"
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
                  <div class="col-lg-10">
                    <input type="text" :placeholder="$t('leadsPage.fullName')" class="form-control" v-model="formData.buyer.name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.phone')}}</label>
                  <div class="col-lg-10">
                    <input type="text" :placeholder="$t('leadsPage.phone')" class="form-control" v-model="formData.buyer.phone">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.email')}}</label>
                  <div class="col-lg-10">
                    <input type="text" :placeholder="$t('leadsPage.email')" class="form-control" v-model="formData.buyer.email">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadsPage.address')}}</label>
                  <div class="col-lg-10">
                    <input name="address" class="form-control" :placeholder="$t('placeHolderAddress')" type="text" v-model="formData.buyer.address" v-gmaps-searchbox:Address.formatted_address=vm>
                  </div>
                </div>
              </fieldset>

              <fieldset class="content-group">
                <legend class="text-bold">{{$t('so.genaralInfo')}}</legend>
                <div :class="`form-group ${errors.has('soDate') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('so.sODate')}} *</label>
                  <div class="col-lg-10">
                    <el-date-picker v-model="formData.soDate"
                                    type="date"
                                    name="soDate"
                                    v-validate="'required'"
                                    style="width:100%"
                                    :placeholder="$t('so.sODate')">
                    </el-date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.status')}} </label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.status"
                               filterable
                               clearable
                               :placeholder="$t('choose')"
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
                    <input class="form-control" :placeholder="$t('so.vatAmount')" type="number" v-model="formData.vatAmount">
                    <div class="form-control-feedback">
                      <span style="font-weight: bold">%</span>
                    </div>
                  </div>
                </div>
                <div class="form-group has-feedback">
                  <label class="control-label col-lg-2">{{$t('so.discount')}}</label>
                  <div class="col-lg-10">
                    <input class="form-control" :placeholder="$t('so.discount')" type="number" v-model="formData.discount">
                    <div class="form-control-feedback">
                      <span style="font-weight: bold">%</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.note')}}</label>
                  <div class="col-lg-10">
                    <input class="form-control" :placeholder="$t('so.note')" type="text" v-model="formData.note">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/so/header" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
        <!-- /bordered panel body table -->
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
        leadBuyerList: {},
        formData: {
          salesman: '',
          buyer: {
            leadId: null,
          },
          status: 0,
        },
        loading: false,
        vm: {
          Address: {}
        },
        users: []
      };
    },
    computed: {
      ...mapGetters({
        currentSOHeader: "$_editSOHeader/currentSOHeader",
        userList: "$_editSOHeader/getUsers",
        getTeam: "$_editSOHeader/getTeam"
      }),
      ...mapState({
        searchRequest: state => state.$_editSOHeader.searchRequest,
        team: state => state.$_editSOHeader.team
      })
    },
    watch: {
      "vm.Address.formatted_address": function (val) {
        this.formData.address = val;
      },
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editSOHeader";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("$_editSOHeader/getTeam");

      await _this.$store.dispatch("common/setTitle", _this.$t('so.createHeader'));
      _this.leadBuyerList = await _this.$store.dispatch("$_editSOHeader/getListLeads");
      _this.users = _this.userList;
    },
    methods: {
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
              console.log(error.response);
              new PNotify({
                title: '',
                text: _this.$t('saveFailed'),
                addclass: 'bg-danger'
              });
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
    }
  };
</script>

