<template>
  <div>
    <div class="col-md-12 mt-20">
      <div class="col-md-4">
        <div class="form-group has-feedback">
          <input class="form-control input-xs" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('userList.searchDes')">
          <div class="form-control-feedback">
            <i class="icon-search4"></i>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <button type="button" size="medium" class="btn btn-primary btn-xs" @click="search()">
            {{$t('search')}}
          </button>
        </div>
      </div>
      <div class="pull-right mr-20">
        <router-link :to="`/lead/contact/${$route.params.id}/edit`" class="btn btn-primary" :disabled="!disabled.edit">
          {{$t('createNew')}}
        </router-link>
      </div>
    </div>
    <div class="col-md-12" style="padding: 0px;">
      <div class="table-cont" id="table-cont">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <template v-for="(item, props, index) in headers">
                <th :key="index" v-show="item">{{$t(`userList.${props}`)}}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in contactData.data" :key="i" :value="item">
              <td><avatar :avatarUrl="item.avatarUrl" :firstChar="item.name ? item.name.substring(0,1) : ''"></avatar></td>
              <td>{{item.name}}</td>
              <td>{{item.phone ? item.phone : ''}}</td>
              <td>{{item.email ? item.email : ''}}</td>
              <td>
                <div>
                  {{item.relationship ? item.relationship : ''}}
                </div>
              </td>
              <td>
                <div>                  
                  <el-tooltip :content="$t('contact.update')" placement="top" effect="dark">
                    <router-link :to="`/lead/contact/${$route.params.id}/edit/${item.id}`">
                      <i class="icon-pencil7"></i>
                    </router-link>
                  </el-tooltip>
                  <el-tooltip :content="$t('contact.delete.title')" placement="top" effect="dark" v-if="disabled.edit">
                    <i class="icon-trash pointer ml-15" @click="deleteContact(item)"></i>
                  </el-tooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-pagination class="ml-20"
                     @size-change="handleSizeChange"
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
        description: ''
      }
    },
    methods: {
      async handleSizeChange(val) {
        var _this = this;
        _this.searchRequest.pageSize = val;
        await _this.$store.dispatch('$_contact/getAllContact', { leadId: _this.$route.params.id });
      },
      async handleCurrentChange(val) {
        var _this = this;
        _this.searchRequest.currentPage = val;
        await _this.$store.dispatch('$_contact/getAllContact', { leadId: _this.$route.params.id });
      },
      deleteContact: _.debounce(async function (data) {
        var _this = this;
        await _this.$confirm(_this.$t('contact.delete.description', [data.name]), _this.$t('contact.delete.title'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          try {
            await _this.$store.dispatch(`$_contact/deleteContact`, { id: data.id, leadId: _this.$route.params.id });
            new PNotify({
              title: '',
              text: _this.$t('deleteSuccess'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);            
          }
        }).catch(() => {
        });
      }, 500),
      async search() {
        var _this = this;
        _this.searchRequest.description = _this.description;
        await _this.$store.dispatch('$_contact/getAllContact', { leadId: _this.$route.params.id });
      }
    },
    computed: {
      ...mapState({
        searchRequest: state => state.$_contact.searchRequest,
        headers: state => state.$_contact.headers,
        leadId: state => state.$_contact.leadId
      }),
      ...mapGetters({
        contactData: "$_contact/contactData",
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.lead;
      }
    },
    watch: {

    },
    async created() {
      var _this = this;
      const STORE_KEY = '$_contact';
      // eslint-disable-next-line no-underscore-dangle
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        this.$store.registerModule(STORE_KEY, store);
      }
      if (_this.leadId != _this.$route.params.id || _this.contactData && !_this.contactData.data) {
        await _this.$store.dispatch('$_contact/getAllContact', { leadId: _this.$route.params.id});
        await _this.$store.dispatch('$_contact/setContactId', _this.$route.params.id);
        var tableCont = document.querySelector('#table-cont');
        if (tableCont) {
          tableCont.addEventListener('scroll', (e) => {
            var getTableCont = document.getElementById('table-cont');
            var scrollTop = tableCont.scrollTop;
            document.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
          })
        }
      }
    }
  }
</script>
