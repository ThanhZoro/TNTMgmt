<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <router-link :to="`/ga/${$route.params.id}/ticket-vouchet/edit`">
          <button class="btn btn-primary" :disabled="!disabled.edit">{{$t('createNew')}}</button>
        </router-link>
      </div>
    </div>
    <div class="row" style="margin-top: 20px;" v-if="ticket">
      <div class="col-md-4" v-for="item in ticket">
        <div v-bind:class="{ 'border-left-danger': !item.isActive, 'border-left-success' : item.isActive }" class="panel" style="height: 300px !important; overflow-y: hidden">
          <div class="panel-heading" style="max-height: 200px !important; overflow-y: hidden">
            <div class="col-md-12 mb-20 text-right">
              <el-tooltip :content="$t('ticket.titleDelete')" placement="top" effect="dark">
                <button class="btn btn-default btn-icon btn-xs" @click="deleteTicket(item)" :disabled="!disabled.edit">
                  <i class="icon-trash-alt"></i>
                </button>
              </el-tooltip>
              <el-tooltip :content="$t('getCode')" placement="top" effect="dark">
                <button class="btn btn-default btn-icon btn-xs">
                  <i class="icon-embed2"></i>
                </button>
              </el-tooltip>
              <el-tooltip :content="$t('ticket.update')" placement="top" effect="dark">
                <router-link class="btn btn-default btn-icon btn-xs" :disabled="!disabled.edit" :to="`/ga/${$route.params.id}/ticket-vouchet/edit/${item.id}`">
                  <i class="icon-pencil5"></i>
                </router-link>
              </el-tooltip>
            </div>
            <div class="col-md-12 mb-20" >
              <div class="panel-title font-size-24">
                  <span v-show="checkExit(item,'name')">{{item.name}}</span>
              </div>
            </div>
          </div>
          <div class="panel-body" style="height: 100px !important; overflow-y: hidden">
            <div class="row">
              <div class="col-md-12">
                <ul>
                  <li v-show="checkExit(item,'title')">{{$t('ticket.titleTicket')}}: {{item.title}}</li>
                  <li v-show="checkExit(item,'dateOfValidity')">{{$t('ticket.startDay')}}: {{$moment(item.dateOfValidity).format('HH:mm, DD/MM/YYYY')}}</li>
                  <li v-show="checkExit(item,'expiryDate')">{{$t('ticket.endDay')}}: {{$moment(item.expiryDate).format('HH:mm, DD/MM/YYYY')}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import commonData from '@/utils/common-data'
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    data() {
      return {
        commonData
      };
    },
    computed: {
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.tracking;
      }
    },
    methods: {
      deleteTicket(data) {
        this.$emit('deleteTicket', data);
      },
      checkExit(item, val = '') {
        if (val != '') { return _.indexOf(item.displayFields, val) != -1 ? true : false; }
      }
    },
    props: {
      ticket: {
        type: Array,
      },
    },
  };
</script>
