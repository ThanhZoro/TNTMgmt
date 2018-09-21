<template>
  <div>
    <title-bar :langTitle="$t('team.addTeamUser')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('team.addTeamUser')}}</h5>
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
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('accessRight.users')}} </label>
                  <div class="col-lg-10" style="margin-top:6px">
                    {{`${getTeam.data.firstName} ${getTeam.data.lastName || ''}`}}
                  </div>
                </div>
                <div class="form-group" v-for="(item,i) in list" v-if="list.length">
                  <label class="control-label col-lg-2">{{i == 0 ? $t('screen.team'): ''}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.teamIds[i]"
                               filterable
                               remote
                               :remote-method="filterTeam"
                               :placeholder="$t('choose')"
                               style="width:35%"
                               :disabled="exitsTeam(formData.teamIds[i])">
                      <el-option v-for="item in team.data"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                    <el-tooltip class="item" effect="dark" :content="$t('team.delete')" placement="top">
                      <i class="icon-trash pointer" style="margin-left:20px" @click="deleteTeamUser(formData.teamIds[i],i)"></i>
                    </el-tooltip>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2"></label>
                  <div class="col-lg-10">
                    <a @click="addTeam">{{$t('team.addTeam')}}</a>
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
        formData: { teamIds: [],userIds : [this.$route.params.id]},
        loading: false,
        list: [],
      };
    },
    computed: {
      ...mapGetters({
        getTeam: '$_teamUser/getTeam'
      }),
      ...mapState({
        team: state => state.$_teamUser.team,
        searchRequest: state => state.$_teamUser.searchRequest,
        advanceFilter: state => state.$_teamUser.advanceFilter
      })
    },
    watch: {
      "list": function (val) {
        if (!val.length) { this.list.push('') }
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_teamUser";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.getTeam.team.length) {
        _this.advanceFilter.choosenFilter = [];
        _this.advanceFilter.choosenFilter.push({ searchType: 'checkbox', data: _this.getTeam.team, field: 'id' });
        await _this.$store.dispatch(`$_teamUser/getTeam`);
      } else {
        await _this.$store.dispatch(`$_teamUser/getTeam`);
      }
      _this.formData.teamIds = _.cloneDeep(_this.getTeam.data.teamIds);
      if (_this.formData.teamIds.length > 0) {
        for (let i = 0; i < _this.formData.teamIds.length; i++) {
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
              await _this.$store.dispatch(`$_teamUser/editTeamUser`, _this.formData);
              new PNotify({
                title: '',
                text: _this.$t('saveSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/user");
            } catch (error) {
              console.log(error.response);
              new PNotify({
                title: '',
                text: _this.$t('saveFailed'),
                addclass: 'bg-danger'
              });
            }
          }
        });
        _this.loading = false;
      }, 500),
      deleteTeamUser: async function (data,index) {
        var _this = this;
        if (data) {
          var exists = _.find(_this.getTeam.data.teamIds, (o) => { return o == data});
        }
        if (exists) {
          await _this.$confirm(_this.$t('leadsPage.deleteLead', [null]), _this.$t('team.delete'), {
            confirmButtonText: _this.$t('confirm'),
            cancelButtonText: _this.$t('cancel'),
          }).then(async () => {
            _this.loading = true;
            try {
              var dataDelete = {
                userIds: [_this.$route.params.id],
                teamIds: [data]
              };
              await _this.$store.dispatch(`$_teamUser/deleteTeamUser`, dataDelete);
              _this.list.splice(index, 1);
              _this.formData.teamIds.splice(index, 1);
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
          _this.formData.teamIds.splice(index, 1);
        }
      },
      addTeam: function () {
        var _this = this;
        if (_this.list.length == _this.formData.teamIds.length) {
          _this.list.push('');
        }
      },
      filterTeam: _.debounce(async function (val) {
        var _this = this;
        _this.advanceFilter.choosenFilter = [];
        _this.searchRequest.description = val;
        await _this.$store.dispatch("$_teamUser/getTeam");
      }, 500),
      exitsTeam: function (val) {
        var _this = this;
        if (val) {
          var exits = _.find(_this.getTeam.data.teamIds, (o) =>{ return o ==val });
          return exits ? true : false;
        }
      }
    }
  };
</script>
