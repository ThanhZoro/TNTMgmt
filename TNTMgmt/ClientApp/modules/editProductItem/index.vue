<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('productItem.updateProductItem') : $t('productItem.createProductItem')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('productItem.updateProductItem') : $t('productItem.createProductItem')}}</h5>
        <div class="heading-elements">
          <router-link to="/product/item" class="btn btn-default">
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

                <div :class="`form-group ${errors.has('categoryCode') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('productItem.productCode')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="productCode" v-validate="'required'" :disabled="!disabled.edit" :placeholder="$t('productItem.productCode')" :data-vv-as="$t('productItem.productCode')" class="form-control" v-model="formData.productCode">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('productItem.name')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" v-validate="'required'" :disabled="!disabled.edit" :placeholder="$t('productItem.name')" :data-vv-as="$t('productItem.name')" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('productItem.productCategoryId')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.productCategoryId"
                               filterable clearable remote reserve-keyword
                               :placeholder="$t('choose')"
                               :disabled="!disabled.edit"
                               style="width:100%">
                      <el-option v-for="(item, i) in productCategoryList"
                                 :key="i"
                                 :label="item.categoryCode + ' | ' + item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('productItem.unit')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="unit" :disabled="!disabled.edit" :placeholder="$t('productItem.unit')" class="form-control" v-model="formData.unit">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('productItem.price')}}</label>
                  <div class="col-lg-10">
                    <input type="number" name="price" :disabled="!disabled.edit" :placeholder="$t('productItem.price')" class="form-control" v-model="formData.price">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('productItem.desc')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="desc" :disabled="!disabled.edit" :placeholder="$t('productItem.desc')" class="form-control" v-model="formData.desc">
                  </div>
                </div>

                <!--Status-->
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('productItem.status')}} </label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.status"
                               filterable
                               clearable
                               :placeholder="$t('choose')"
                               :disabled="!disabled.edit"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in commonData.statusProduct"
                                 :key="i"
                                 :label="$t('productItem.' + item.value)"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/product/item" class="btn btn-default">
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
  import commonData from '@/utils/common-data'
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        commonData,
        formData: {
          status: '',
          productCategoryId: ''
        },
        loading: false,
        productCategoryList: [],
        columns: [
          "Name",
          "Unit",
          "Price",
          "Desc",
          "Status",
          "ProductCode",
          "ProductCategoryId"
        ]
      };
    },
    computed: {
      ...mapGetters({
        currentProductItem: "$_editProductItem/currentProductItem",
        currentUser: 'common/currentUser'
      }),
      ...mapState({
      }),
      disabled() {
        return this.currentUser.accessRight.product;
      }
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editProductItem";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.productCategoryList = await _this.$store.dispatch("$_editProductItem/getProductCategory");
      if (_this.$route.params.id) {
        await _this.$store.dispatch("common/setTitle", _this.$t('productItem.updateProductItem'));
        await _this.$store.dispatch("$_editProductItem/getProductItem", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentProductItem);
      } else {
        await _this.$store.dispatch("common/setTitle", _this.$t('productItem.createProductItem'));
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              if (_this.$route.params.id) _this.formData.columns = _this.columns;
              let response = _this.$route.params.id ? await _this.$store.dispatch("$_editProductItem/updateProductItem", _this.formData) : await _this.$store.dispatch("$_editProductItem/createProductItem", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/product/item");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
    }
  };
</script>
