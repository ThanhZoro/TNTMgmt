<template>
  <!-- Main sidebar -->
  <div class="sidebar sidebar-main">
    <div class="sidebar-content">
      <!-- Main navigation -->
      <div class="sidebar-category sidebar-category-visible">
        <div class="category-content no-padding">
          <ul class="navigation navigation-main navigation-accordion" v-if="currentUser.accessRight">
            <!-- Main -->
            <li class="navigation-header"><i class="icon-menu" title="" data-original-title="Main pages"></i></li>
            <router-link tag="li" active-class="active" to="/user" v-show="currentUser.accessRight.settings.view">
              <a>
                <i class="icon-users"></i> <span>{{$t('screen.userList')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/settings" v-show="currentUser.accessRight.settings.view">
              <a>
                <i class="icon-cog"></i> <span>{{$t('screen.settings')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/ga" v-show="currentUser.accessRight.tracking.view">
              <a>
                <i class="icon-footprint"></i> <span>{{$t('screen.trackingList')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/lead" v-show="currentUser.accessRight.lead.view">
              <a>
                <i class="icon-users4"></i> <span>{{$t('screen.leadList')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/survey" v-show="currentUser.accessRight.survey.view">
              <a>
                <i class="icon-spell-check2"></i> <span>{{$t('screen.surveyList')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/assignmentPlan" v-show="currentUser.accessRight.auto.assignmentview">
              <a>
                <i class="icon-shuffle"></i> <span>{{$t('screen.assignmentPlan')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/product/category" v-show="currentUser.accessRight.product.view">
              <a>
                <i class="icon-grid"></i> <span>{{$t('screen.productCategory')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/product/item" v-show="currentUser.accessRight.product.view">
              <a>
                <i class="icon-gift"></i> <span>{{$t('screen.productItem')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/so/header" v-show="currentUser.accessRight.so.view">
              <a>
                <i class="icon-list-ordered"></i> <span>{{$t('screen.so')}}</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" to="/team" v-show="currentUser.accessRight.settings.view">
              <a>
                <i class="icon-users2"></i> <span>{{$t('screen.team')}}</span>
              </a>
            </router-link>

            <router-link tag="li" active-class="active" to="/carposting" v-show="currentUser.accessRight.settings.view">
              <a>
                <i class="icon-paypal"></i> <span>{{$t('carposting.name')}}</span>
              </a>
            </router-link>
          </ul>
        </div>

      </div>
      <!-- /main navigation -->
    </div>
    <ul v-if="!toggleSidebar">
      <li style="position:absolute;bottom:0;color:#fff; list-style:none; line-height:10px">
        <p>
          <span style="color:#98a3a8">&copy; 2018. </span><span>{{$t('o2oCrm')}}</span>
        </p>
        <p><span style="color:#98a3a8">{{$t('powerBy')}} </span>{{$t('twinSolution')}}</p>
      </li>
    </ul>
  </div>
  <!-- /main sidebar -->
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState({
        toggleSidebar: state => state.language.toggleSidebar
      }),
      ...mapGetters({
        currentUser: 'common/currentUser'
      }),
    },
    methods: {},
  };
</script>

