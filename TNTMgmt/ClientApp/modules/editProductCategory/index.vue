<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('productCategory.updateProductCategory') : $t('productCategory.createProductCategory')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('productCategory.updateProductCategory') : $t('productCategory.createProductCategory')}}</h5>
        <div class="heading-elements">
          <router-link to="/product/category" class="btn btn-default">
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
                  <label class="control-label col-lg-2">{{$t('productCategory.categoryCode')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="categoryCode" v-validate="'required'" :disabled="!disabled.edit" :placeholder="$t('productCategory.categoryCode')" :data-vv-as="$t('productCategory.categoryCode')" class="form-control" v-model="formData.categoryCode">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('productCategory.name')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" v-validate="'required'" :disabled="!disabled.edit" :placeholder="$t('productCategory.name')" :data-vv-as="$t('productCategory.name')" class="form-control" v-model="formData.name">
                  </div>
                </div>

                <!--Status-->
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('productCategory.status')}} </label>
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
                                 :label="$t('productCategory.' + item.value)"
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
          <router-link to="/product/category" class="btn btn-default">
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
        },
        columns: [
          "CategoryCode",
          "Name",
          "Status"
        ],
        loading: false,
      };
    },
    computed: {
      ...mapGetters({
        currentProductCategory: "$_editProductCategory/currentProductCategory",
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
      const STORE_KEY = "$_editProductCategory";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.$route.params.id) {
        await _this.$store.dispatch("common/setTitle", _this.$t('productCategory.updateProductCategory'));
        await _this.$store.dispatch("$_editProductCategory/getProductCategory", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentProductCategory);
      } else {
        await _this.$store.dispatch("common/setTitle", _this.$t('productCategory.createProductCategory'));
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              if (_this.$route.params.id) {
                _this.formData.columns = _this.columns;
              }
              let response = _this.$route.params.id ? await _this.$store.dispatch("$_editProductCategory/updateProductCategory", _this.formData) : await _this.$store.dispatch("$_editProductCategory/createProductCategory", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/product/category");
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

