<template>
  <div>
    <input type="hidden" v-model="surveyDetailId" />
    <div class="form-group" v-show="item.type != ''">
      <!--Preview Label-->
      <label v-bind:style="{color: item.header.textColor,
                                      fontSize: item.header.font.fontSize + 'px',
                                      fontWeight: item.header.font.fontWeight,
                                      fontStyle: item.header.font.fontStyle}"
             class="control-label col-lg-12">
        {{item.header.text}}
      </label>
      <!--Preview INPUT-->
      <div class="col-lg-12" v-show="item.type == 'input'" style="margin-bottom:15px">
        <input type="text" name="inputPlaceholderPre" :placeholder="item.body.placeholder" class="form-control"
               v-show="(item.header.text != '' || item.body.placeholder != '') && item.header.text" v-model="modelInput">
      </div>
      <!--Preview RADIO-->
      <div class="col-lg-12" v-show="item.type == 'radio' || item.type == 'radio-button'" style="margin-bottom:15px">
        <!--Old Style-->
        <div v-show="item.type == 'radio'">
          <div v-for="(option, i) in item.body.options" :key="i">
            <input type="radio" :name="`optionRadio-${keyValue}`" :value="option" v-model="modelRadio" :id="`optionRadio-${keyValue}-${i}`">
            <label :for="`optionRadio-${keyValue}-${i}`" class="pointer label-padding">{{option}}</label>
          </div>
          <div v-show="item.body.addOtherOption">
            <input type="radio" :name="`optionRadio-${keyValue}`" v-model="modelRadio" :id="`optionRadio-${keyValue}`" value="other#">
            <label :for="`optionRadio-${keyValue}`" class="pointer label-padding">{{$t('editSurvey.addOtherOptionDes')}}</label>
            <input v-if="checkRadioOther()" type="text" :placeholder="item.body.placeholderOtherOption" :id="`inputRadio-${keyValue}`" class="form-control" v-model="modelRadioOther"
                   @blur="handleRadioOtherOption(modelRadioOther)">
          </div>
        </div>
        <!--New Style-->
        <div v-show="item.type == 'radio-button'">
          <el-radio-group v-model="modelRadio" size="medium">
            <el-radio-button v-for="(item, i) in item.body.options" :label="item" :key="i"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!--Preview CHECKBOX-->
      <div class="col-lg-12" v-show="item.type == 'checkbox' || item.type == 'checkbox-button'">
        <!--Old Style-->
        <div v-show="item.type == 'checkbox'" style="margin-bottom:15px">
          <div v-for="(option, i) in item.body.options" :key="i">
            <input type="checkbox" class="custorm-checkbox" :name="`modelChecbox-${keyValue}`" :value="option" v-model="modelChecbox" :id="`modelChecbox-${keyValue}-${i}`">
            <label :for="`modelChecbox-${keyValue}-${i}`" class="pointer label-padding">{{option}}</label>
          </div>
          <div v-show="item.body.addOtherOption">
            <input type="checkbox" class="custorm-checkbox" :name="`modelChecbox-${keyValue}`" :id="`modelChecbox-${keyValue}`" v-model="checkboxOtherModel" value="other#">
            <label :for="`modelChecbox-${keyValue}`" class="pointer label-padding">{{$t('editSurvey.addOtherOptionDes')}}</label>
            <input v-if="checkboxOther()" type="text" :name="item.body.placeholderOtherOptionPre" :placeholder="item.body.placeholderOtherOption" class="form-control"
                   v-model="checkboxOtherValue" @blur="handleCheckboxOtherOption()">
          </div>
        </div>
        <!--New Style-->
        <div v-show="item.type == 'checkbox-button'">
          <el-checkbox-group v-model="modelChecbox" size="medium">
            <el-checkbox-button v-for="(item, i) in item.body.options" :label="item" :key="i" ></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div v-for="(child,i) in item.children" style="margin-left:10px">
      <survey :item="child" :keyValue="child.id"></survey>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    name: 'survey',
    data() {
      return {
        loading: false,
        modelChecbox : [],
        modelRadio: '',
        surveyDetailId: '',
        modelRadioOther: '',
        checkboxOtherValue: '',
        modelInput: '',
        checkboxOtherModel: []
      };
    }, 
    methods: {
      sendDataSurvey(data) {
        var _this = this;
        _this.$store.dispatch('$_surveyLead/updateSurveyLeadData', data);
      },
      handleRadioOtherOption(val) {
        var _this = this;
        val = "other#" + val;
        _this.sendDataSurvey({ surveyDetailId: _this.surveyDetailId, values: [val] });
      },
      checkRadioOther() {
        return this.modelRadio ? (this.modelRadio.indexOf("other#") != -1 ? true : false) : false;
      },
      handleCheckboxOtherOption() {
        var _this = this;
        var index = _.findIndex(_this.modelChecbox, function (o) { return o.indexOf("other#") > -1; });
        if (index != -1) {
          _this.modelChecbox[index] = "other#" + _this.checkboxOtherValue;
        } else {
          _this.modelChecbox.push("other#" + _this.checkboxOtherValue);
        }
      },
      checkboxOther() {
        var _this = this;
        var checkOther = _.find(_this.checkboxOtherModel, (o) => {
          return o.indexOf("other#") != -1;
        });
        return checkOther ? true : false;
      }
    },
    watch: {
      "modelChecbox": {
        handler(val) {
          var _this = this;
          _this.sendDataSurvey({ surveyDetailId: _this.surveyDetailId, values: val });
        },
        deep: true
      },
      "checkboxOtherModel": function (val) {
        var _this = this;
        if (!val.length) {
          _this.modelChecbox = _.filter(_this.modelChecbox, function (o) { return o.indexOf("other#") == -1; });
          _this.checkboxOtherValue = "";
        } else {
          _this.handleCheckboxOtherOption();
        }
      },
      "modelRadio": function (val) {
        var _this = this;
        (_this.modelRadio == 'other#') ? _this.handleRadioOtherOption(_this.modelRadioOther) : _this.sendDataSurvey({ surveyDetailId: this.surveyDetailId, values: [val] });
      },
      "modelInput": function (val) {
        var _this = this;
        _this.sendDataSurvey({ surveyDetailId: _this.surveyDetailId, values: [_this.modelInput] });
      }
    },
    computed: {
      ...mapGetters({
        formData: "$_surveyLead/surveyLeadData",
      })
    },
    created() {
      var _this = this;
      _this.surveyDetailId = _this.keyValue;
      var response = _.find(_this.formData.surveyItems, function (o) { return o.surveyDetailId == _this.keyValue });
      if (response && response.values) {
        switch (_this.item.type) {
          case "input":
            _this.modelInput = response.values[0];
            break;
          case "checkbox":
            _this.modelChecbox = response.values;
            var val = _.find(response.values, function (o) { return o.indexOf("other#") > -1; });
            if (val) {
              _this.checkboxOtherModel.push("other#");
              _this.checkboxOtherValue = val.slice(6, val.length);
            }
            break;
          case "checkbox-button":
            _this.modelChecbox = response.values;
            break;
          case "radio":
            if (response.values[0].indexOf("other#") > -1) {
              _this.modelRadio = "other#";
              _this.modelRadioOther = response.values[0].slice(6, response.values[0].length);
            } else {
              _this.modelRadio = response.values[0];
            }
            break;
          case "radio-button":
            _this.modelRadio = response.values[0];
            break;
          default:
        }
      }
    },
    props: ["item", "keyValue"]
  };
</script>

