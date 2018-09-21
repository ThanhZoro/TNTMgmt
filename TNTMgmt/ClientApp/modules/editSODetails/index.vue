<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('so.updateSODetail') : $t('so.createSODetail')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('so.updateSODetail') : $t('so.createSODetail')}}</h5>
        <div class="heading-elements">
          <router-link :to="`/so/header/${$route.params.soHeaderId}/details`" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">

                <div :class="`form-group ${errors.has('productItem') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('so.productItem')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.productCode"
                               filterable clearable remote reserve-keyword
                               :remote-method="filterProductItem"
                               name="productItem"
                               v-validate="'required'" 
                               :placeholder="$t('choose')"
                               :disabled="!disabled.edit"
                               style="width:100%"
                               @change="handleChangeProdItem">
                      <el-option v-for="(item, i) in productItemList.data"
                                 :key="i"
                                 :label="item.productCode + ' | ' + item.name"
                                 :value="item.productCode">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.unit')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="unit" :disabled="!disabled.edit" :placeholder="$t('so.unit')" class="form-control" v-model="formData.unit">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.price')}}</label>
                  <div class="col-lg-10">
                    <input type="number" name="price" :disabled="!disabled.edit" :placeholder="$t('so.price')" class="form-control" v-model="formData.price">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.quantity')}}</label>
                  <div class="col-lg-10">
                    <input type="number" name="quantity" :disabled="!disabled.edit" :placeholder="$t('so.quantity')" class="form-control" v-model="formData.quantity">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('so.note')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="note" :disabled="!disabled.edit" :placeholder="$t('so.note')" class="form-control" v-model="formData.note">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2"></label>
                  <div class="col-lg-10">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" v-model="formData.freeItem" :disabled="!disabled.edit" class="custorm-checkbox">
                        {{$t('so.freeItemDes')}}
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link :to="`/so/header/${$route.params.soHeaderId}/details`" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
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

  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {},
        loading: false,
        productItemList: {},
      };
    },
    computed: {
      ...mapGetters({
        currentSODetail: "$_editSODetail/currentSODetail",
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        searchRequest: state => state.$_editSODetail.searchRequest,
      }),
      disabled() {
        return this.currentUser.accessRight.so;
      }
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editSODetail";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.productItemList = await _this.$store.dispatch("$_editSODetail/getProductItemList");
      if (_this.$route.params.id) {
        await _this.$store.dispatch("common/setTitle", _this.$t('so.updateSODetail'));
        await _this.$store.dispatch("$_editSODetail/getSODetail", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentSODetail);
      } else {
        await _this.$store.dispatch("common/setTitle", _this.$t('so.createSODetail'));
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.soHeaderId = _this.$route.params.soHeaderId;
              let response = _this.$route.params.id ? await _this.$store.dispatch("$_editSODetail/updateSODetail", _this.formData) : await _this.$store.dispatch("$_editSODetail/createSODetail", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/so/header/" + _this.$route.params.soHeaderId + "/details");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      handleChangeProdItem: function () {
        var _this = this;
        var data = _.find(_this.productItemList.data, function (o) { return o.productCode == _this.formData.productCode });
        _this.formData.productName = data.name;
        _this.formData.unit = data.unit;
        _this.formData.price = data.price;
      },
      filterProductItem: _.debounce(async function (query) {
        var _this = this;
        _this.searchRequest.description = query;
        _this.productItemList = await _this.$store.dispatch("$_editSODetail/getProductItemList");
      }, 200),
    }
  };
</script>
