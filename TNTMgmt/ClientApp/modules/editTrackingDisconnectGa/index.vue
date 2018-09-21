<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('tracking.updateTracking') : $t('tracking.createTracking')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('tracking.updateTracking') : $t('tracking.createTracking')}}</h5>
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
                  <label class="control-label col-lg-2">{{$t('tracking.trackingName')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :placeholder="$t('tracking.placeholdelTrackingName')" v-validate="'required'" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('webPropertyId') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('tracking.propertyId')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="webPropertyId" :placeholder="$t('tracking.placeHolderProperty')" v-validate="'required'" class="form-control" v-model="formData.webPropertyId">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('website') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('trackingPage.website')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="website" :placeholder="$t('tracking.placeHolderWebsite')" v-validate="'required|url:require_protocol'" class="form-control" v-model="formData.websiteUrl">
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
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {
          active: false
        },
        loading: false,
      };
    },
    computed: {
      ...mapGetters({

      }),
      ...mapState({
        currentTracking: state => state.$_editTrackingDisconnectGa.tracking,
      })
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editTrackingDisconnectGa";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$route.params.id ? _this.$t('tracking.updateTracking') : _this.$t('tracking.createTracking'));
      if (_this.$route.params.id) {
        await _this.$store.dispatch("$_editTrackingDisconnectGa/getTracking", _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.currentTracking);
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1);
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              var response = await _this.$store.dispatch('$_editTrackingDisconnectGa/editTracking', _this.formData);
              _this.$router.push(`/ga/${response.data.id}`);
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
    }
  };
</script>
