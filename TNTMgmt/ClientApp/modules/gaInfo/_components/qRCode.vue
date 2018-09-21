<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <router-link :to="`/ga/${$route.params.id}/qrcode/edit`">
          <button type="button" :disabled="!disabled.edit" class="btn btn-primary">{{$t('createNew')}}</button>
        </router-link>
      </div>
    </div>
    <div class="row" style="margin-top: 20px;" v-if="qrcode">
      <div class="col-md-6" v-for="item in qrcode">
        <div v-bind:class="{ 'border-left-danger': !item.isActive, 'border-left-success' : item.isActive }" class="panel" style="min-height: 500px">
          <div class="panel-heading">
            <div class="col-md-12 mb-20 text-right">
              <el-tooltip :content="$t('qrcode.titleDelete')" placement="top" effect="dark">
                <button class="btn btn-default btn-icon btn-xs" @click="deleteQRCode(item)" :disabled="!disabled.edit">
                  <i class="icon-trash-alt"></i>
                </button>
              </el-tooltip>
              <el-tooltip :content="$t('qrcode.update')" placement="top" effect="dark">
                <router-link :disabled="!disabled.edit" class="btn btn-default btn-icon btn-xs" :to="`/ga/${$route.params.id}/qrcode/edit/${item.id}`">
                  <i class="icon-pencil5"></i>
                </router-link>
              </el-tooltip>
            </div>
            <div class="col-md-12">
              <div class="panel-title">
                <center>
                  <qriously v-if="item.qrCodeLinkUrl" :value="item.qrCodeLinkUrl" :size="200" />
                </center>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12" style="height: 140px">
                <ul>
                  <li>{{$t('userList.firstName')}}: {{item.name}}</li>
                  <li>{{$t('conversion.title')}}: {{item.goalName}}</li>
                  <li>{{$t('conversion.type')}}: {{$t(item.type)}}</li>
                  <li class="break-word">{{$t('qrcode.linkTo')}}: {{item.linkUrl}}</li>
                </ul>
              </div>
            </div>
          </div>
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
      deleteQRCode(data) {
        this.$emit('deleteQRCode', data);
      }
    },
    props: {
      qrcode: {
        type: Array,
      },
    },
  };
</script>
