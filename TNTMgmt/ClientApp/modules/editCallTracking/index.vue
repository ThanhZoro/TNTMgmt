<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('call.update') : $t('call.create')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('call.update') : $t('call.create')}}</h5>
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
                <div :class="`form-group ${errors.has('goalId') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('conversion.title')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.goalId"
                               filterable
                               clearable
                               remote
                               :placeholder="$t('choose')"
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
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.onDesktop')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :placeholder="'0973 254 ***'" class="form-control" v-model="formData.labelDesktop">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.onMobile')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :placeholder="'0973 254 654'" class="form-control" v-model="formData.labelMobile">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.afterClick')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" class="form-control" v-model="formData.afterClick">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('phone') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('phone')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="phone" v-validate="'required'" class="form-control" v-model="formData.phoneNumber">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-6 blue--text font-size-16">{{$t('call.designCall')}}</label>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.chooseButton')}}</label>
                  <el-select class="col-lg-10" v-model="formData.callButtonDesign.type">
                    <el-option v-for="item in commonData.type"
                               :key="item"
                               :label="$t(item)"
                               :placeholder="$t('choose')"
                               :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div :class="`form-group ${errors.has('positionButton') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('call.choosePosition')}}</label>
                  <el-select class="col-lg-10" v-model="formData.position" v-validate="'required'" name="positionButton">
                    <el-option v-for="item in commonData.positionButton"
                               :key="item.value"
                               :label="$t(`call.${item.value}`)"
                               :placeholder="$t('choose')"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.chooseColor')}}</label>
                  <div class="col-lg-10">
                    <el-dropdown trigger="click" @command="changeColor">
                      <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,i) in commonData.color" :key="i" :command="item"><div v-bind:style="{ backgroundColor: item, width: '23px',height:'23px',marginBottom:'10px',borderRadius:'50%' }"></div></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <div v-if="formData.callButtonDesign.color" style="display:inline-block">
                      <div v-bind:style="{ backgroundColor: formData.callButtonDesign.color, width: '30px',height:'30px',borderRadius:'50%',position:'absolute',top:'-5px',marginLeft:'15px' }"></div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.chooseIcon')}}</label>
                  <div class="col-lg-10">
                    <el-dropdown trigger="click" @command="changeIcon">
                      <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,i) in commonData.icon" :key="i" :command="item"><i v-bind:class="item"></i></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <div v-if="formData.callButtonDesign.icon" style="display:inline-block">
                      <i v-bind:class="formData.callButtonDesign.icon"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('call.border')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.callButtonDesign.isBorder">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('leadList.activity')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="checkbox" class="custorm-checkbox" name="active" v-model="formData.isActive">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('positionX') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('call.positionX')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="number" class="form-control" v-validate="'required'" name="positionX" v-model="formData.positionX">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('positionY') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('call.positionY')}}</label>
                  <div class="col-lg-10" style="margin-top:5px">
                    <input type="number" class="form-control" v-validate="'required'" name="positionY" v-model="formData.positionY">
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
          goalId: '',
          trackingId: this.$route.params.gaId,
          callButtonDesign: {
            type: '',
            isBorder: false,
            icon: '',
            color: '',
          },
          isActive: true,
        },
        loading: false,
        commonData
      };
    },
    computed: {
      ...mapGetters({
      }),
      ...mapState({
        currentConversion: state => _.filter(state.$_editCallTracking.currentConversion, (v) => { return v.id }),
        currentCallTracking: state => state.$_editCallTracking.currentCallTracking
      })
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              var response = await _this.$store.dispatch('$_editCallTracking/editCall', _this.formData);
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
      changeColor(color) {
        this.formData.callButtonDesign.color = color;
      },
      changeIcon(icon) {
        this.formData.callButtonDesign.icon = icon;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editCallTracking";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$route.params.id ? _this.$t('call.update') : _this.$t('call.create'));
      await _this.$store.dispatch('$_editCallTracking/getConversion', _this.$route.params.gaId);
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editCallTracking/getCall', _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentCallTracking);
      }

    },
  };
</script>
