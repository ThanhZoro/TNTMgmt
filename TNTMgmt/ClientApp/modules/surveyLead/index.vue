<template>
  <div>
    <title-bar :langTitle="$t('leadList.surveyLead')"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div class="panel panel-flat">
        <div class="panel-heading" v-if="nameSurvey">
          <h5 class="panel-title">{{nameSurvey.name}}</h5>
          <div class="heading-elements">
            <router-link to="/lead" class="btn btn-default">
              {{$t('back')}}
            </router-link>
            <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
          </div>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-xs-12 col-md-3" v-if="leadInfo">
              <ul class="pl-4">
                <li>{{$t('userList.fullName')}}: {{leadInfo.fullName}}</li>
                <li>{{$t('userList.phone')}}: {{leadInfo.phone}}</li>
              </ul>
            </div>
            <div class="col-xs-12 col-md-3" v-if="leadInfo">
              <ul class="pl-4">
                <li>{{$t('userList.email')}}: {{leadInfo.email}}</li>
                <li>{{$t('address')}}: {{leadInfo.address || $t('notAvailable')}}</li>
              </ul>
            </div>
          </div>
          <div class="form-horizontal">
            <fieldset class="content-group">
              <legend class="text-bold">{{$t('leadList.surveyTable')}}</legend>
              <div class="row">
                <div class="col-md-12">
                  <div v-for="(item,i) in review">
                    <survey :item="item" :keyValue="item.id"></survey>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="text-right" v-show="review.length > 0">
            <router-link to="/lead" class="btn btn-default">
              {{$t('back')}}
            </router-link>
            <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /bordered panel body table -->
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  import Survey from "./_components/survey"
  import commonFunc from "@/utils/common-func";
  export default {
    components: {
      "title-bar": TitleBar,
      "survey": Survey
    },
    data() {
      return {
        data: null,
        loading: false,
        modelChecbox: [],
        review: [],
        modelRadio: {},
        nameSurvey: null,
        leadInfo: null,
      };
    },
    computed: {
      ...mapGetters({
        surveyLead: "$_surveyLead/surveyLead",
        formData: "$_surveyLead/surveyLeadData",
      }),
      ...mapState({
        surveyId: state => state.common.companyInfo.otherSettings.surveyId,
        name: state => state.$_surveyLead.nameSurvey,
        lead: state => state.$_surveyLead.leadInfo
      })
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_surveyLead";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch('$_surveyLead/getLeadSurvey', { leadId: _this.$route.params.id, surveyHeaderId: _this.surveyId });
      _this.review = _.cloneDeep(_this.surveyLead);
      _this.nameSurvey = _.cloneDeep(_this.name);
      _this.leadInfo = _.cloneDeep(_this.lead);
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.leadId = _this.$route.params.id;
              _this.formData.surveyHeaderId = _this.surveyId;
              await _this.$store.dispatch('$_surveyLead/updateSurveyLead', _this.formData);
              
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/lead");
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
