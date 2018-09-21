<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('screen.updateSurvey') : $t('screen.createSurvey')"></title-bar>
    <div class="content">
      <div class="">
        <div class="panel-heading ">
          <h5 class="panel-title paddingLeft-11 ">{{$route.params.id ? $t('screen.updateSurvey') : $t('screen.createSurvey')}}</h5>
          <div class="heading-elements paddingRight-11">
            <router-link :to="`/survey/${$route.params.surveyId}/details`" class="btn btn-default">
              {{$t('back')}}
            </router-link>
            <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
          </div>
        </div>
        <div class="panel-body">
          <div class="col-md-6">
            <div class="panel panel-body">
              <fieldset class="content-group">
                <legend class="text-semibold mb-20">{{$t('editSurvey.createNew')}}</legend>

                <!--Choose type body-->
                <div class="form-group">
                  <label class="control-label col-lg-12">{{$t('editSurvey.chooseType')}}</label>
                  <div class="col-lg-12 mb-10">
                    <el-select v-model="formData.type"
                               filterable
                               clearable
                               :placeholder="''"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in bodyType"
                                 :key="item.value"
                                 :label="item.value"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!--Create Label-->
                <div :class="`form-group ${errors.has('labelContent') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-12">{{$t('editSurvey.labelContent')}} *</label>
                  <div class="col-lg-12">
                    <input type="text" name="labelContent" :placeholder="$t('editSurvey.labelContent')" class="form-control" v-validate="'required'" v-model="formData.header.text">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-12 mt-10">{{$t('editSurvey.color')}}</label>
                  <div class="col-lg-12">
                    <input type="color" class="form-control" :placeholder="$t('color')" v-model="formData.header.textColor">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-12 mt-10">{{$t('editSurvey.labelFontSize')}}</label>
                  <div class="col-lg-12">
                    <input type="number" name="labelFontSize" :placeholder="$t('editSurvey.labelFontSize')" class="form-control" v-model="formData.header.font.fontSize">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-12 mt-10">{{$t('editSurvey.fontWeight')}}</label>
                  <div class="col-lg-12">
                    <el-select v-model="formData.header.font.fontWeight"
                               filterable
                               clearable
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in commonData.fontWeight"
                                 :key="item"
                                 :label="item"
                                 :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-12 mt-10">{{$t('editSurvey.fontStyle')}}</label>
                  <div class="col-lg-12">
                    <el-select v-model="formData.header.font.fontStyle"
                               filterable
                               clearable
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="item in commonData.fontStyle"
                                 :key="item"
                                 :label="item"
                                 :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-12  mt-10">{{$t('surveyPage.chooseParent')}}</label>
                  <div class="col-lg-12">
                    <el-select v-model="formData.parentId"
                               filterable
                               clearable
                               :placeholder="$t('choose')"
                               style="width:100%"
                               reserve-keyword>
                      <el-option v-for="(item, i) in surveyParent"
                                 :key="i"
                                 :label="item.header.text"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!--Body type: input-->
                <div v-show="formData.type == 'input'">
                  <div class="form-group">
                    <label class="control-label col-lg-12 mt-10">{{$t('editSurvey.pressPlaceholder')}}</label>
                    <div class="col-lg-12">
                      <input type="text" name="inputPlaceholder" :placeholder="$t('editSurvey.pressPlaceholder')" class="form-control" v-model="formData.body.placeholder">
                    </div>
                  </div>
                </div>

                <!--Body type: radio-->
                <div v-show="formData.type != 'label' && formData.type != 'input'">
                  <div class="form-group">
                    <label class="control-label col-lg-12 mt-10">{{$t('editSurvey.pressOption')}}</label>
                    <div class="col-lg-11">
                      <el-input class="input-new-tag "
                                v-model="inputValueO"
                                ref="saveTagInputO"
                                style="width:100% !important;margin-left:0px"
                                :placeholder="$t('editSurvey.pressOption')"
                                @keyup.enter.native="handleInputConfirm('O')">
                      </el-input>
                    </div>
                    <div class="col-lg-1">
                      <el-tooltip v-if="editOptionValue == ''" :content="$t('editSurvey.addOption')" placement="top" effect="dark">
                        <button type="button" class="btn btn-default btn-icon alpaca-float-right" @click="handleInputConfirm('O')"><i class="icon-add"></i></button>
                      </el-tooltip>
                      <el-tooltip v-else :content="$t('editSurvey.editOption')" placement="top" effect="dark">
                        <button type="button" class="btn btn-default btn-icon alpaca-float-right" @click="handleInputConfirm('O')"><i class="icon-pencil5"></i></button>
                      </el-tooltip>
                    </div>
                    <div class="col-lg-12 mb-10">
                      <el-tag v-for="(tag,i) in formData.body.options" :key="i"
                              closable
                              :disable-transitions="false"
                              @close="handleClose('O',tag)"
                              class="mt-10">
                        <span class="pointer" @click="editTag(tag)">{{tag}}</span>
                      </el-tag>
                    </div>
                  </div>

                  <div class="form-group" v-show="formData.type == 'radio' || formData.type == 'checkbox'">
                    <div class="col-lg-12">
                      <input type="checkbox" v-model="formData.body.addOtherOption" class="custorm-checkbox" id="addOtherOption" @change="changeTypeOther" />
                      <label for="addOtherOption" class="pointer label-padding">{{$t('editSurvey.addOtherOption')}}</label>
                    </div>
                  </div>

                  <div class="form-group" v-show="formData.body.addOtherOption">
                    <label class="control-label col-lg-12">{{$t('editSurvey.pressPlaceholder')}}</label>
                    <div class="col-lg-12">
                      <input type="text" name="placeholderOtherOption" :placeholder="$t('editSurvey.pressPlaceholder')" class="form-control" v-model="formData.body.placeholderOtherOption">
                    </div>
                  </div>

                </div>
              </fieldset>
            </div>
          </div>
          <div class="col-md-6">
            <div class="panel panel-body">
              <fieldset class="content-group">
                <legend class="text-semibold mb-20">{{$t('editSurvey.preview')}}</legend>
                <div class="form-group" v-show="formData.type != ''">
                  <!--Preview Label-->
                  <label v-bind:style="{color: formData.header.textColor,
                                      fontSize: formData.header.font.fontSize + 'px',
                                      fontWeight: formData.header.font.fontWeight,
                                      fontStyle: formData.header.font.fontStyle}"
                         class="control-label col-lg-12">
                    {{formData.header.text}}
                  </label>
                  <!--Preview INPUT-->
                  <div class="col-lg-12" v-show="formData.type == 'input'">
                    <input type="text" name="inputPlaceholderPre" :placeholder="formData.body.placeholder" class="form-control"
                           v-show="(formData.header.text != '' || formData.body.placeholder != '') && formData.header.text">
                  </div>
                  <!--Preview RADIO-->
                  <div class="col-lg-12" v-show="formData.type == 'radio' || formData.type == 'radio-button'">
                    <!--Old Style-->
                    <div v-show="formData.type == 'radio'">
                      <div v-for="(item, i) in formData.body.options" :key="i">
                        <input type="radio" name="optionRadio" v-model="modelRadio" :id="i">
                        <label :for="i" class="pointer label-padding">{{item}}</label>
                      </div>
                      <div v-show="formData.body.addOtherOption">
                        <input type="radio" name="optionRadio" v-model="modelRadio" id="otherRadio">
                        <label for="otherRadio" class="pointer label-padding">{{$t('editSurvey.addOtherOptionDes')}}</label>
                        <input type="text" name="placeholderOtherOptionPre" :placeholder="formData.body.placeholderOtherOption" class="form-control">
                      </div>
                    </div>
                    <!--New Style-->
                    <div v-show="formData.type == 'radio-button'">
                      <el-radio-group v-model="modelRadio" size="medium">
                        <el-radio-button v-for="(item, i) in formData.body.options" :label="item" :key="i"></el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>
                  <!--Preview CHECKBOX-->
                  <div class="col-lg-12" v-show="formData.type == 'checkbox' || formData.type == 'checkbox-button'">
                    <!--Old Style-->
                    <div v-show="formData.type == 'checkbox'">
                      <div v-for="(item, i) in formData.body.options">
                        <input type="checkbox" name="optionCheckbox" v-model="modelChecbox" :value="item" :id="i" class="custorm-checkbox">
                        <label :for="i" class="pointer label-padding">{{item}}</label>
                      </div>
                      <div v-show="formData.body.addOtherOption">
                        <input type="checkbox" name="optionRadio" v-model="modelChecbox" id="otherCheckbox" class="custorm-checkbox">
                        <label for="otherCheckbox" class="pointer label-padding">{{$t('editSurvey.addOtherOptionDes')}}</label>
                        <input type="text" name="placeholderOtherOptionPre" :placeholder="formData.body.placeholderOtherOption" class="form-control">
                      </div>
                    </div>
                    <!--New Style-->
                    <div v-show="formData.type == 'checkbox-button'">
                      <el-checkbox-group v-model="modelChecbox" size="medium">
                        <el-checkbox-button v-for="(item, i) in formData.body.options" :label="item" :key="i"></el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        formData: { header: { font: {}, textColor: '#000000' }, body: { options: [] }, parentId: '' },
        modelRadio: '',
        modelChecbox: [],
        loading: false,
        inputVisibleO: false,
        buttonVisibleO: true,
        editOptionValue: '',
        inputValueO: "",
        commonData,
        bodyType: commonData.typeSurvey,
      };
    },
    computed: {
      ...mapGetters({
        currentSurveyDetail: "$_editSurvey/currentSurveyDetail",
        surveyParent: "$_editSurvey/surveyParent"
      }),
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_editSurvey";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch("common/setTitle", _this.$t("screen.editSurvey"));
      await _this.$store.dispatch('$_editSurvey/getAllSurveyDetail', _this.$route.params.surveyId);
      if (_this.$route.params.id) { await _this.$store.dispatch("$_editSurvey/getSurveyDetail", _this.$route.params.id); }
      _this.formData = _.cloneDeep(_this.currentSurveyDetail);
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.body.isMulti = (_this.formData.type == 'checkbox' || _this.formData.type == 'checkbox-button') ? true : false;
              let response = await _this.$store.dispatch("$_editSurvey/editSurvey", _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/survey/" + _this.$route.params.surveyId + "/details");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      handleClose(type, tag) {
        if (type == "O") {
          this.formData.body.options.splice(this.formData.body.options.indexOf(tag), 1);
        }
      },
      handleInputConfirm(type) {
        var _this = this;
        if (_this.editOptionValue == '') {
          if (type == "O") {
            if (_this.inputValueO) _this.formData.body.options.push(_this.inputValueO);
          }
        } else {
          var indexOption = _.findIndex(_this.formData.body.options, function (o) { return o == _this.editOptionValue; });
          _this.formData.body.options.splice(indexOption, 1, _this.inputValueO);
          _this.editOptionValue = '';
        }
        _this.inputValueO = "";
      },
      changeTypeOther() {
        var _this = this;
        _this.formData.type = _this.formData.type == 'checkbox-button' ? 'checkbox' : (_this.formData.type == 'radio-button' ? 'radio' : _this.formData.type);
      },
      editTag(tagValue) {
        var _this = this;
        _this.inputValueO = tagValue;
        _this.editOptionValue = tagValue;
      }
    }
  };
</script>
