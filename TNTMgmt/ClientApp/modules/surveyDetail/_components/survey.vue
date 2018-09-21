<template>
  <div>
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
               v-show="(item.header.text != '' || item.body.placeholder != '') && item.header.text">
      </div>
      <!--Preview RADIO-->
      <div class="col-lg-12" v-show="item.type == 'radio' || item.type == 'radio-button'" style="margin-bottom:15px">
        <!--Old Style-->
        <div v-show="item.type == 'radio'">
          <div v-for="(option, i) in item.body.options" :key="i">
            <input type="radio" :name="`optionRadio-${keyValue}`" :value="option" v-model="modelRadio[`optionRadio-${keyValue}`]" :id="`optionRadio-${keyValue}-${i}`">
            <label :for="`optionRadio-${keyValue}-${i}`" class="pointer label-padding">{{option}}</label>
          </div>
          <div v-show="item.body.addOtherOption">
            <input type="radio" :name="`optionRadio-${keyValue}`" v-model="modelRadio[`optionRadio-${keyValue}`]" id="`optionRadio-${keyValue}`">
            <label :for="`optionRadio-${keyValue}`" class="pointer label-padding">{{$t('editSurvey.addOtherOptionDes')}}</label>
            <input type="text" :name="item.body.placeholderOtherOptionPre" :placeholder="item.body.placeholderOtherOption" class="form-control">
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
            <input type="checkbox" class="custorm-checkbox" :name="`modelChecbox-${keyValue}`" v-model="modelChecbox" :id="`modelChecbox-${keyValue}`">
            <label :for="`modelChecbox-${keyValue}`" class="pointer label-padding">{{$t('editSurvey.addOtherOptionDes')}}</label>
            <input type="text" :name="item.body.placeholderOtherOptionPre" :placeholder="item.body.placeholderOtherOption" class="form-control">
          </div>
        </div>
        <!--New Style-->
        <div v-show="item.type == 'checkbox-button'">
          <el-checkbox-group v-model="modelChecbox" size="medium">
            <el-checkbox-button v-for="(item, i) in item.body.options" :label="item" :key="i"></el-checkbox-button>
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
  export default {
    name: 'survey',
    data() {
      return {
        modelChecbox : [],
        modelRadio: {}
      };
    },
    methods: {
    },
    props: ["item", "keyValue"]
  };
</script>

