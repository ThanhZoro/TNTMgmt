<template>
  <div>
    <title-bar :langTitle="$t('accessRight.detail')"></title-bar>
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('accessRight.detail')}}</h5>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input class="form-control" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('accessRight.placeHolderSearch')">
                  <div class="form-control-feedback">
                    <i class="icon-search4"></i>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <button type="button" size="medium" class="btn btn-primary" @click="search()">
                    {{$t('search')}}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-cont" id="table-cont">
              <table class="table">
                <thead>
                  <tr>
                    <th></th>
                    <template v-for="(item, props, index) in getDescriptionRoles.topRoles">
                      <th>{{$t(`accessRight.${item}`)}}</th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, props, index) in getDescriptionRoles.roles" :key="index">
                    <td style="min-width:190px">{{ $t(`accessRight.${item.key.replace(/\s+/g,"")}`)}}</td>
                    <td v-for="(roleBool,i) in item.arrayRoles" :key="i" class="text-center">
                      <i class="icon-checkmark3" v-show="roleBool"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        description : ""
      };
    },
    computed: {
      ...mapGetters({
        getDescriptionRoles: "$_accessRightDetail/getDescriptionRoles"
      }),
      ...mapState({
        searchRequest: state => state.$_accessRightDetail.searchRequest
      })
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_accessRightDetail";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
    },
    methods: {
      back: function () {
        var _this = this;
        _this.$router.go(-1);
      },
      search: function () {
        var _this = this;
        _this.searchRequest.description = _this.description
      },
    }
  };
</script>
