<template>
  <div>
    <title-bar :langTitle="$t('screen.gaInfo')"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div >
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('tracking.trackingInfo')}}</h5>
          <div class="heading-elements">
            <button type="button" :disabled="!disabled.delete" size="medium" class="btn bg-slate-400"  @click="deleteTracking($route.params.id)">
              {{$t('delete')}}
            </button>
            <router-link :to="`/ga`">
              <button type="button" class="btn btn-default">{{$t('back')}}</button>
            </router-link>
          </div>
        </div>
      </div>
      <!-- /bordered panel body table -->

      <div class="panel-body">
        <div class="col-lg-3" style="padding-left: 0px;">
          <div class="panel">
            <ul class="list-group panel-no-border" style="padding: 0 !important">
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'info'}" @click="description.choosenTab = 'info'">{{$t('generalInfo')}} </li>
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'conversion'}" @click="description.choosenTab = 'conversion'">{{$t('conversion.title')}} <span class="badge bg-slate position-right" v-if="dataConversion.data">{{dataConversion.data.length}}</span></li>
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'form'}" @click="description.choosenTab = 'form'">{{$t('form')}} <span class="badge bg-slate position-right" v-if="dataFormTracking">{{dataFormTracking.length}}</span></li>
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'call-tracking'}" @click="description.choosenTab = 'call-tracking'">{{$t('call.callTracking')}} <span class="badge bg-slate position-right" v-if="getCall">{{getCall.length}}</span></li>
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'qrcode'}" @click="description.choosenTab = 'qrcode'">{{$t('qrcode.qrcodeName')}} <span class="badge bg-slate position-right" v-if="getQACode">{{getQACode.length}}</span></li>
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'ticket'}" @click="description.choosenTab = 'ticket'">{{$t('ticket.voucher')}} <span class="badge bg-slate position-right" v-if="getTickets">{{getTickets.length}}</span></li>
            </ul>
          </div>
        </div>
        <div class="panel col-lg-9">
          <div class="panel body panel-no-border">
            <div class="panel-body">
              <div class="pt-20" v-if="description.choosenTab == 'info'">
                <TrackingInfo :currentTracking="currentTracking" />
              </div>
              <div class="pt-20" v-if="description.choosenTab == 'conversion'">
                <Conversion :conversion="dataConversion" @syncConversion="syncConversion" :gaConnected="currentTracking.profileId != null" />
              </div>
              <div class="pt-20" v-if="description.choosenTab == 'form'">
                <FormTracking :formTracking="dataFormTracking" :formFields="data.formFields" @deleteFormTracking="deleteFormTracking" />
              </div>
              <div class="pt-20" v-if="description.choosenTab == 'call-tracking'">
                <CallTracking :callTracking="getCall" @deleteScall="deleteScall" />
              </div>
              <div class="pt-20" v-if="description.choosenTab == 'qrcode'">
                <QRCode :qrcode="getQACode" @deleteQRCode="deleteQRCode" />
              </div>
              <div class="pt-20" v-if="description.choosenTab == 'ticket'">
                <Ticket :ticket="getTickets" @deleteTicket="deleteTicket" />
              </div>
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
  import Conversion from './_components/conversion';
  import FormTracking from "./_components/formTracking"
  import CallTracking from "./_components/callTracking"
  import QRCode from "./_components/qRCode"
  import Ticket from "./_components/ticket"
  import TrackingInfo from "./_components/trackingInfo"
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      Conversion,
      FormTracking,
      CallTracking,
      QRCode,
      Ticket,
      TrackingInfo,
      "title-bar": TitleBar,
    },
    data() {
      return {
        exitsValue: null,
      };
    },
    computed: {
      ...mapState({
        currentTracking: state => state.$_gaInfo.currentTracking,
        description: state => state.$_gaInfo.description,
        data: state => state.$_gaInfo.data
      }),
      ...mapGetters({
        dataConversion: "$_gaInfo/dataConversion",
        dataFormTracking: "$_gaInfo/dataFormTracking",
        getQACode: "$_gaInfo/getQACode",
        getCall: '$_gaInfo/getCall',
        getTickets: "$_gaInfo/getTickets",
        currentUser: 'common/currentUser'
      }),
      disabled() {
        return this.currentUser.accessRight.tracking;
      }
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_gaInfo";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      _this.exitsValue = null;
      try {
        await _this.$store.dispatch("common/setTitle", _this.$t("screen.gaInfo"));
        if (_this.description.id != _this.$route.params.id) {
          await _this.$store.dispatch('$_gaInfo/getTracking', _this.$route.params.id);
          await _this.$store.dispatch('$_gaInfo/getTrackingDetail', _this.$route.params.id);
          _this.description.id = _this.$route.params.id;
        }
        _this.exitsValue = {};
      } catch (e) {

      }
    },
    methods: {
      tab(val) {
        this.description.choosenTab = val;
      },
      deleteFormTracking(data) {
        var _this = this;
        _this.$confirm(_this.$t('formTrackingPage.description', [data.name]), _this.$t('formTrackingPage.titleDelete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          await _this.$store.dispatch('$_gaInfo/deleteForm', data.id);
          new PNotify({
            title: '',
            text: _this.$t('deleteSuccess'),
            addclass: 'bg-success'
          });
        }).catch(() => {
        });
      },
      deleteQRCode(data) {
        var _this = this;
        _this.$confirm(_this.$t('qrcode.description'), _this.$t('qrcode.titleDelete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(() => {
          _this.$store.dispatch('$_gaInfo/deleteQRCode', data.id);
          new PNotify({
            title: '',
            text: _this.$t('deleteSuccess'),
            addclass: 'bg-success'
          });
        }).catch(() => {
        });
      },
      deleteScall(data) {
        var _this = this;
        _this.$confirm(_this.$t('call.description'), _this.$t('call.titleDelete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(() => {
          _this.$store.dispatch('$_gaInfo/deleteScall', data.id);
          new PNotify({
            title: '',
            text: _this.$t('deleteSuccess'),
            addclass: 'bg-success'
          });
        }).catch(() => {
        });
      },
      deleteTicket(data) {
        var _this = this;
        _this.$confirm(_this.$t('ticket.description', [data.name]), _this.$t('ticket.titleDelete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(() => {
          _this.$store.dispatch('$_gaInfo/deleteTicket', data.id);
          new PNotify({
            title: '',
            text: _this.$t('deleteSuccess'),
            addclass: 'bg-success'
          });
        }).catch(() => {
        });
      },
      async syncConversion() {
        var _this = this;
        try {
          await _this.$store.dispatch('$_gaInfo/syncConversion', _this.$route.params.id);
          new PNotify({
            title: '',
            text: _this.$t('syncSuccess'),
            addclass: 'bg-success'
          });
        } catch (e) {
          new PNotify({
            title: '',
            text: _this.$t('syncFail'),
            addclass: 'bg-danger'
          });
        }
      },
      async deleteTracking(item) {
        var _this = this;
        await _this.$confirm(_this.$t('leadsPage.deleteLead', [item.name]), _this.$t('trackingPage.titleDelete'), {
          confirmButtonText: _this.$t('confirm'),
          cancelButtonText: _this.$t('cancel'),
        }).then(async () => {
          try {
            var response = await _this.$store.dispatch('$_gaInfo/deleteTracking', [item]);
            if (response) {
              await _this.$store.dispatch(`$_ga/getAllTracking`, response.data);
              _this.$router.push('/ga');
            }
            new PNotify({
              title: '',
              text: _this.$t('deleteSuccess'),
              addclass: 'bg-success'
            });
          } catch (error) {
            console.log(error);
            new PNotify({
              title: '',
              text: _this.$t('deleteWrong'),
              addclass: 'bg-danger'
            });
          }
        }).catch(() => {
        });
      },
    }
  };
</script>
