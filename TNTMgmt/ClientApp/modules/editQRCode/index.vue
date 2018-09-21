<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('qrcode.update') : $t('qrcode.create')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{ $route.params.id ? $t('qrcode.update') : $t('qrcode.create') }}</h5>
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
              <fieldset class="content-group">
                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.firstName')}} *</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="text" class="form-control" name="name" v-validate="'required'" v-model="formData.name">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('goalId') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('conversion.title')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.goalId"
                               filterable
                               clearable
                               remote
                               :placeholder="''"
                               style="width:100%"
                               v-validate="'required'"
                               name="goalId"
                               reserve-keyword>
                      <el-option v-for="item in currentConversion"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div :class="`form-group ${errors.has('type') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('conversion.type')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.type"
                               filterable
                               clearable
                               remote
                               :placeholder="''"
                               style="width:100%"
                               v-validate="'required'"
                               name="type"
                               reserve-keyword>
                      <el-option v-for="item in type"
                                 :key="item"
                                 :value="item"
                                 :label="$t(item)">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div :class="`form-group ${errors.has('linkUrl') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('qrcode.linkTo')}} *</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="text" class="form-control" name="linkUrl" v-validate="'required|url:require_protocol'" v-model="formData.linkUrl">
                  </div>
                </div>

                <div class="form-group" v-if="formData.type == 'static' && !errors.has('linkUrl')">
                  <div class="col-lg-10 col-lg-push-2" style="margin-top:5px" v-show="formData.linkUrl != ''">
                    <qriously :value="formData.linkUrl" :size="200" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadList.activity')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.isActive">
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
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {
          name: "",
          trackingId: this.$route.params.gaId,
          goalId: "",
          type: "",
          linkUrl: "",
          isActive: true,
        },
        loading: false,
        type: ["static", "dynamic"]
      };
    },
    computed: {
      ...mapGetters({
      }),
      ...mapState({
        currentConversion: state => _.filter(state.$_editQRCode.currentConversion, (v) => { return v.id }),
        currentQRCodeTracking: state => state.$_editQRCode.currentQRCodeTracking
      })
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              var response = await _this.$store.dispatch('$_editQRCode/editQRCode', _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.back();
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
      const STORE_KEY = "$_editQRCode";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$route.params.id ? _this.$t('qrcode.update') : _this.$t('qrcode.create'));
      await _this.$store.dispatch('$_editQRCode/getConversion', _this.$route.params.gaId);
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editQRCode/getQACode', _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentQRCodeTracking);
      }
    },
  };
</script>
