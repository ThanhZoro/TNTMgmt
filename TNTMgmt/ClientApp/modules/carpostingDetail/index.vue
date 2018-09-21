<template>
  <div>
    <title-bar :langTitle="`${$t('carposting.list')} / Thông tin Xe Toyota Highlander LE 2.7 2018 - 2 Tỷ 495 Triệu (~ 106,967 USD )`"></title-bar>
    <div class="content">
      <!-- Bordered panel body table -->
      <div>
        <div class="panel-heading">
          <h5 class="panel-title">Thông tin Xe Toyota Highlander LE 2.7 2018 - 2 Tỷ 495 Triệu (~ 106,967 USD )</h5>
          <div class="heading-elements">
            <router-link :to="`/carposting`">
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
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'contact'}" @click="description.choosenTab = 'contact'">{{$t('carposting.infoContact')}} </li>
              <li class="list-group-item pointer" v-bind:class="{ active: description.choosenTab == 'detail'}" @click="description.choosenTab = 'detail'">{{$t('carposting.infoDetail')}} </li>
            </ul>
          </div>
        </div>
        <div class="panel col-lg-9">
          <div class="panel body panel-no-border">
            <div class="panel-body">
              <div class="pt-20" v-if="description.choosenTab == 'contact'">
                <infoContact :contact="commonData.carposting[1]" />
              </div>
              <div class="pt-20" v-if="description.choosenTab == 'detail'">
                <infoDetail :detail="commonData.carposting[1]" />
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
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  import commonData from "@/utils/common-data"
  import infoDetail from "./_components/infoDetail"
  import infoContact from "./_components/infoContact"
  export default {
    components: {
      "title-bar": TitleBar,
      infoDetail,
      infoContact
    },
    data() {
      return {
        commonData
      };
    },
    computed: {
      ...mapGetters({
        
      }),
      ...mapState({
        description: state => state.$_carpostingDetail.description
      })
    },
    watch: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_carpostingDetail";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      
    },
    methods: {

    }
  };
</script>
