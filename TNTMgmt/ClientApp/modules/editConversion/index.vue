<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('conversion.edit') : $t('conversion.create')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('conversion.edit') : $t('conversion.create')}}</h5>
        <div class="heading-elements">
          <button @click="back()" class="btn btn-default">
            {{$t('back')}}
          </button>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group" v-if="formData">
                <div class="form-group">
                  <label class="control-label col-lg-2 blue--text font-size-16">{{$t('crm')}}</label>
                </div>

                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('conversion.name')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" v-validate="'required'" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('conversion.type')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.type"
                               filterable
                               clearable
                               remote
                               :placeholder="''"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in commonData.typeCRM"
                                 :key="item.value"
                                 :label="$t(item.value)"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('conversion.value')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.value"
                               filterable
                               clearable
                               remote
                               :placeholder="''"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item,i) in status"
                                 :key="i"
                                 :label="item.dataValue"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2 blue--text font-size-16">{{$t('googleAnalytics')}}</label>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('conversion.categoryName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" class="form-control" v-model="formData.category">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('conversion.actionName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" class="form-control" v-model="formData.action">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('conversion.labelName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" class="form-control" v-model="formData.label">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadList.activity')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.active">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <button @click="back()" class="btn btn-default">
            {{$t('back')}}
          </button>
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
        formData: {
          type: '', value: '',
          trackingId: this.$route.params.gaId,
          active : true
        },
        loading: false,
        commonData
      };
    },
    computed: {
      ...mapGetters({
        status: '$_editConversion/status'
      }),
      ...mapState({
        currentConversion: state => state.$_editConversion.currentConversion
      })
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              if (_this.formData.category || _this.formData.label || _this.formData.action) {
                var response = await _this.$store.dispatch('$_editConversion/editConversion', { data: _this.formData});
                new PNotify({
                  title: '',
                  text: _this.$t('saveSuccessfully'),
                  addclass: 'bg-success'
                });
                _this.back();
              } else {
                new PNotify({
                  title: '',
                  text: _this.$t('conversion.mandatoryGA'),
                  addclass: 'bg-danger'
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      back: function () {
        this.$router.go(-1);
      },
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editConversion";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$route.params.id ? _this.$t('conversion.edit') : _this.$t('conversion.create'));
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editConversion/getconversion', { id: _this.$route.params.id });
        _this.formData = _.cloneDeep(_this.currentConversion);
      }
    },
  };
</script>
