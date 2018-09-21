<template>
  <div>
    <title-bar :langTitle="$t('surveyPage.surveyList')"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div class="">
        <div class="panel-heading">
          <h5 class="panel-title" >{{$t('surveyPage.surveyList')}}</h5>
          <div class="heading-elements">

            <button @click="back()" class="btn btn-default">
              {{$t('back')}}
            </button>
            <router-link to="details/edit">
              <button class="btn btn-primary" :disabled="!disabled.edit">
                {{$t('createNew')}}
              </button>
            </router-link>
          </div>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-4">
              <div class="panel panel-body">
                <fieldset>
                  <legend class="text-semibold" style="font-size: 18px; text-transform: none; ">
                    {{$t('surveyPage.treeSurvey')}}
                    <el-tooltip class="item" effect="dark" :content="$t('saveSort')" placement="top">
                      <button type="button"  class="btn btn-default btn-icon btn-xs" @click="validateBeforeSubmit" :disabled="loading || disabledButton || !disabled.edit" style="float:right"><i class="icon-checkmark3 "></i></button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('surveyPage.undo')" placement="top">
                      <button type="button" class="btn btn-default btn-icon btn-xs" @click="resetTree()" :disabled="loading || disabledButton" style="float:right; margin-right:5px"><i class="icon-undo "></i></button>
                    </el-tooltip>
                  </legend>
                  <el-tree :data="data"
                           node-key="id"
                           default-expand-all
                           :expand-on-click-node="false"
                           @node-drag-end="handleDragEnd"
                           draggable>
                    <div class="custom-tree-node break-word" slot-scope="{ node, data }" style="width:100%">
                      <div class="col-md-10" v-bind:style="{
                                      fontWeight: data.parentId == '' ? 'bold' : 'normal'}">{{ node.label }}</div>
                      <div style="float:right;">
                        <el-tooltip :content="$t('screen.updateSurvey')" placement="top" effect="dark" v-if="disabled.edit">
                          <router-link :to="`details/edit/${data.id}`" style="margin-right:10px">
                            <i class="icon-pencil7 pointer"></i>
                          </router-link>
                        </el-tooltip>
                        <el-tooltip :content="$t('surveyPage.deleteName')" placement="top" effect="dark" v-if="disabled.edit">
                          <i class="icon-trash pointer" @click="deleteSurveyDetail(data)"></i>
                        </el-tooltip>
                      </div>
                    </div>
                  </el-tree>
                </fieldset>
              </div>
            </div>
            <div class="col-md-8">
              <div class="panel panel-body">
                <fieldset>
                  <legend class="text-semibold"  style="font-size: 18px; text-transform: none; padding-bottom:24px">{{$t('editSurvey.preview')}}</legend>
                  <div v-for="(item,key) in review">
                    <survey :item="item" :keyValue="item.id"></survey>
                  </div>
                </fieldset>
              </div>
            </div>
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
        sortItems: [],
        ids: [],
        elementTree: null,
        review: null,
        disabledButton: true
      };
    },
    computed: {
      ...mapGetters({
        currentSurveyDetail: "$_surveyDetail/currentSurveyDetail",
        currentUser: 'common/currentUser'
      }),
      ...mapState({
        surveyId: state => state.$_surveyDetail.surveyId,
        option: state => state.$_surveyDetail.option,
        surveyDetail: state => state.$_surveyDetail.surveyDetail,
        searchRequest: state => state.$_surveyDetail.searchRequest
      }),
      disabled() {
        return this.currentUser.accessRight.survey;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_surveyDetail";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.searchRequest.id != _this.$route.params.surveyId) {
        await _this.$store.dispatch('$_surveyDetail/getSurveyDetail', _this.$route.params.surveyId);
        _this.searchRequest.id = _this.$route.params.surveyId;
      }
      await _this.$store.dispatch('$_surveyDetail/changeNumberSurveyList', { surveyDetail: _this.surveyDetail, surveyId: _this.$route.params.surveyId});  
      _this.data = _.cloneDeep(_this.currentSurveyDetail);
      _this.elementTree = _.cloneDeep(_this.surveyDetail);
      _this.review = _this.data;
    },
    watch: {
      data: {
        handler: function (after, before) {
          var _this = this;
          if (before) _this.disabledButton = false;
        },
        deep: true
      }
    },
    methods: {
      getSort(data, parentId =null) {
        var _this = this;
        _.forEach(data, (o) => {
          _this.sortItems.push({ id: o.id, parentId: parentId ? parentId : "" });
          _this.sortItems = _.uniqBy(_this.sortItems, function (e) { return e.id; });
          _.forEach(o.children, (v) => {
            _this.sortItems.push({ id: o.id, parentId: v.id });
            if (o.children && o.children.length) { return _this.getSort(o.children,o.id) }
          })
        });
      },
      getIds(data) {
        var _this = this;
        _this.ids.push(data.id);
        _this.ids = _.uniqBy(_this.ids, function (e) { return e; });
        if (data.children) {
          _.forEach(data.children, (v) => {
            _this.ids.push(v.id);
            if (v.children && v.children.length) { return _this.getIds(v) }
          });
        }
      },
      async resetTree() {
        var _this = this;
        _this.data = await _.cloneDeep(_this.currentSurveyDetail);
        _this.review = _this.data;
      },
      back: function () {
        this.$router.push('/survey');
      },
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.getSort(_this.data);
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              let response = await _this.$store.dispatch("$_surveyDetail/sortSurveyDetail", { "sortItems": _this.sortItems });
              _this.resetTree();
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.sortItems = [];
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      deleteSurveyDetail: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [data.label]), _this.$t('surveyPage.deleteName'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            _this.ids = [];
            _this.getIds(data);
            var response = await _this.$store.dispatch(`$_surveyDetail/deleteSurveyDetail`, { ids: _this.ids });
            await _this.$store.dispatch('$_surveyDetail/changeNumberSurveyList', { surveyDetail: _this.surveyDetail, surveyId: _this.$route.params.surveyId });  
            _this.resetTree();
            new PNotify({
              title: '',
              text: _this.$t('deleteSuccess'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
          }
          _this.ids = [];
          _this.loading = false;
        }).catch(() => {
        });
      }, 500),
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        var _this = this;
        _this.getSort(_this.data);
        // change parent Id
        _.forEach(_this.elementTree, (o) => {
          var survey = _.find(_this.sortItems, { 'id': o.id });
          var position = _.findIndex(_this.sortItems, { 'id': o.id });
          if (survey) {
            o.parentId = survey.parentId;
            o.ordinal = position;
          }
        });
        _this.sortItems = [];
        var data = _.cloneDeep(_this.elementTree);
        var tree = commonFunc.customizeTree(data);
        _this.review = tree;
      },
    }
  };
</script>
