<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('surveyList.editName') :$t('surveyList.createName')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('surveyList.editName') :$t('surveyList.createName')}}</h5>
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
                  <label class="control-label col-lg-2">{{$t('surveyList.name')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :placeholder="$t('surveyList.name')" v-validate="'required'" class="form-control" v-model="formData.name">
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
        formData: {},
        loading: false,
      };
    },
    computed: {
      ...mapGetters({        
      }),
      ...mapState({
        survey: state => state.$_editSurveyName.survey
      })
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editSurveyName";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.$route.params.id) {
        await _this.$store.dispatch('$_editSurveyName/getSurvey', _this.$route.params.id);
        _this.formData = _.cloneDeep(_this.survey);
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
              var response = await _this.$store.dispatch('$_editSurveyName/editSurvey', _this.formData);
              _this.back();
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
