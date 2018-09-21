<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <router-link :to="`/ga/${$route.params.id}/call/edit`">
          <button type="button" class="btn btn-primary" :disabled="!disabled.edit">{{$t('createNew')}}</button>
        </router-link>
      </div>
    </div>
    <div class="row" style="margin-top: 20px;" >
      <div class="col-md-6" v-for="item in callTracking">
        <div v-bind:class="{ 'border-left-danger': !item.isActive, 'border-left-success' : item.isActive }" class="panel">
          <div class="panel-heading" style="height: 95px;">
            <div class="col-md-12 mb-10 text-right">
              <el-tooltip :content="$t('call.titleDelete')" placement="top" effect="dark">
                <button class="btn btn-default btn-icon btn-xs" @click="deleteScall(item)"  :disabled="!disabled.edit">
                  <i class="icon-trash-alt"></i>
                </button>
              </el-tooltip>
              <el-tooltip :content="$t('call.update')" placement="top" effect="dark">
                <router-link :to="`/ga/${$route.params.id}/call/edit/${item.id}`" class="btn btn-default btn-icon btn-xs"  :disabled="!disabled.edit">
                  <i class="icon-pencil5"></i>
                </router-link>
              </el-tooltip>

            </div>
            <div class="col-md-12 mb-10">
              <div class="panel-title">
                <div v-if="item.callButtonDesign.type == 'rectangular'" class="custorm-label-scall" v-bind:class="{borderRadiusCall: item.callButtonDesign.isBorder}" :style="{backgroundColor:item.callButtonDesign.color}">
                  <span>
                    <i :class="item.callButtonDesign.icon"></i>
                    <span>{{item.phoneNumber}}</span>
                  </span>
                </div>
                <div v-else-if="item.callButtonDesign.type == 'circle'" class="custorm-call-circle" :style="{backgroundColor:item.callButtonDesign.color}">
                  <span>
                    <i :class="item.callButtonDesign.icon"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body"  style="height: 155px;">
            <div class="row">
              <div class="col-md-12" style="height: 110px;">
                <ul>
                  <li>{{$t('conversion.title')}}: {{item.goalName}}</li>
                  <li>{{$t('conversion.labelName')}}: {{item.labelDesktop}} </li>
                  <li>{{$t('call.afterClick')}}: {{item.afterClick}}</li>
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
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.tracking;
      }
    },
    methods: {
      deleteScall(data) {
        this.$emit('deleteScall', data);
      }
    },
    props: {
      callTracking: {
        type: Array,
      },
    },
  };
</script>
