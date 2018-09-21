<template>
  <!-- Bordered panel body table -->
  <div class="form-horizontal">
    <fieldset class="content-group">
      <legend class="text-bold">{{$t(`dataTypeText.${dataType}`)}}</legend>
      <fieldset class="content-group">
        <div class="form-group">
          <div class="col-md-12">
            <div class="col-xs-2">
              <input type="text" :disabled="!disabled.edit" v-if="!formData.id" name="dataKey" :data-vv-as="$t('key')" :placeholder="$t('key')" v-validate="{ required: true, regex: /^[a-zA-Z0-9\-\_]+$/ }" class="form-control" v-model="formData.dataKey">
              <input type="text" v-else :disabled="formData.id || !disabled.edit" name="dataKey" :data-vv-as="$t('key')" :placeholder="$t('key')"  class="form-control" v-model="formData.dataKey">
              <span v-show="errors.has('dataKey')" class="help-block text-danger">{{ errors.first('dataKey') }}</span>
            </div>
            <div class="col-xs-3">
              <input type="text" name="dataValue" :disabled="!disabled.edit" :data-vv-as="$t('value')" :placeholder="$t('value')" v-validate="'required'" class="form-control" v-model="formData.dataValue">
              <span v-show="errors.has('dataValue')" class="help-block text-danger">{{ errors.first('dataValue') }}</span>
            </div>
            <div class="col-xs-2">
              <input type="color" class="form-control" :disabled="!disabled.edit" :placeholder="$t('color')" v-model="formData.color">
            </div>
            <div class="col-xs-2">
              <input type="number" class="form-control" :disabled="!disabled.edit" :placeholder="$t('weight')" v-model="formData.weight">
            </div>
            <div class="col-xs-3 text-right">
              <button @click="clearData" :disabled="!disabled.edit" class="btn btn-default">{{$t('clear')}}</button>
              <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading || !disabled.edit" class="btn btn-primary">{{$t('save')}}</button>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="table-responsive" v-if="commonDatas && commonDatas.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>{{$t('key')}}</th>
              <th>{{$t('value')}}</th>
              <th>{{$t('weight')}}</th>
              <th>{{$t('color')}}</th>
              <th>{{$t('action')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in commonDatas" :key="i" :value="item">
              <td>{{item.dataKey}}</td>
              <td>{{item.dataValue}}</td>
              <td>{{item.weight}}</td>
              <td><span v-bind:style="{backgroundColor: item.color, padding: '3px 10px', border: '1px solid #ccc', width:'50px;'}"></span></td>
              <td>
                <ul class="icons-list">
                  <li>
                    <el-tooltip :content="$t('updateInfo')" placement="top" effect="dark">
                      <a @click="editData(item)" class="mr-15"><i class="icon-pencil7"></i></a>
                    </el-tooltip>
                  </li>
                  <li>
                    <el-tooltip :content="$t('deleteInfo')" placement="top" effect="dark" v-if="disabled.edit">
                      <a @click="deleteData(item.id)"><i class="icon-trash"></i></a>
                    </el-tooltip>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>
  </div>
  <!-- /bordered panel body table -->
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  export default {
    props: {
      dataType: {
        type: Number,
      },
      haveColor: {
        type: Boolean
      }
    },
    data() {
      return {
        formData: { color: '#000000' },
        loading: false
      };
    },
    watch: {
      "$route.params.id": function (val) {
        this.formData = { color: '#000000' };
      }
    },
    computed: {
      commonDatas() {
        return _.filter(this.$store.getters[`$_masterData/commonDatas`], (v) => { return v.dataType == this.dataType });;
      },
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.settings;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = `$_masterData`;
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch(
        "common/setTitle",
        _this.$t("screen.masterData")
      );
      _this.formData = { color: '#000000' };
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _this.formData.dataType = _this.dataType;
              _this.formData.id ? await _this.$store.dispatch(
                `$_masterData/updateData`,
                _this.formData
              ) : await _this.$store.dispatch(
                `$_masterData/createData`,
                _this.formData
              );
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              this.formData = { color: '#000000' };
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      deleteData: _.debounce(async function (key) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [key.value]), '', {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          _this.loading = true;
          try {
            await _this.$store.dispatch(
              `$_masterData/deleteData`,
              key
            )
            new PNotify({
              title: '',
              text: _this.$t('saveSuccessfully'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
            new PNotify({
              title: '',
              text: _this.$t('saveFailed'),
              addclass: 'bg-danger'
            });
          }
          _this.loading = false;
        }).catch(() => {
        });
      }, 500),
      editData: function (item) {
        var _this = this;
        _this.formData = _.cloneDeep(item);
      },
      clearData: function () {
        var _this = this;
        _this.formData = { color: '#000000' };
      },

    }
  };
</script>
