<template>
  <div>
    <div class="row">
      <div class="col-md-12 ">
        <div class="pull-right">
          <el-dropdown placement="bottom" size="medium" trigger="click">
            <span class="el-dropdown-link">
              <button size="medium" class="btn btn-primary">
                {{$t('history.filer')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </button>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-filter">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('history.all')}}</el-checkbox>
              <el-checkbox-group v-model="checkList" @change="handleCheckedFilterChange">
                <el-checkbox style="width:100% ;display:block;margin-left:0px" v-for="item in filter" :label="item.value" :key="item.value">{{$t(`history.`+item.value)}}</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>        
      </div>      
    </div>
    <div class="panel panel-body border-top-teal mt-10">
      <ul class="list-feed">
        <li v-if="data" v-for="item in data">
          <div class="text-muted">{{$t('createdBy')}} {{item.createdBy}} - {{item.fromNowCreate}} </div>
          <span class="size-14  display-block break-word" v-if="item.titleNote">{{$t('leadList.note')}}: {{item.titleNote}}</span>
          <span class="size-14  display-block break-word" v-if="item.description">{{$t(item.description)}}</span>
          <span class="size-14  display-block break-word" v-if="item.newStatus">{{$t('history.newStatus')}} : {{item.newStatus}}</span>
          <span class="size-14  text-muted display-block break-word" v-if="item.oldStatus">{{$t('history.oldStatus')}} : {{item.oldStatus}}</span>
        </li>
      </ul>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     background
                     :current-page.sync="searchRequest.currentPage"
                     :page-sizes="[10, 20, 50]"
                     :page-size="searchRequest.pageSize"
                     layout="sizes, prev, pager, next , jumper"
                     :total="searchRequest.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import Vue from 'vue'
  import store from './_store';
  export default {
    data() {
      return {
        checkList: [],
        checkAll: true,
        isIndeterminate: true,
        description: ''
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkList = val ? _.cloneDeep(_.map(this.filter, (o) => { return o.value })) : [];
        this.isIndeterminate = false;
      },
      handleCheckedFilterChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.filter.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.filter.length;
      },
      async setCheckList() {
        var _this = this;
        await _this.$store.dispatch('$_history/setCheckList', _this.checkList);
        await _this.$store.dispatch('$_history/getHistory', { leadId: _this.$route.params.id, type: _this.checkList });
      },
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch("$_history/getHistory", { leadId: _this.$route.params.id, type: _this.checkList });
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch("$_history/getHistory", { leadId: _this.$route.params.id, type: _this.checkList });
      }
    },
    computed: {
      ...mapState({
        filter: state => state.$_history.filter,
        searchRequest: state => state.$_history.searchRequest,
      }),
      ...mapGetters({
        data: "$_history/getHistory",
        getValueChecked: '$_history/getValueChecked',
      }),
    },
    watch: {
      'checkList': async function (val) {
        var _this = this;
        _this.setCheckList();
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = '$_history';
      // eslint-disable-next-line no-underscore-dangle
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        this.$store.registerModule(STORE_KEY, store);
      }
      _this.checkList = _.cloneDeep(_.map(this.filter, (o) => { return o.value }));
      _this.setCheckList();
    }
  }
</script>
