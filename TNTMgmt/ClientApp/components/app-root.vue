<template>
  <div id="app" :class="toogleSidebar">
    <!-- Main navbar -->
    <nav-menu></nav-menu>
    <!-- /main navbar -->
    <!-- Page container -->
    <div class="page-container">
      <!-- Page content -->
      <div class="page-content">
        <side-bar></side-bar>
        <!-- Main content -->
        <div class="content-wrapper" >
          <div v-if="loading || signedIn">
            <router-view v-if="signedIn"></router-view>
            <page404 v-else />
          </div>
          <!-- Footer -->
          <!-- /footer -->
        </div>
        <!-- /main content -->
      </div>
      <!-- /page content -->
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  import NavMenu from "./nav-menu";
  import SideBar from "./side-bar";
  import Avatar from "./common/avatar";
  import userManager from '@/store/userManager';
  import Page404 from '@/views/page404'
  Vue.component('avatar', Avatar);
  import Vue from 'vue';
  export default {
    components: {
      "nav-menu": NavMenu,
      "side-bar": SideBar,
      "page404": Page404 
    },

    data() {
      return {
        loading: false,
      };
    },
    computed: {
      ...mapState({
        toogleSidebar: state => {
          return state.language.toggleSidebar ? "sidebar-xs" : "";
        },
        signedIn: state => state.auth.signedIn,
        loadingFinish: state => state.auth.loadingFinish
      })
    },
    watch: {
      loadingFinish: function (val) {
        this.loading = val ? true : false;
      }
    },
    created: async function () {
      var _this = this;
      var myBodyOBJ = document.body || document.getElementsByTagName("body")[0];
      myBodyOBJ.onscroll = function (e) {
        var thead = document.querySelector('thead');
        var table = document.querySelector('table') ? document.querySelector('table') .getBoundingClientRect() : null;
        if (thead && table) {
          var top = table.top;
          if (top <= 0) {            
            thead.style.transform = 'translateY(' + -(top) + 'px)';
          } else {
            thead.style.transform = 'translateY(' + 0 + 'px)';
          }
        }
      };
    },
    mounted: function () {
      var _this = this;
      _this.$signalRConnection.on(`send-${Vue.cookie.get("tenantId")}`, data => {
        var data = JSON.parse(data);
        switch (data.type) {
          case "update-company":
            _this.$store.dispatch("common/updateCompanyInfo", data.message);
            break;
          case "update-user":
            _this.$store.dispatch('common/updateListUser', data.message);
            break;
          case "update-common-data":
            _this.$store.dispatch('common/updateListCommonData', data.message);
            break;
          case 'update-logo-user':
            _this.$store.dispatch('common/updatePictureUser', data.message);
            break;
          case 'update-roles-user':
            _this.$store.dispatch('common/updateRolesUser', data.message);
            break;
          case 'update-team-user':
            _this.$store.dispatch('common/updateTeamUser', data.message);
            break;
          case 'delete-team':
            _this.$store.dispatch('common/deleteTeam', data.message);
            break;
          default:
            break;
        }
      });
      _this.$signalRConnection.start();
      _this.$signalRConnection.onclose(() => {
        setTimeout(function () {
          _this.$signalRConnection.start();
        }, 2000); // Restart connection after 5 seconds.
      });

      _this.$leadSignalRConnection.on(`chat-${Vue.cookie.get('tenantId')}`, data => {
        var data = JSON.parse(data);
        switch (data.type) {
          case "edit-chat":
            _this.$store.dispatch('$_chatLead/editListMessages', data.message);
            break;
          case "edit-list-lead":
            _this.$store.dispatch('$_leadList/getListLeads');
            break;
          default:
            break;
        }
      });
      _this.$leadSignalRConnection.start();
      _this.$leadSignalRConnection.onclose(() => {
        setTimeout(function () {
          _this.$leadSignalRConnection.start();
        }, 2000); // Restart connection after 5 seconds.
      });
    }
  };
</script>
<style>
</style>
