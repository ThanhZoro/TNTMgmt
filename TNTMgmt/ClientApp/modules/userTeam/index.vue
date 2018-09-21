<template>
  <div>
    <title-bar :langTitle="$t('team.addUser')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('team.addUser')}}</h5>
        <div class="heading-elements">
          <router-link to="/team" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal" v-if="team">
              <fieldset class="content-group">
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('team.name')}} </label>
                  <div class="col-lg-10" style="margin-top:6px" v-if="team">
                    {{team.name}}
                  </div>
                </div>
                <div class="form-group" v-for="(item,i) in list" v-if="list.length">
                  <label class="control-label col-lg-2">{{i == 0 ? $t('accessRight.users'): ''}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.userIds[i]"
                               filterable
                               remote
                               :remote-method="filterTeam"
                               :placeholder="$t('choose')"
                               style="width:35%"
                               :disabled="exitsUser(formData.userIds[i])">
                      <el-option v-for="item in users"
                                 :key="item.id"
                                 :label="item.firstName + ' | ' + item.userName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                    <el-tooltip class="item" effect="dark" :content="$t('team.deleteMember')" placement="top">
                      <i class="icon-trash pointer" style="margin-left:20px" @click="deleteTeamUser(formData.userIds[i],i)"></i>
                    </el-tooltip>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2"></label>
                  <div class="col-lg-10">
                    <a @click="addTeam">{{$t('team.addMember')}}</a>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/team" class="btn btn-default">
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
        formData: { userIds: [],teamIds : [this.$route.params.id]},
        loading: false,
        list: [],
      };
    },
    computed: {
      ...mapGetters({
        getUser: '$_userTeam/getUser'
      }),
      ...mapState({
        team: state => state.$_userTeam.team,
        searchRequest: state => state.$_userTeam.searchRequest,
        users : state => state.common.users
      })
    },
    watch: {
      "list": function (val) {
        if (!val.length) { this.list.push('') }
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_userTeam";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch(`$_userTeam/getTeam`, _this.$route.params.id);
      if (_this.getUser) _this.formData.userIds = _.cloneDeep(_this.getUser);
      if (_this.formData.userIds.length > 0) {
        for (let i = 0; i < _this.formData.userIds.length; i++) {
          _this.list.push('');
        }
      } else {
        _this.list.push('');
      }
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;        
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              await _this.$store.dispatch(`$_userTeam/editTeamUser`, _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/team");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500),
      deleteTeamUser: async function (data,index) {
        var _this = this;
        if (data) {
          var exists = _.find(_this.getUser, (o) => { return o == data });
        }
        if (exists) {
          await _this.$confirm(_this.$t('leadsPage.deleteLead', [null]), _this.$t('team.deleteMember'), {
            confirmButtonText: _this.$t('confirm'),
            cancelButtonText: _this.$t('cancel'),
          }).then(async () => {
            _this.loading = true;
            try {
              var dataDelete = {
                teamIds: [_this.$route.params.id],
                userIds: [data]
              };
              await _this.$store.dispatch(`$_userTeam/deleteTeamUser`, dataDelete);
              _this.list.splice(index, 1);
              _this.formData.userIds.splice(index, 1);
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
          _this.formData.userIds.splice(index, 1);
        }
      },
      addTeam: function () {
        var _this = this;
        if (_this.list.length == _this.formData.userIds.length) {
          _this.list.push('');
        }
      },
      filterTeam: _.debounce(async function (val) {
        var _this = this;
        _this.advanceFilter.choosenFilter = [];
        _this.searchRequest.description = val;
        await _this.$store.dispatch("$_userTeam/getTeam");
      }, 500),
      exitsUser: function (val) {
        var _this = this;
        if (val) {
          var exits = _.find(_this.getUser, (o) => { return o == val });
          return exits ? true : false;
        }
      }
    }
  };
</script>
