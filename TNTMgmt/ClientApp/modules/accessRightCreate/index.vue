<template>
  <div>
    <title-bar :langTitle="$t('accessRight.create')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('accessRight.create')}}</h5>
        <div class="heading-elements">
          <router-link to="/user" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal" v-if="formData">
              <fieldset class="content-group">
                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('accessRight.users')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.userList"
                               filterable
                               clearable
                               remote
                               multiple
                               collapse-tags
                               :placeholder="$t('choose')"
                               style="width:35%"
                               reserve-keyword
                               name="name"
                               v-validate="'required'">
                      <el-option v-for="(item, i) in users"
                                 :key="i"
                                 :label="item.firstName + ' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group"  v-for="(item,i) in list">
                  <label class="control-label col-lg-2">{{i == 0 ? $t('accessRight.title'): ''}}</label>
                  <div class="col-lg-10">
                    <el-cascader :options="roles"
                                 :show-all-levels="false"
                                 expand-trigger="hover"
                                 v-model="rolesValue[i]"
                                 style="width:35%">
                    </el-cascader>
                    <el-tooltip class="item" effect="dark" :content="$t('accessRight.delete')" placement="top">
                      <i class="icon-trash pointer" style="margin-left:20px" @click="deleteRoles(i)" v-if="list.length > 1"></i>
                      <i class="icon-trash" style="margin-left:20px" v-else></i>
                    </el-tooltip>
                    <el-tooltip placement="top" effect="dark" :content="$t('accessRight.detail')" class="ml-20">
                      <router-link to="/user/accessRightDetail" target= '_blank'>
                        <span class="pointer"> <i class="icon-question3"></i></span>
                      </router-link>
                    </el-tooltip>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2"></label>
                  <div class="col-lg-10">
                    <a @click="addRole">{{$t('accessRight.add')}}</a>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/user" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
        <!-- /bordered panel body table -->
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: { userList: [], roleList: [] },
        loading: false,
        list: [''],
        rolesValue: []
      };
    },
    computed: {
      ...mapGetters({
        roles: "$_accessRightCreate/getRoles"
      }),
      ...mapState({
        users: state => state.common.users
      })
    },

    async created() {
      var _this = this;
      const STORE_KEY = "$_accessRightCreate";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;        
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _.forEach(_this.rolesValue, (v) => {
                _this.formData.roleList.push(v[v.length-1]);
              });
              await _this.$store.dispatch(`$_accessRightCreate/createAccessRight`, _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/user");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      deleteRoles: function (index) {
        var _this = this;
        _this.list.splice(index, 1);
        _this.rolesValue.splice(index, 1);
      },
      addRole: function () {
        var _this = this;
        if (_this.list.length == _this.rolesValue.length) {
          _this.list.push('');
        }
      },
      handleItemChange: function (val) {
        var _this = this;
        console.log(val);
      }
    }
  };
</script>
