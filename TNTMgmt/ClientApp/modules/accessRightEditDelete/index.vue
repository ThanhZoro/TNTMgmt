<template>
  <div>
    <title-bar :langTitle="$route.params.id ? $t('accessRight.edit') : $t('accessRight.create')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('accessRight.edit') : $t('accessRight.create')}}</h5>
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
                  <label class="control-label col-lg-2">{{$t('accessRight.users')}} </label>
                  <div class="col-lg-10" style="margin-top:6px">
                    {{`${currentUser.firstName} ${currentUser.lastName || ''}`}}
                  </div>
                </div>
                <div class="form-group" v-for="(item,i) in list" v-if="list.length">
                  <label class="control-label col-lg-2">{{i == 0 ? $t('accessRight.title'): ''}}</label>
                  <div class="col-lg-10">
                    <el-cascader :options="roles"
                                 :show-all-levels="false"
                                 v-model="rolesValue[i]"
                                 expand-trigger="hover"
                                 style="width:35%"
                                 :disabled="exitsRules(rolesValue[i])">
                    </el-cascader>
                    <el-tooltip class="item" effect="dark" :content="$t('accessRight.delete')" placement="top">
                      <i class="icon-trash pointer" style="margin-left:20px" @click="deleteRoles(rolesValue[i],i)"></i>
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
        formData: { userList: [this.$route.params.id], roleList: [] },
        loading: false,
        list: [''],
        rolesValue: []
      };
    },
    computed: {
      ...mapGetters({
        roles: "$_accessRightEditDelete/getRoles",
        currentUser: '$_accessRightEditDelete/currentUser'
      }),
      ...mapState({
      })
    },
    watch: {
      "list": function (val) {
        if (!val.length) { this.list.push('') }
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_accessRightEditDelete";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.$route.params.id && _this.currentUser) {
        _this.rolesValue = _.cloneDeep(_this.currentUser.treeRoles);
        if (_this.currentUser.treeRoles.length > 1) {
          for (let i = 0; i < _this.currentUser.treeRoles.length-1 ; i++) {
            _this.list.push('');
          }
        }
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.formData.roleList = [];
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              _.forEach(_this.rolesValue, (v) => {
                _this.formData.roleList.push(v[v.length - 1]);
              });
              await _this.$store.dispatch(`$_accessRightEditDelete/createAccessRight`, _this.formData);
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
      deleteRoles: async function (data,index) {
        var _this = this;
        _this.formData.roleList = [];
        var exists = _this.exitsRules(data);
        if (exists) {
          await _this.$confirm(_this.$t('leadsPage.deleteLead', [null]), _this.$t('accessRight.delete'), {
            confirmButtonText: _this.$t('confirm'),
            cancelButtonText: _this.$t('cancel'),
          }).then(async () => {
            _this.loading = true;
            try {
              _this.formData.roleList.push(data[data.length - 1]);
              await _this.$store.dispatch(`$_accessRightEditDelete/deleteAccessRight`, _this.formData);
              _this.list.splice(index, 1);
              _this.rolesValue.splice(index, 1);
              new PNotify({
                title: '',
                text: _this.$t('deleteSuccess'),
                addclass: 'bg-success'
              });
            } catch (error) {
              console.log(error);
            }
            _this.loading = false;
          }).catch(() => {
          });
        } else {
          _this.list.splice(index, 1);
          _this.rolesValue.splice(index, 1);
        }
      },
      addRole: function () {
        var _this = this;
        if (_this.list.length == _this.rolesValue.length) {
          _this.list.push('');
        }
      },
      exitsRules: function (data) {
        var _this = this;
        if (data) {
          var exits = _.find(_this.currentUser.treeRoles, { 0: data[0], 1: data[1] });
          return exits ? true : false;
        }
      }
    }
  };
</script>
